var Joi = require('joi');
var user = require('../controllers/user');

var login = {
	path: '/login',
	method: 'post',
	handler: user.login, 
	config: {
		description: 'login route for the application',
		validate:{
			payload:{
				mobile: Joi.string().regex(/^[0-9]{10}$/, ['mobile']).required(),
				password: Joi.string().required()
			}
		}
	}	
};

var register = {
	path: '/register',
	method: 'post',
	handler: user.register,
	config: {
		description: 'resgister route for the application',
		validate:{
			payload:{
				mobile: Joi.string().regex(/^[0-9]{10}$/, ['mobile']).required(),
				password: Joi.string().regex(/^[a-zA-Z]{4,20}$/, 'password').required(),
				firstName: Joi.string().min(3).max(20).regex(/^[a-zA-Z]{2,20}$/, 'first name').required(),
				lastName: Joi.string().min(3).max(20).regex(/^[a-zA-Z]{2,20}$/, 'last name').required(),
				type: Joi.string().valid(['ADMIN','STUDENT','TEACHER']).required(),
				address: Joi.string().optional()
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

module.exports = [login, register, dashboard];