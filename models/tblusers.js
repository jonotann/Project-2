module.exports = function(sequelize, DataTypes) {
    var tbluser = sequelize.define('tbluser', {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        username: DataTypes.STRING,
        password: DataTypes.STRING
    });

    return tbluser;
};