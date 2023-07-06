import {sequelize} from '../database/mysql';
import {Model,DataTypes} from 'sequelize'

export interface UserInstance extends Model{
  id:number,
  email:string,
  password:string,
  validated:boolean,
  code:number

}

export const User = sequelize.define<UserInstance>('User',{
     id:{
         type:DataTypes.INTEGER,
         primaryKey:true,
         autoIncrement:true
     },
     email:{
        type:DataTypes.STRING,
        unique:true
     },
     password:{
        type:DataTypes.STRING,
     },
     validated:{
        type:DataTypes.TINYINT,
        defaultValue:false
     },
     code:{
        type:DataTypes.INTEGER,
        unique:true
     }
     
},{tableName:'user',timestamps:false})

User.sync().then(()=>{
     console.log('Tabela usuario criada com sucesso')
}).catch((error)=>{
     console.log('-------------- Ocorreu um error na tabela usuario ---------- :',error)
})