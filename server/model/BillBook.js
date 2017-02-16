module.exports = function(sequelize, DataTypes) {
    var BillBook = sequelize.define("BillBook", {
        "name": {
            type: DataTypes.STRING
        },
        "comment": {
            type: DataTypes.STRING
        }
    }, {
        timestamps: true,
        freezeTableName: true,
        charset: 'UTF8'
    });

    return BillBook;
};
