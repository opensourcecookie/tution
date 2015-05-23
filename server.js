var Hapi = require('hapi');
var Good = require('good');
var models = require('./models');
var user = require('./controllers/user');
var config = require('./config');
var async = require('async');

var startServer = function(){
	var server = new Hapi.Server();
	server.connection(config.server);
	async.series(
		[
			function(cb){
				server.register(require('hapi-auth-cookie'), function (err) {
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
				//register good module
				server.register([{
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
				}], cb);

			},

			function(cb){
				server.route({
				    method: 'GET',
				    path: '/{param*}',
				    handler: {
				        directory: {
				            path: 'public',
				            index: true 
				        }
				    }
				});

				//add routes
				server.route(require('./routes'));
				cb();
			},

			function(cb){
				server.start(cb);
			}
		], function(err){
			if(err){
				console.log(err);
				process.exit(1);
			}else{
				console.log(server.info);
			}
		});

};

models.sequelize.sync().then(function () {
  startServer();
}, function(error){
	throw error;
});





