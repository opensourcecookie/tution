var Joi = require('joi');
var student = require('../controllers/student');

var login = {
	path: '/student/{userId}/fee/month/{month}/pay',
	method: 'post',
	handler: student.payFee, 
	config: {
		description: 'route to submit tution fee for a month',
		validate:{
			params:{
				userId: Joi.number().min(0).required(),
				month: Joi.string().valid([
									'JANUARY', 'FEBRUARY', 'MARCH',
									'APRIL', 'MAY', 'JUNE', 'JULY',
									'AUGUST', 'SEPTEMBER', 'OCTOBER',
									'NOVEMBER', 'DECEMBER'
									]).required()
			}
		}
	}	
};