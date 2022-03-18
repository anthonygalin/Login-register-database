import {Router} from 'express'
const router = Router()
import * as authController from '../controllers/auth/auth.controller'
import {checkDuplicateUsernameOrEmail} from '../libs/verifySignup'


router.post('/signup',checkDuplicateUsernameOrEmail, authController.signUp)
router.post('/LogIn', authController.logIn)

export default router
