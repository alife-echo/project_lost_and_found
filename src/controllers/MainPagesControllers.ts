import { Request,Response } from "express";
import fs from 'fs'
import JWT, { JwtPayload } from 'jsonwebtoken'
import doteenv from 'dotenv'
import { Item } from "../models/Item";
import { User } from "../models/User";
import { ItemResponse } from "../models/ItemReponse";
import { getDateNow } from "../helpers/DateNow";
import { getHoursAndMinutesNow } from "../helpers/TimeNow";
doteenv.config()



//--------- CONTROLLERS ROUTERS GET --------------------- 
export const home = async (req:Request,res:Response) => {
  try{
    let cardsContent = await Item.findAll()
    console.log(cardsContent)
    res.render('pages/home',{
        cardsContent
    });
  }
  catch(error){
     console.log(error)
  }
    
}
export const forum = async(req:Request,res:Response)=>{
      const id:string = req.params.id  as string
      const forumChoice = await Item.findByPk(id)
      const  getMessages = await ItemResponse.findAll({where:{ID_item_response:forumChoice?.id}})
      console.log(id)
      console.log(forumChoice)
      res.render('pages/forum',{
        forumChoice,
        getMessages
      })
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

export const upload_post = async (req: Request, res: Response) => {
  if (req.body.name_item && req.body.description_item && req.body.questions_item && req.body.location_item && req.file?.fieldname) {
    const decodedToken = JWT.verify(req.cookies.token, process.env.JWT_SECRET_KEY as string) as JwtPayload;
    const userRef = await User.findOne({ where: { email: decodedToken.email } });

    try {
      const image = 'imgs_card' + '/' + req.file.originalname;
      const [item, created] = await Item.findOrCreate({
        where: {
          nameItem: req.body.name_item.toUpperCase(),
          littleDescription: req.body.description_item
        },
        defaults: {
          nameItem: req.body.name_item.toUpperCase(),
          littleDescription: req.body.description_item,
          questionsValidated: req.body.questions_item,
          meetingLocation: req.body.location_item,
          image: image,
          userItemID: userRef?.id
        }
      });

      if (created) {
        res.render('pages/upload', {
          message: 'Upload realizado com sucesso'
        });
      } else {
        res.render('pages/upload', {
          message: 'O item já existe'
        });
      }
    } catch (error) {
      res.render('pages/upload', {
        message: 'Error ao fazer upload'
      });
      console.log(error);
    }
  } else {
    res.render('pages/upload', {
      message: 'Preencha os campos corretamente*'
    });
  }
};

export const res_post = async(req:Request,res:Response)=>{
      let textReponse:string = req.body.res_item as string
      let id:string = req.params.id  as string
      let forumChoice = await Item.findByPk(id)
      const decodedToken = JWT.verify(req.cookies.token, process.env.JWT_SECRET_KEY as string) as JwtPayload;
      const userRef = await User.findOne({ where: { email: decodedToken.email } });
      if(textReponse){
        const [itemresponse, created] =  await ItemResponse.findOrCreate({
           where:{textReponse},
           defaults:{
             textReponse,
             userRes:userRef?.name,
             date:getDateNow(),
             time:getHoursAndMinutesNow(),
             ID_user_response:userRef?.id,
             ID_item_response:forumChoice?.id
           }
        },
      
        )
        if (created) {
          res.redirect(`/forum${forumChoice?.id}`)
        } else {
          res.render('pages/forum', {
            message: 'Resposta já enviada'
          });
        }
      }
      else{
        res.render('pages/forum',{
        message:'Preencha os campos corretamente****',
        forumChoice
      })
      }

}