import { Router } from "express";
import { Auth } from "../middlewares/auth";
import * as AuthenticationController from '../controllers/AuthenticationController'

const routers = Router()

routers.get('/',AuthenticationController.loginIndex)
routers.post('/post-login',AuthenticationController.login_post)


routers.get('/register',AuthenticationController.register)
routers.post('/register-post',AuthenticationController.register_post)

routers.get('/retrieve',AuthenticationController.retrieveAccount)
routers.post('/retrieve-post',AuthenticationController.retrieveAccount_post)

routers.get('/confirm-email',Auth.private,AuthenticationController.email_confirm)
routers.post('/confirm-email-post',AuthenticationController.email_confirm_post)

routers.get('/message_create_email',Auth.private,AuthenticationController.message_email_confirm)
routers.get('/message_send_password_email',Auth.private,AuthenticationController.message_password_email)


export default routers