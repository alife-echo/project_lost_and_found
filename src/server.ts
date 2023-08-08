import path from "path";
import express,{Request,Response} from 'express'
import AuthRouters from './routers/AuthRouters'
import routersMainPages from "./routers/MainPagesRouters";
import dotenv from 'dotenv'
import mustacheExpress from "mustache-express";
import cookieParser from 'cookie-parser'
import { sequelize } from "./database/mysql";
dotenv.config()
const server = express()

server.set('views',path.join(__dirname,'./views'))
server.set('view engine','mustache')
server.use(express.urlencoded({extended:true}))
server.engine('mustache',mustacheExpress())
server.use(express.static(path.join(__dirname,'../public')))
server.use(cookieParser())
server.use(AuthRouters)
server.use(routersMainPages)
server.use((req:Request,res:Response)=>{
     res.json({error:'pagina não encontrada'}).status(404)
})

sequelize.sync().then(()=>{console.log('tabelas criadas com sucesso')}).catch(error => console.log(error))
server.listen(process.env.PORT)