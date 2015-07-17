var user = require('./user');

var staticRoute = {
				    method: 'GET',
				    path: '/{param*}',
				    handler: {
				        directory: {
				            path: 'public',
				            index: true 
				        }
				    }
				};

module.exports = [staticRoute].concat(user);