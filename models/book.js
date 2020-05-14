'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    id: {
    	type: DataTypes.INTEGER,
    	primaryKey: true
    },
    name: DataTypes.STRING,
    author: DataTypes.STRING,
    publisher: DataTypes.STRING,
    year: DataTypes.STRING
  }, {
  	timestamps: false
  });
  return Book;
};