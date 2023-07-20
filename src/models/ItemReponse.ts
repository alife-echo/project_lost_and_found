import {Model,DataTypes} from 'sequelize'
import {sequelize} from '../database/mysql'
import { User } from './User'
import { Item } from './Item'

export interface ItemResponseInstance extends Model {
     id:number,
     textResponse:string,
     date:string,
     time:string
}

export const ItemResponse = sequelize.define<ItemResponseInstance>('ItemResponse',{
    id:{
         type:DataTypes.INTEGER,
         primaryKey:true,
         autoIncrement:true
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
    ID_user_response:{   
        type:DataTypes.INTEGER,
        references:{
             model:'item', 
             key:'id'  
        },
        field:'ID_user_response'
     }
},{timestamps:false,tableName:'itemresponse'})

ItemResponse.sync().then(()=>{
     console.log('Tabela resposta Item criada com sucesso')
}).catch((error)=>console.log(error))