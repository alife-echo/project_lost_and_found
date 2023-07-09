import { Request,Response } from "express";
import { User } from "../models/User";
import { generateRandomNumber } from "../helpers/generateRandomNumber";
import { validateEmail } from "../helpers/validateEmailUnifesspa";
import nodemailer from 'nodemailer'
import doteenv from 'dotenv'
doteenv.config()
export const loginIndex = async(req:Request,res:Response) => {
     res.render('pages/index')
}
export const login_post = async(req:Request,res:Response) => {
     res.render('pages/index')
}

export const register = async(req:Request,res:Response) => {
    res.render('pages/register')
}
export const register_post = async (req: Request, res: Response) => {
    if (req.body.email && req.body.password && req.body.name) {
      let randomNumber = generateRandomNumber();
      let { email, password, name } = req.body;
      let hasUser = await User.findOne({ where: { email } });
      
      if (!hasUser) {
        if (validateEmail(req.body.email)) {
          let newUser = await User.create({ email, password, name, code: randomNumber });
  
          const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
              user: 'alife.silva@unifesspa.edu.br', // Seu endereço de e-mail do Gmail
              pass: `${process.env.MYSQL_PASSWORD}`, // Sua senha do Gmail
            },
          });
  
          const mailOptions = {
            from: 'alife.silva@unifesspa.edu.br', // Seu endereço de e-mail do Gmail
            to: email, // E-mail da pessoa para quem você deseja enviar
            subject: 'Confirmação de E-mail',
            html: `
              <html>
                <head>
                  <link rel="preconnect" href="https://fonts.googleapis.com">
                  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                  <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@700&family=Inter:wght@500;600;700&display=swap" rel="stylesheet">
                  <style>
                    body {
                      width: 100%;
                    }
                    h1 {
                      font-family: 'Barlow', sans-serif;
                      font-size: 27px;
                      font-weight: bold;
                      margin-top: 5rem;
                      text-align: center;
                    }
                    p {
                      font-size: 22px;
                      font-family: 'Inter', sans-serif;
                      font-weight: 500;
                      color: #666666;
                      text-align: center;
                    }
                  </style>
                </head>
                <body>
                  <h1>SEU CÓDIGO DE CONFIRMAÇÃO</h1>
                  <p>${randomNumber}</p>
                </body>
              </html>
            `
          };
  
          transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
              console.error(error);
              res.render('pages/confirmAccount', {
                message: 'Erro ao enviar e-mail',
              });
            } else {
              res.redirect('/confirm-email');
            }
          });
        } else {
          res.render('pages/register', {
            message: 'Apenas email institucional*'
          });
        }
      } else {
        res.render('pages/register', {
          message: 'E-mail já existe*'
        });
      }
    } else {
      res.render('pages/register', {
        message: 'E-mail e/ou senha não enviados*'
      });
    }
  };

export const retrieveAccount = async(req:Request,res:Response) => {
    res.render('pages/retrieveAccount')
}
export const retrieveAccount_post = async(req:Request,res:Response) => {
    res.render('pages/retrieveAccount')
}

export const email_confirm = async(req:Request,res:Response) => {
     res.render('pages/confirmAccount')
}
export const email_confirm_post = async (req: Request, res: Response) => {
    if (req.body.email_confirm) {
      let { email_confirm } = req.body;
      let hasCode = await User.findOne({ where: { code: email_confirm } });
  
      if (hasCode?.code.toString() === req.body.email_confirm) {
        await User.update({ validated: 1 }, {
          where: {
            code: hasCode?.code,
          },
        });
        res.redirect('/message_create_email');
      } else {
        res.render('pages/confirmAccount', {
          message: 'Código Incorreto*',
        });
      }
    } else {
      res.render('pages/confirmAccount', {
        message: 'Código não enviado*',
      });
    }
  };
  

export const message_email_confirm = async(req:Request,res:Response) => {
       res.render('pages/messageConfirmAccount')
}
