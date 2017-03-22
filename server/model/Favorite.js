module.exports = function(sequelize, DataTypes) {
    var Favorite = sequelize.define("Favorite", {
        "owner": {
            type: DataTypes.STRING
        },
        "favorite": {
            type: DataTypes.TEXT
        }
    }, {
        timestamps: true,
        freezeTableName: true,
        charset: 'UTF8'
    });

    return Favorite;
};