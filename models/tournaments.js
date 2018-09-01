module.exports = function(sequelize, DataTypes) {
    var Tournament = sequelize.define('Tournament', {
        game: DataTypes.STRING,
        regEnd: DataTypes.DATE,
        tournStart: DataTypes.DATE,
        totalTeams: DataTypes.INTEGER,
        currentTeams: DataTypes.INTEGER,
        teamSize: DataTypes.INTEGER,
        entryFee: DataTypes.FLOAT,
        prize: DataTypes.FLOAT,
        image: DataTypes.STRING
    });

    Tournament.associate = function(models) {
        Tournament.hasOne(models.Bracket, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Tournament;
};