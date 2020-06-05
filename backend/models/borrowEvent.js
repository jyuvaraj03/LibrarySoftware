'use strict';
module.exports = (sequelize, DataTypes) => {
    console.log(sequelize.models);
    const BorrowEvent = sequelize.define('BorrowEvent', {
        MemberId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'Members',
            key: 'id'
          },
          onDelete: 'RESTRICT'
        },
        BookId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'Books',
            key: 'id'
          },
          onDelete: 'RESTRICT',
        },
        borrowedDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        dueDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        lastRenewedDate: DataTypes.DATE,
        numRenewals: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        isReturned: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        paranoid: true
    });
    BorrowEvent.associate = function(models) {
        BorrowEvent.belongsTo(models.Book, {
            foreignKey: 'BookId'
        });
        BorrowEvent.belongsTo(models.Member, {
            foreignKey: 'MemberId'
        });
    }
    return BorrowEvent;
};