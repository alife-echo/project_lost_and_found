import { Router } from "express";
import { Auth } from "../middlewares/auth";
import * as MainPagesControllers  from '../controllers/MainPagesControllers'
const routersMainPages = Router()

routersMainPages.get('/home',MainPagesControllers.home)
routersMainPages.get('/upload',MainPagesControllers.upload)
routersMainPages.get('/messages',MainPagesControllers.messages)

export default routersMainPages