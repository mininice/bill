module.exports = function(sequelize, DataTypes) {
    var BList = sequelize.define("BList", {
        "type": {
            type: DataTypes.STRING
        },
        "sum": {
            type: DataTypes.STRING
        },
        "labelName": {
            type: DataTypes.STRING
        },
        "labelIcon": {
            type: DataTypes.STRING
        },
        "bBookName": {
            type: DataTypes.STRING
        },
        "comment": {
            type: DataTypes.STRING
        },
        "userID": {
            type: DataTypes.INTEGER
        }
    }, {
        timestamps: true,
        freezeTableName: true,
        charset: 'UTF8'
    });

    return BList;
};
