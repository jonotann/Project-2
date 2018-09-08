var mysql = require('mysql');
var connection;
if(process.env.JAWSDB_URL) {
	connection = mysql.createConnection(process.env.JAWDB_URL);
}else {
 connection = mysql.createConnection({
	host: 'localhot',
	user: 'root',
	password: 'root',
	database: 'testdb',
	port:3306,
});
};

function connectToDB(){
	connection.connect(function(err){
		if (err) {
			console.error('error connection:', err.stack);
			return
		}
		console.log('connected to MySQL DB')
	});
}

module.exports.connectToDB = connectToDB;

function addUserToDB(userObj, callback){
	connection.query('INSERT INTO tblUsers SET ?', userObj, function(err, results){
		if (err) return callback(false, err)
		callback(true. null)
	});
}

module.exports.addUserToDB = addUserToDB;

function findUser(username, callback){
	connection.query('SELECT * FROM tblUsers WHERE ?', {username: username}, function(err, user){
		callback(err, user)
	})
}
module.exports.findUser = findUser;

