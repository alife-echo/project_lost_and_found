import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/mysql';
import { User } from './User';
export interface ItemInstance extends Model {
  id: number;
  nameItem: string;
  littleDescription: string;
  questionsValidated: string;
  meetingLocation: string;
  image: string; // Propriedade para armazenar a imagem em base64
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
    type: DataTypes.TEXT, // Utilize o tipo TEXT para armazenar a base64 da imagem
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

Item.sync().then(() => {
  console.log('Tabela Item Criada com Sucesso');
}).catch((error) => {
  console.log('Erro na criação da tabela Item:', error);
});
