module.exports = function(sequelize, DataTypes) {
    var BillList = sequelize.define("BillList", {
        "时间": {
            type: DataTypes.STRING
        },
        "账本": {
            type: DataTypes.STRING,
        },
        "账本类型": {
            type: DataTypes.STRING
        },
        "账户": {
            type: DataTypes.STRING
        },
        "账户类型": {
            type: DataTypes.STRING
        },
        "账户备注": {
            type: DataTypes.STRING
        },
        "账目类型": {
            type: DataTypes.STRING
        },
        "账目金额": {
            type: DataTypes.STRING
        },
        "账目分类": {
            type: DataTypes.STRING
        },
        "账目备注": {
            type: DataTypes.STRING
        }
    }, {
        timestamps: true,
        freezeTableName: true,
        charset: 'UTF8'
    });

    return BillList;
};
