var models = require('../models');
var Boom = require('boom');
var async = require('async');

exports.payFee = function(request, reply) {
	models.User.findOne({
		where: {
			userId: request.payload.userId
		}
	})
	.then(function(user){
		reply(user);
	}, function(err){
		reply(Boom.serverTimeout('unavailable', err));
	});
};