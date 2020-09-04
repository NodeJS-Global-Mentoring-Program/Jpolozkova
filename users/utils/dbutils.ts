const config = require('../config/index');

const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize(config.databaseURL);
module.exports = {sequelize, DataTypes, Model};