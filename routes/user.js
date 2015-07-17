var Joi = require('joi');
var user = require('../controllers/user');

var login = {
	path: '/login',
	method: 'post',
	handler: user.login, 
	config: {
		description: 'login route for the application. create user session cookie',
		validate:{
			payload:{
				mobile: Joi.string().regex(/^[0-9]{10}$/, ['mobile']).required(),
				password: Joi.string().required()
			}
		}
	}	
};

var loginStatic = {
	path: '/login',
	method: 'get', 
	config: {
		description: 'get login.html page. this will redirect to login.html',
		handler: function(request, reply){
			return reply.redirect('/login.html')
		},
	}	
};

var logout = {
	path: '/logout',
	method: 'get',
	handler: user.logout, 
	config: {
		description: 'logout route for the application. clears the user session',
		auth: 'session'
	}	
};

var register = {
	path: '/register',
	method: 'post',
	handler: user.register,
	config: {
		description: 'register route for the application mobile field should be unique',
		validate:{
			payload:{
				mobile: Joi.string().regex(/^[0-9]{10}$/, ['mobile']).required(),
				password: Joi.string().regex(/^[a-zA-Z0-9]{4,20}$/, 'password').required(),
				firstName: Joi.string().trim().min(3).max(20).regex(/^[a-zA-Z]{2,20}$/, 'first name').required(),
				lastName: Joi.string().trim().min(3).max(20).regex(/^[a-zA-Z]{2,20}$/, 'last name').required(),
				type: Joi.string().valid(['ADMIN','STUDENT','TEACHER']).required(),
				address: Joi.string().trim().optional()
			}
		}
	}
};

var dashboard = {
	path: '/dashboard',
	method: 'get',
	config: {
		description: 'this route will display the dashboad page',
		auth: 'session',
		handler: function handler(request, reply){
			reply('Hello ' + request.auth.credentials.firstName + ' ' + request.auth.credentials.lastName );
		}
	}
}

module.exports = [loginStatic, login, logout, register, dashboard];