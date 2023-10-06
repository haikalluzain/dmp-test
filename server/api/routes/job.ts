import { Router } from 'express'
import jobController from '@api/controllers/jobController'
import authMiddleware from "@api/middlewares/authMiddleware";
import userController from "@api/controllers/userController";

const jobRoute = Router()

jobRoute.route('/').get(authMiddleware, jobController.getJobList)
jobRoute.route('/:id').get(authMiddleware, jobController.getJobDetail)
export default jobRoute