import { Router } from "express";
import { isAuth } from "../../utils/Authenticated.js";
const chatRouter = Router()

import {obtenerChat, chatPorEmail} from '../Controllers/chat.controller.js'

chatRouter.get('/', isAuth, obtenerChat)

chatRouter.get('/:id', isAuth, chatPorEmail)

export default chatRouter