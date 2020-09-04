const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port: process.env.APP_PORT,
  databaseURL: process.env.DB_URI
} 