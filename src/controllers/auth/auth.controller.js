import User from '../../models/User'
import jwt from 'jsonwebtoken'
import config from '../../config'

//register new user
export const signUp = async (req, res) => {
  const {username, email, password} = req.body

  const newUser = new User({
    username,
    email,
    password: await User.encryptPassword(password)
  })

  const savedUser = await newUser.save()
  //create a new token with the user id
  const token = jwt.sign({id: savedUser._id}, config.SECRET, {
    expiresIn: 86400 //24h
  })
  return res.status(200).json({message: "New user created", savedUser, token})
}

//login a user
export const logIn = async (req, res) => {

  const userFound = await User.findOne({email: req.body.email}).populate("roles")

  if (!userFound) {
    return res.json({message: "user not found"})
  }
  //compare user password with the body password
  const matchPassword = await User.comparePassword(req.body.password, userFound.password)
  if(!matchPassword) {
    return res.status(401).json({token: null, message: 'invalid password'})
  }
  //create a login token
  const token = jwt.sign({id: userFound._id}, config.SECRET, {
    expiresIn: 86400
  })
  return res.status(200).json({message: "Successfully login", userFound, token})
}
