import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/mysql';
import { User } from './User';
import { ItemResponse } from './ItemReponse';
import { message } from './Message';
export interface ItemInstance extends Model {
  id: number;
  nameItem: string;
  littleDescription: string;
  questionsValidated: string;
  meetingLocation: string;
  image: string;
  userItemID:number
}

export const Item = sequelize.define<ItemInstance>('Item', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nameItem: {
    type: DataTypes.STRING,
    allowNull: false
  },
  littleDescription: {
    type: DataTypes.STRING,
    allowNull: false
  },
  questionsValidated: {
    type: DataTypes.STRING,
    allowNull: false
  },
  meetingLocation: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  
  userItemID:{   
    type:DataTypes.INTEGER,
    references:{
         model:'user', 
         key:'id'  
    },
    field:'userItemID'
 }
}, { tableName: 'item', timestamps: false });

Item.hasMany(ItemResponse,{foreignKey:'ID_item_response',onDelete:'CASCADE'})
ItemResponse.belongsTo(Item,{foreignKey:'ID_item_response',onDelete:'CASCADE'})

Item.hasMany(message,{foreignKey:'ID_item_message',onDelete:'CASCADE'})
message.belongsTo(Item,{foreignKey:'ID_item_message',onDelete:'CASCADE'})

