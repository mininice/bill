module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        "name": {
            type: DataTypes.STRING
        },
        "tel": {
            type: DataTypes.STRING
        },
        "password": {
            type: DataTypes.STRING
        },
        "email": {
            type: DataTypes.STRING
        }
    }, {
        timestamps: true,
        freezeTableName: true,
        charset: 'UTF8'
    });

    return User;
};
