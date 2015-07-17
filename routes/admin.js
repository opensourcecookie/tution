var Joi = require('joi');
var admin = require('../controllers/admin');

var payFee = {
	path 	: '/admin/user/{userId}/pay/fee'
	method	: 'post',
	handler : admin.payFee,
	config 	: {
		description	: 'route to submit user\'s fee only admin can call payfee route',
		validate	: {
			params	: {
				userId: Joi.number().min(0).required()
			},
			payload	: {
				amount: Joi.number().min(800).required()
			}
		}
	}
};

var listFee = {
	path 	: '/admin/fee/{month}/list'
	method	: 'get',
	handler : admin.listFee,
	config 	: {
		description	: 'route to list the fees status of students',
		validate	: {
			params	: {
				month: Joi.string().valid(['JANUARY', 'FEBRUARY', 'MARCH',
									'APRIL', 'MAY', 'JUNE', 'JULY',
									'AUGUST', 'SEPTEMBER', 'OCTOBER',
									'NOVEMBER', 'DECEMBER']).required()
			}
		}
	}
};