var models = require('../models');
var bcrypt = require('bcrypt-nodejs');
var Boom = require('boom');
var async = require('async');

module.exports = {
	payFee: function(request, reply){
	
		var fee = {
			amount	: request.payload.amount,
			id 		: request.payload.id,
			month 	: request.payload.month
		};

		models.Fee.findOrCreate({
			where: {
				userId	: request.auth.credentials.id,
				month	: request.payload.month
			}
		}, defaults: fee)
		.then(function (feeDetail) {
			reply(feeDetail);
		})
		.catch(function (err) {
			reply(Boom.serverTimeout('unavailable', err));
		});
	},	

	listFee: function(request, reply){

		models.Fee.find({
			where: {
				month: request.params.month
			}
		}, defaults: request.payload)
		.then(function (feeDetail) {
			reply(feeDetail);
		})
		.catch(function (err) {
			reply(Boom.serverTimeout('unavailable', err));
		});
	}
};