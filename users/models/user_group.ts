const groupDBContext = require("../utils/dbutils");

export class groupModel extends groupDBContext.Model {}

groupModel.init({
	name: {
    type: groupDBContext.DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  permissions: {
    type: groupDBContext.DataTypes.INTEGER,
    allowNull: false
  }
}, {
	  sequelize: groupDBContext.sequelize,
  	modelName: 'group',
  	timestamps: false
});


export class userModel extends groupDBContext.Model {}

userModel.init({
	login: {
    type: groupDBContext.DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: groupDBContext.DataTypes.STRING,
    allowNull: false,
    /*set(value: string) {
      this.setDataValue('password', crypt.createHash('md5').update(value).digest('hex'));
    }*/
  },
  age: {
    type: groupDBContext.DataTypes.INTEGER,
    allowNull: false
  },
  isdeleted: {
    type: groupDBContext.DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0    
  }
}, {
	sequelize: groupDBContext.sequelize,
  	modelName: 'user',
  	timestamps: false
});
groupModel.belongsToMany(userModel, {through: 'usergroup', timestamps: false, foreignKey: { name: 'userid' }});
userModel.belongsToMany(groupModel, {through: 'usergroup', timestamps: false, foreignKey: { name: 'groupid' }});