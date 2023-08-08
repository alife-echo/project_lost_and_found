import { Request,Response } from "express";
import fs from 'fs'
import JWT, { JwtPayload } from 'jsonwebtoken'
import doteenv from 'dotenv'
import { getUserRef } from "../helpers/GetUserRef";
import { Item } from "../models/Item";
import { User } from "../models/User";
import { message} from "../models/Message";
import { ItemResponse } from "../models/ItemReponse";
import { getDateNow } from "../helpers/DateNow";
import { getHoursAndMinutesNow } from "../helpers/TimeNow";
import { where } from "sequelize";
import { Op } from "sequelize";

doteenv.config()



//--------- CONTROLLERS ROUTERS GET --------------------- 
export const home = async (req: Request, res: Response) => {
    const cardsContent = await Item.findAll({
      attributes: {
        exclude: ['userItemID'],
      },
      where: {
        userItemID: {
          [Op.ne]: (await getUserRef(req.cookies.token, process.env.JWT_SECRET_KEY as string)).id,
        },
      },
    });
    if(cardsContent.length === 0){
      res.render('pages/home', {
        cardsContent,
        infoUser: (await getUserRef(req.cookies.token, process.env.JWT_SECRET_KEY as string)).id,
        message:'Infelizmente, não há itens perdidos disponíveis no momento.'
      });
    }
    else {
      res.render('pages/home', {
        cardsContent,
        infoUser: (await getUserRef(req.cookies.token, process.env.JWT_SECRET_KEY as string)).id,
      });
    }
    console.log('cards---------',cardsContent);
  } 
export const filterCards = async(req:Request,res:Response) => {
    if(req.query.filterSearch as string) {
        const cardsContent = await Item.findAll({where:{
          nameItem:{
             [Op.like]: `%${req.query.filterSearch}%`
          }
        }})
        if(cardsContent.length === 0){
          res.redirect('/home')  
        }
        else{
          res.render('pages/home',{
            infoUser: (await getUserRef(req.cookies.token, process.env.JWT_SECRET_KEY as string)).id,
            cardsContent
          })
        }
    }
    else{
      res.redirect('/home')
    }
}
export const forum = async(req:Request,res:Response)=>{
      const id:string = req.params.id  as string
      const forumChoice = await Item.findByPk(id)
      const  getMessages = await ItemResponse.findAll({where:{ID_item_response:forumChoice?.id}})
      
      console.log(getMessages)
      if(getMessages.length === 0){
        res.render('pages/forum',{
          forumChoice,
          infoUser:(await getUserRef(req.cookies.token,process.env.JWT_SECRET_KEY as string)).id,
          notItem:'Infelizmente, não há respostas para este item perdido no momento.'
        })
      }
      else{
        res.render('pages/forum',{
          forumChoice,
          getMessages,
          infoUser:(await getUserRef(req.cookies.token,process.env.JWT_SECRET_KEY as string)).id,
        })
      }
    
}
export const upload = async (req:Request,res:Response) => {
    res.render('pages/upload',{
      infoUser:(await getUserRef(req.cookies.token,process.env.JWT_SECRET_KEY as string)).id,
      show:'display:none;'
    });
}
export const messages = async (req:Request,res:Response) => {
    const messageRefUser = await message.findAll({where:{ID_user_message:(await getUserRef(req.cookies.token,process.env.JWT_SECRET_KEY as string)).id}})
    if(messageRefUser.length === 0){
      res.render('pages/messages',{
        notMessages:'Infelizmente, não há mensagens disponíveis no momento.',
        infoUser:(await getUserRef(req.cookies.token,process.env.JWT_SECRET_KEY as string)).id,
      });
    }
    else{
    res.render('pages/messages',{
      messageRefUser,
      infoUser:(await getUserRef(req.cookies.token,process.env.JWT_SECRET_KEY as string)).id,
    });
  }
}
export const list_items_user= async (req:Request,res:Response) => {
    const idUserParamsList:string = req.params.id  as string
    console.log(idUserParamsList)
    const listItemsUser = await Item.findAll({where:{userItemID:idUserParamsList}})
    if(listItemsUser.length === 0){
      res.render('pages/listItems',{
        notList:'Infelizmente,você não criou lista no momento.',
        infoUser:(await getUserRef(req.cookies.token,process.env.JWT_SECRET_KEY as string)).id,
   })
    }
    else{
    res.render('pages/listItems',{
         listItemsUser,
         infoUser:(await getUserRef(req.cookies.token,process.env.JWT_SECRET_KEY as string)).id,
    })
  }
}

export const my_forum  = async (req:Request,res:Response) =>{
  const idItemParams:string = req.params.id  as string
  const getResponsesThisItem = await ItemResponse.findAll({where:{ID_item_response:idItemParams}})
  const getItemMeetingLocation = await Item.findAll({where:{id:idItemParams}})
  console.log('--------------------------- ' + '\n',getItemMeetingLocation)
  console.log(getResponsesThisItem)
  if(getResponsesThisItem.length === 0){
    res.render('pages/thisResponsesItemUser',{
      infoUser:(await getUserRef(req.cookies.token,process.env.JWT_SECRET_KEY as string)).id,
      notResponses:'Infelizmente,esse post não recebeu respostas.'
    })
  }
  else {
  res.render('pages/thisResponsesItemUser',{
    infoUser:(await getUserRef(req.cookies.token,process.env.JWT_SECRET_KEY as string)).id,
    getResponsesThisItem
  })
}
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
    try {
      const image = 'imgs_card' + '/' + req.file.originalname;
      const [item, created] = await Item.findOrCreate({
        where: {
        
          littleDescription: req.body.description_item
        },
        defaults: {
          nameItem: req.body.name_item.toUpperCase(),
          littleDescription: req.body.description_item,
          questionsValidated: req.body.questions_item,
          meetingLocation: req.body.location_item,
          image: image,
          userItemID: (await getUserRef(req.cookies.token,process.env.JWT_SECRET_KEY as string)).id,
        }
      });

      if (created) {
        res.render('pages/upload', {
          message: 'Upload realizado com sucesso',
          infoUser:(await getUserRef(req.cookies.token,process.env.JWT_SECRET_KEY as string)).id,
          show:'display:block;'
        });
      } else {
        res.render('pages/upload', {
          message: 'O item já existe',
          infoUser:(await getUserRef(req.cookies.token,process.env.JWT_SECRET_KEY as string)).id,
          show:'display:block;'
        });
      }
    } catch (error) {
      res.render('pages/upload', {
        message: 'Error ao fazer upload',
        infoUser:(await getUserRef(req.cookies.token,process.env.JWT_SECRET_KEY as string)).id,
        show:'display:block;'
      });
      console.log(error);
    }
  } else {
    res.render('pages/upload', {
      message: 'Preencha os campos corretamente*',
      infoUser:(await getUserRef(req.cookies.token,process.env.JWT_SECRET_KEY as string)).id,
      show:'display:block;'
    });
  }
};

export const res_post = async(req:Request,res:Response)=>{
      let textReponse:string = req.body.res_item as string
      let id:string = req.params.id  as string
      let forumChoice = await Item.findByPk(id)
      if(textReponse){
        const [itemresponse, created] =  await ItemResponse.findOrCreate({
           where:{textReponse},
           defaults:{
             textReponse,
             userRes:(await getUserRef(req.cookies.token,process.env.JWT_SECRET_KEY as string)).name,
             date:getDateNow(),
             time:getHoursAndMinutesNow(),
             ID_user_response:(await getUserRef(req.cookies.token,process.env.JWT_SECRET_KEY as string)).id,
             ID_item_response:forumChoice?.id
           }
        },
      
        )
        if (created) {
          res.redirect(`/forum${forumChoice?.id}`)
        } else {
          res.render('pages/forum', {
            message: 'Resposta já enviada***',
            forumChoice
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

export const sendMessageLocation = async(req:Request,res:Response) => {
     const id_user:string = req.body.id_user_send as string     //criar message, referenciar usuario atual ao message, destruir post
     const item = await Item.findOne({where:{userItemID:(await getUserRef(req.cookies.token,process.env.JWT_SECRET_KEY as string)).id,}})
     const getResponsesThisItem =  await ItemResponse.findOne({where:{ID_item_response:item?.id}})
     const hasUser =  await User.findByPk(id_user)
     console.log('respostas item---------',getResponsesThisItem)
     if(id_user && hasUser){
      if (item) {
        const meetingLocation = item?.meetingLocation;
        const nameUser = await User.findAll({where:{id:item?.userItemID}})
        await message.create({
          userSend:nameUser[0].name.toUpperCase(),meetingLocation,date:getDateNow(),time:getHoursAndMinutesNow(),ID_user_message:id_user})
      }
      await Item.destroy({where:{id:getResponsesThisItem?.ID_item_response}})
      res.render('pages/resultSendLocation',{
        getResponsesThisItem
      })
     }
     else{
      res.render('pages/thisResponsesItemUser',{
        message:'Preencha os campos corretamente*',
      })
    }
}