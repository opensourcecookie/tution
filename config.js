module.exports = {
	server: {
		host		: 'localhost',
		port		: 3000
	},
	mongodb: {
		path		: 'mongodb://localhost:27017/',
		dbName		: 'testapp',
		username	: '',
		password	: ''
	},
	database: {
		dialect		: 'mysql', 
		name   		: 'tution',
		username	: 'root',
  		password 	: '',
  		pool: {
		    max: 5,
		    min: 0,
		    idle: 10000
		}
	}
}