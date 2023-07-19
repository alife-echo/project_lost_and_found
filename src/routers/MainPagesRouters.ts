import { Router } from "express";
import { Auth } from "../middlewares/auth";
import * as MainPagesControllers  from '../controllers/MainPagesControllers'
const routersMainPages = Router()

routersMainPages.get('/home',Auth.private,MainPagesControllers.home)
routersMainPages.get('/upload',Auth.private,MainPagesControllers.upload)
routersMainPages.get('/messages',Auth.private,MainPagesControllers.messages)
routersMainPages.post('/logout',MainPagesControllers.logout)


routersMainPages.post('/upload-post',MainPagesControllers.upload_post)
export default routersMainPages