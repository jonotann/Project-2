var db = require("../models");
var getImage = require("./igdbApi");

module.exports = function(app) {

  //Creates tournament and associated bracket
  app.post("/api/tournament/create", function(req, res) {
    
    var game = req.body.game;
    //api is called but will not return url
    db.Tournament.create(req.body).then(function(result) {
        
      var id = result.dataValues.id;
      //calls igdb api to update tournament with image url.
      getImage(game, id);

      var TournamentId = {
        TournamentId: result.dataValues.id,
        max: result.dataValues.totalTeams,
        team: result.dataValues.team
      };
      //Creates tournament Bracket.
      db.Bracket.create(TournamentId).then(function(result) {
          
      });
    });
  });

  //Adds user/team to tournament. Tournament id from url, team id in body.
  app.put("/api/tournament/join/:id", function(req, res) {
    //call for table associated with tournament.
    db.Bracket.findAll({ where: {TournamentId: req.params.id }}).then(function(result) {
      
      var bracket = result[0].dataValues;
      var teamID = req.body.team;
      var max = parseInt(bracket.max) + 1;
      var targetKey = null;

      //check each table value to find first null.
      Object.keys(bracket).forEach(function(key) {

        if(parseInt(key) < max){
            
          if(bracket[key] === null && targetKey === null) {
            
            targetKey = key;
          
          }
        }
      });

    //if open slot, updates bracket with new team.
    if(targetKey != null) {
      
      var updateValues = {};
      updateValues[targetKey] = teamID;

        db.Bracket.update(updateValues, { where: {TournamentId: req.params.id}}).then(function(result) {
          
          if(result[0] == 1){
            console.log("joined");
          }else{
            console.log("failed");
          }
        });
      }else{
        return;
      }
    });

    res.end();
  });
  //Allows Creation of a Team.
  app.post("/api/team/create", function(req, res) {
    
    var team = req.body.team;


  });
  //Adds user to team on join.
  app.put("/api/team/join/:id", function(req, res) {

  });
};