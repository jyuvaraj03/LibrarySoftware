'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author: DataTypes.STRING,
    publisher: DataTypes.STRING,
    year: DataTypes.STRING
  }, {});
  return Book;
};