module.exports = function(sequelize, DataTypes) {
    var Lables = sequelize.define("Lables", {
        "name": {
            type: DataTypes.STRING
        },
        "icon": {
            type: DataTypes.STRING
        }
    }, {
        timestamps: true,
        freezeTableName: true,
        charset: 'UTF8'
    });

    return Lables;
};
