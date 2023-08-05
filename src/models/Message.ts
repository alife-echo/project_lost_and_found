import {Model,DataTypes} from 'sequelize'
import {sequelize} from '../database/mysql'

interface MessageInstance extends Model{
    id:number,
    date:string,
    time:string,
    meetingLocation:string,
    userSend:string
}

export const message = sequelize.define<MessageInstance>('Message',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    meetingLocation:{
        type:DataTypes.STRING,
        allowNull:false
    },
    userSend:{
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
   ID_item_message:{   
    type:DataTypes.INTEGER,
    references:{
         model:'item', 
         key:'id'  
    },
    field:'ID_item_message'
 },
 ID_user_message:{   
      type:DataTypes.INTEGER,
      references:{
           model:'user', 
           key:'id'  
      },
      field:'ID_user_message'
   }
},{tableName:'message',timestamps:false})



