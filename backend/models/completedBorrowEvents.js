'use strict';
module.exports = (sequelize, DataTypes) => {
    const CompletedBorrowEvent = sequelize.define('CompletedBorrowEvent', {
        MemberId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Members',
                key: 'id'
            }
        },
        BookId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Books',
                key: 'id'
            }
        },
        borrowedDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        returnedDate: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {});
    return CompletedBorrowEvent;
};