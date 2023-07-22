import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/mysql';
import { User } from './User';
import { ItemResponse } from './ItemReponse';
export interface ItemInstance extends Model {
  id: number;
  nameItem: string;
  littleDescription: string;
  questionsValidated: string;
  meetingLocation: string;
  image: string;
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

Item.hasMany(ItemResponse,{foreignKey:'ID_item_response'})
ItemResponse.belongsTo(Item,{foreignKey:'ID_item_response'})

Item.sync().then(() => {
  console.log('Tabela Item Criada com Sucesso');
}).catch((error) => {
  console.log('Erro na criação da tabela Item:', error);
});
