import { Request,Response } from "express";
import { User } from "../models/User";
import { generateRandomNumber } from "../helpers/generateRandomNumber";
import { validateEmail } from "../helpers/validateEmailUnifesspa";
export const loginIndex = async(req:Request,res:Response) => {
     res.render('pages/index')
}
export const login_post = async(req:Request,res:Response) => {
     res.render('pages/index')
}

export const register = async(req:Request,res:Response) => {
    res.render('pages/register')
}
export const register_post = async(req:Request,res:Response) => {
    if(req.body.email && req.body.password  && req.body.name) {
        let randomNumber = generateRandomNumber()
        let {email,password,name} = req.body
        let hasUser = await User.findOne({where:{email}})
        if(!hasUser){
            if(validateEmail(req.body.email)){
                let newUser = await User.create({email,password,name,code:randomNumber})
                res.status(201)
                res.redirect('/confirm-email')
            }
            else{
                res.render('pages/register',{
                     message:'Apenas email institucional*'
                })
            }
            
        }
        else{
            res.render('pages/register',{
                message:'E-mail já existe*'
           })
        }
        return
     }
     res.render('pages/register',{
        message:'E-mail e/ou senha não enviados*'
   })
}

export const retrieveAccount = async(req:Request,res:Response) => {
    res.render('pages/retrieveAccount')
}
export const retrieveAccount_post = async(req:Request,res:Response) => {
    res.render('pages/retrieveAccount')
}

export const email_confirm = async(req:Request,res:Response) => {
     res.render('pages/confirmAccount')
}
export const email_confirm_post = async(req:Request,res:Response) => {
    if(req.body.email_confirm){
        let {email_confirm} = req.body
        let hasCode = await User.findOne({where:{code:email_confirm} })
            if(hasCode?.code.toString() === req.body.email_confirm){
                await User.update({ validated:1},{
                     where:{
                         code:hasCode?.code
                     }
                })
                res.redirect('/message_create_email')
            }
            else{
                res.render('pages/confirmAccount',{
                    message:'Codigo Incorreto*'
               })
            }        
        return
    }
    res.render('pages/confirmAccount',{
         message:'Codigo não enviado*'
    })
}

export const message_email_confirm = async(req:Request,res:Response) => {
       res.render('pages/messageConfirmAccount')
}