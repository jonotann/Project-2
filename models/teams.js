module.exports = function(sequelize, DataTypes) {
    var Team = sequelize.define('Team', {
        name: DataTypes.STRING
    });

    return Team;
};