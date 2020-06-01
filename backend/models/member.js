'use strict';

const bcrypt = require('bcrypt');
const authConfig = require('../config/auth_config');

const hashPassword = async (member, options) => {
    if (!member.changed('password')) {
        return;
    }
    const hashedPassword = await bcrypt.hash(member.password, authConfig.bcryptSaltRounds);
    // console.log('Hashed', hashedPassword, member.password);
    member.password = hashedPassword;
}

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
            /*set(value) {
                console.log('herhe');
                const hashedPassword = bcrypt.hashSync(value, authConfig.bcryptSaltRounds);
                console.log('Hashed', hashedPassword, value);
                this.setDataValue('password', hashedPassword);
            }*/
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'MEMBER'
        },
        currFine: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        hooks: {
            beforeSave: hashPassword
        }
    });
    Member.associate = function(models) {
        // associations can be defined here
    };
    Member.prototype.isCorrectPassword = function(password, callback) {
        bcrypt.compare(password, this.password, (err, result) => {
            if (err) {
                callback(err);
            } else {
                callback(err, result);
            }
        });
    }
    return Member;
};