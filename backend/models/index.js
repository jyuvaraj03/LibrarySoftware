'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const authConfig = require(__dirname + '/../config/auth_config.json');
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.Member.addHook('beforeCreate', async (member, options) => {
    const hashedPassword = await bcrypt.hash(member.password, authConfig.bcryptSaltRounds);
    console.log('Hashed', hashedPassword, member.password);
    member.password = hashedPassword;
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;