import { Request,Response } from "express";
import fs from 'fs'
import JWT, { JwtPayload } from 'jsonwebtoken'
import doteenv from 'dotenv'
import { Item } from "../models/Item";
import { User } from "../models/User";
doteenv.config()



//--------- CONTROLLERS ROUTERS GET --------------------- 
export const home = (req:Request,res:Response) => {
    res.render('pages/home');
}
export const upload = (req:Request,res:Response) => {
    res.render('pages/upload');
}
export const messages = (req:Request,res:Response) => {
    res.render('pages/messages');
}
export const logout = (req:Request,res:Response) => {
  const token = req.cookies.token as string;
  if (token) {
    res.clearCookie('token');
    res.redirect('/')
  }
}
//--------- CONTROLLERS ROUTERS POST  --------------------- 

export const upload_post = async (req:Request,res:Response) => {
    if(req.body.name_item && req.body.description_item && req.body.questions_item && req.body.location_item && req.body.upload_img){
      const decodedToken = JWT.verify(req.cookies.token,process.env.JWT_SECRET_KEY as string) as JwtPayload
      const userRef = await User.findOne({where:{email:decodedToken.email}})
      try{
        const image = req.body.upload_img
        const base64Image = Buffer.from(image, 'binary').toString('base64')
      await Item.create({
         nameItem:req.body.name_item,
         littleDescription:req.body.description_item,
         questionsValidated: req.body.questions_item,
         meetingLocation: req.body.location_item,
         image:base64Image,
         userItemID:userRef?.id
      })
      res.render('pages/upload',{
        message:'Upload realizado com sucesso'
      })
    } 
    catch(error){
      res.render('pages/upload',{
        message:'Error ao fazer upload'
      })
      console.log(error)
    }
  }
    else{
      res.render('pages/upload',{
         message:'Preencha os campos corretamente*'
      })
    }
}