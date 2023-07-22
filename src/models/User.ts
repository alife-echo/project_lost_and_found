import {sequelize} from '../database/mysql';
import {Model,DataTypes} from 'sequelize'
import { Item } from './Item';
import { ItemResponse } from './ItemReponse';
export interface UserInstance extends Model{
  id:number,
  name:string,
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
     name:{
       type:DataTypes.STRING,
       allowNull:false
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
User.hasMany(Item,{foreignKey:'userItemID'})
Item.belongsTo(User,{foreignKey:'userItemID'})
User.hasMany(ItemResponse,{foreignKey:'ID_user_response'})
ItemResponse.belongsTo(User,{foreignKey:'ID_user_response'})
User.sync().then(()=>{
     console.log('Tabela usuario criada com sucesso')
}).catch((error)=>{
     console.log('-------------- Ocorreu um error na tabela usuario ---------- :',error)
})