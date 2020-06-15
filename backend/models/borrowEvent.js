'use strict';
module.exports = (sequelize, DataTypes) => {
    const BorrowEvent = sequelize.define('BorrowEvent', {
        MemberId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Members',
                key: 'id'
            },
            onDelete: 'RESTRICT',
            unique: 'Member_Book_Unique'
        },
        BookId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Books',
                key: 'id'
            },
            onDelete: 'RESTRICT',
            unique: 'Member_Book_Unique'
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
    }, {});

    BorrowEvent.associate = function(models) {
        BorrowEvent.belongsTo(models.Book);
        BorrowEvent.belongsTo(models.Member);
    }
    return BorrowEvent;
};