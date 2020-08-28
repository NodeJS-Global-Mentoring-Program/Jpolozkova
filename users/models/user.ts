const crypt = require("crypto");
const config = require('../config/index');

const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize(config.databaseURL);

class user extends Model {}

user.init({
	login: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    /*set(value: string) {
      this.setDataValue('password', crypt.createHash('md5').update(value).digest('hex'));
    }*/
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  isdeleted: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0    
  }
}, {
	sequelize,
  	modelName: 'user',
  	timestamps: false
});

module.exports = user;