var Hapi = require('hapi');
var Good = require('good');
var models = require('./models');
var user = require('./controllers/user');
var config = require('./config');
var async = require('async');

var server = new Hapi.Server();
server.connection(config.server);

server.startServer = function(callback){
	async.series(
		[	
			function(cb){
				models.sequelize.sync().then(function () {
					cb();
				}, function(error){
					cb(error);
				});
			},
			function(cb){
				//register good module
				server.register(
				[
					{
						register: require('hapi-auth-cookie')
					},
					{
						register: Good,
						options: {
							reporters: [{
								reporter: require('good-console'),
								args: [{log: '*', response: '*'}]
							}]
						}
					},
					{
						register: require('lout')
					}
				],  function (err) {
					if(err){
						return cb(err);
					}
    				server.auth.strategy('session', 'cookie', {
				        password: 'asdasdkj213aSDFHJ12HKJ3HJHAS122',
				        cookie: 'sid',
				        redirectTo: '/login.html',
				        isSecure: false,
				        validateFunc : user.validate
				    });
				    cb();
    			});

			},

			function(cb){
				//add routes
				server.route(require('./routes'));
				cb();
			},

			function(cb){
				if(!module.parent){
					return server.start(cb);
				}
				cb();
			}
		], function(err){
			if(err){
				console.log(err);
				process.exit(1);
			}else if(typeof callback === 'function'){
				callback();
				console.log(server.info);
			}else{
				console.log(server.info);
			}
		});

};

(function(){
	if(!module.parent){
		server.startServer();	
	}
})();

module.exports = server;



