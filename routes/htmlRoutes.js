var db = require("../models");
var UserModel = require('../User.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var orm = require('../db/orm.js');
var Sequelize = require("sequelize");
var Op = Sequelize.Op;


  // Load index page


//Setting the strategy for Passport
passport.use(new LocalStrategy({passReqToCallback : true},
  function(req, username, password, done) {

  	//Searching the ORM for the user in the database
  	orm.findUser(username, function(err, user){
  		user = user[0];
  		if (err) { return done(err); }
      if (!user) { return done(null, false); }

      //comparing user passwords - return if not a match
      if (password !== user.password) { return done(null, false);}

      return done(null, user);
  	});
  }
));

//These two methods are required to keep the user logged in via the session
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = function(app){

	  // Load tournament page and pass in an tournament by id
		app.get("/tournament/:id", function(req, res) {
			db.Tournament.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
				res.render("tournaments", {
					tournament: dbTournaments
				});
			});
		});

		app.get("/tournaments", function(req, res) {
			db.Tournament.findAll({}).then(function(dbTournaments) {
				res.render("tournaments", {
					msg: "Welcome!",
					tournaments: dbTournaments
				});
			});
		});

  //GETs
  app.get("/", function(req, res) {
      res.render("index", {
      
      });
  });
	app.get('/adminsignin', function(req, res){
		res.render('adminlog', {
			welcomeText: "Sign In",
			actionBtn: 'signin',
			message: req.flash('error')[0],
			otherAction: "Signup"
		});
	});

	app.get('/signin', function(req, res){
		res.redirect('/')
	});

	app.get('/signup', function(req, res){
		res.render('adminlog', {
			welcomeText: "Sign Up",
			actionBtn: 'signup',
			otherAction: "Signin"
		});
	});

	app.get("/", function(req, res) {
    db.Tournament.findAll({}).then(function(dbTournaments) {
      res.render("adminindex", {
        msg: "Welcome!",
        tournaments: dbTournaments
      });
    });
	});
	
	app.get('/meettheteam', function(req, res) {
		res.render('teamMeet', {

		});
	});

	app.get('/authenticated', function(req,res){
		if (req.isAuthenticated()) {
			db.Tournament.findAll({}).then(function(dbTournaments) {
			res.render('adminindex', {
				message1: "<li id ='navList' >admin has logged in</li>",
				message2: "<li><a href='http://localhost:3000' id ='navList'>sign out</a></li>",
				tournaments: dbTournaments
			});
		})
		} else {
			res.redirect('/')
		}
	});

	app.get('/logout', function(req, res){
	  req.logout();
	  res.redirect('/');
	});

	//POSTs

	app.post('/signin', passport.authenticate('local',{failureRedirect:'/', failureFlash:'Wrong Username or Password'}), function(req, res){
		res.redirect('/authenticated');
	});

	app.post('/signup', function(req, res){
		var user = new UserModel(req.body);
		UserModel.saveUser(user, function(status){
			if(!status) {
				res.redirect('/signup')
				return false
			}
			res.redirect('/');
		});
	});

	//retrieves and displays information for each tournament in database w/ join button holding unique tournament id.
	app.get('/tournaments', function(req, res) {
		db.Tournament.findAll().then(function(result) {
			console.log(result);
			var tournamentsObj = {
				tournaments: result
			}
			res.render('tournaments', tournamentsObj);
		});
	});

	//retrieves and displays teams in tournament
	app.get('/tournaments/bracket/:id', function(req, res) {

		var tId = req.params.id;
	
		//pulls the tournament bracket
		db.Bracket.findAll({ where: {TournamentId: tId}}).then(function(result) {

			var bracket = result[0].dataValues;
			var teamsArray = [];

			//constructs an array of team ids to search
			Object.keys(bracket).forEach(function(key) {

				teamsArray.push(bracket[key]);
				
			});

			var searchArray = [];

			//removes non-teamId data and any null values.
			for(var i=0; i<(teamsArray.length - 6); i++) {
				if(teamsArray[i] != null){
					searchArray.push(teamsArray[i]);
				}
			}

			console.log(searchArray);
			//Pulls team info for each id provided and renders.
			db.tbluser.findAll({attributes: ['username'], where: {userId: {[Op.or]: searchArray}}}).then(function(response) {
				
				console.log(response);

				var teamsObj = {
					teams: response
				}
				
				res.render('brackets', teamsObj);
			});
		});
	});

}
