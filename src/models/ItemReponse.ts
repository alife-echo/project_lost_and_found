import {Model,DataTypes} from 'sequelize'
import {sequelize} from '../database/mysql'
import { User } from './User'
import { Item } from './Item'

export interface ItemResponseInstance extends Model {
     id:number,
     textResponse:string,
     date:string,
     time:string,
     ID_item_response:number
}

export const ItemResponse = sequelize.define<ItemResponseInstance>('ItemResponse',{
    id:{
         type:DataTypes.INTEGER,
         primaryKey:true,
         autoIncrement:true
    },
    userRes:{
      type:DataTypes.STRING,
      allowNull:false
    },
    textReponse:{
         type:DataTypes.STRING,
         allowNull:false
    },
    date:{
         type:DataTypes.STRING,
         allowNull:false
    },
    time:{
        type:DataTypes.STRING,
        allowNull:false
    },
    ID_item_response:{   
        type:DataTypes.INTEGER,
        references:{
             model:'item', 
             key:'id'  
        },
        field:'ID_item_response'
     },
     ID_user_response:{   
          type:DataTypes.INTEGER,
          references:{
               model:'user', 
               key:'id'  
          },
          field:'ID_user_response'
       }
},{timestamps:false,tableName:'itemresponse'})

