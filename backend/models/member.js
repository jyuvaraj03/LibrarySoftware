'use strict';
module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define('Member', {
    name: DataTypes.STRING,
    mobile: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'member'
    },
    curr_fine: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {});
  Member.associate = function(models) {
    // associations can be defined here
  };
  return Member;
};