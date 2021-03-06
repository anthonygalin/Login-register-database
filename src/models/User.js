import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  picture: {
    type: String
  },
},
  {
  timestamps: true,
  versionKey: false
}
)

userSchema.statics.encryptPassword = async(password) => {
  const salt = await bcrypt.genSalt(10)
  return  bcrypt.hash(password, salt)
}
userSchema.statics.comparePassword = async(password, receivedPassword) => {
 return  bcrypt.compare(password, receivedPassword)
}

export default model('User', userSchema)
