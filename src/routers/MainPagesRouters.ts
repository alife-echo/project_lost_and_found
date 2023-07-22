import { Router } from "express";
import { Auth } from "../middlewares/auth";
import multer from "multer";
import express,{Request} from 'express'
import path from "path";
import * as MainPagesControllers  from '../controllers/MainPagesControllers'

const storage = multer.diskStorage({
    destination: function (req:Request, file, cb) {
      cb(null, '././public/imgs_card'); // Salvar no diretório 'tmp'
    },
    filename: function (req:Request, file, cb) {
      cb(null, file.originalname); // Usar o nome original do arquivo
    }
  });
  
  const upload = multer({ storage: storage });
const routersMainPages = Router()

routersMainPages.get('/home',Auth.private,MainPagesControllers.home)
routersMainPages.get('/upload',Auth.private,MainPagesControllers.upload)
routersMainPages.get('/messages',Auth.private,MainPagesControllers.messages)
routersMainPages.post('/logout',MainPagesControllers.logout)


routersMainPages.post('/upload-post',upload.single('upload_img'),MainPagesControllers.upload_post)
routersMainPages.post('/forum:id',Auth.private,MainPagesControllers.res_post)
routersMainPages.get('/forum:id',Auth.private,MainPagesControllers.forum)

export default routersMainPages