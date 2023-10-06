import userController from '@api/controllers/userController'
import authMiddleware from '@api/middlewares/authMiddleware'
import { Router } from 'express'

const userRoute = Router()

userRoute
.route('/')
.get(authMiddleware, userController.getUser)
export default userRoute