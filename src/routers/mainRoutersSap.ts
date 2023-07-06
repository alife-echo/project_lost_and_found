import { Router } from "express";
import * as controllersSap from '../controllers/cotrollersSap'

const routers = Router()

routers.get('/',controllersSap.loginIndex)
routers.post('/post-login',controllersSap.login_post)

routers.get('/register',controllersSap.register)
routers.post('/register-post',controllersSap.register_post)

routers.get('/retrieve',controllersSap.retrieveAccount)
routers.post('/retrieve-post',controllersSap.retrieveAccount_post)

routers.get('/home',controllersSap.home)
routers.post('/home-post',controllersSap.home_post)

routers.get('/confirm-email',controllersSap.email_confirm)
routers.post('/confirm-email-post',controllersSap.email_confirm_post)

routers.get('/message_create_email',controllersSap.message_email_confirm)


export default routers