import { Router } from "express"
const indexRouter = Router()

import { isAuth } from "../../utils/Authenticated.js"

import {inicio} from '../Controllers/index.controller.js'

indexRouter.get('/vista', isAuth, inicio)

export default indexRouter