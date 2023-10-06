import { Router } from 'express'
import authRoute from './auth'
import userRoute from './user'
import jobRoute from "@api/routes/job";

const router = Router()

interface routeInterface {
  path: string
  route: Router
}

const routes: routeInterface[] = [
  {
    path: '/auth',
    route: authRoute
  },
  {
    path: '/user',
    route: userRoute
  },
  {
    path: '/jobs',
    route: jobRoute
  }
]

routes.forEach((route) => {
  router.use(route.path, route.route)
})

export default router