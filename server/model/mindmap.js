
module.exports = function(sequelize, DataTypes) {
    var MindMap = sequelize.define("MindMap", {
        "name": {
            type: DataTypes.STRING
        },
        "owner": {
            type: DataTypes.STRING
        },
        "share": {
            type: DataTypes.BOOLEAN
        },
        "content": {
            type: DataTypes.TEXT('long')
        },
        "uuid": {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        "pic": {
            type: DataTypes.TEXT('long')
        },
        "release": {
            type: DataTypes.BOOLEAN
        }
    }, {
        timestamps: true,
        freezeTableName: true,
        charset: 'UTF8'
    });

    return MindMap;
};
