var models = require('../models');
var bcrypt = require('bcrypt-nodejs');
var Boom = require('boom');
var async = require('async');

module.exports = {
	
	register: function(request, reply){

		async.waterfall([
			function genrateHash(cb) {
				bcrypt.hash(request.payload.password, null, null, cb);
			},

			function validatePassword(hash, cb) {
				models.User.findOrCreate({
				where: {
					mobile: request.payload.mobile
				}, 
				defaults: {
					firstName: request.payload.firstName,
					lastName: request.payload.lastName,
					address: request.payload.address,
					type: request.payload["type"],
					password: hash
				}})
				.spread(function(user, created) {
					cb(null, user, created)			    	
			    });
			}], 

			function asyncFinally(err, user, created){
				if(err){
					return reply(Boom.serverTimeout('unavailable', err));
				} else if(created) {
					reply({status: true, message: 'user successfully created.' ,user: user});
				} else {
					reply(Boom.conflict(['user already created.']));
				}
			});
	},

	validate: function(session, callback){
		models.User.findOne({
			where : {
				mobile: session.mobile,
				id: session.id
				}
			})
			.then(function(user){
				if (user && user.id) {
					callback(null, true);
				}else{
					callback(null, false);
				}
			}, function(err){
				callback(err);
			});
	},

	login: function(request, reply){
		if (request.auth.isAuthenticated) {
			return reply('already logged in');
		}

		models.User.findOne({
			where:{
				mobile: request.payload.mobile
			}
		})
		.then(function(user){
			bcrypt.compare(request.payload.password, user.dataValues.password, function(err, valid){
				if (err) {
					reply(Boom.serverTimeout('unavailable', err));
					console.log(user.dataValues.password);
				} else if(!valid) {
					reply(Boom.unauthorized('invalid password'));
				}else{
					request.auth.session.set(user.dataValues);
					//reply.redirect('/dashboard');
					delete user.password;
					reply({status: true, user: user});
				}
			});
		}, function(err){
			reply(Boom.serverTimeout('unavailable', err));
		});
	},

	logout: function(request, reply){
		request.auth.session.clear();
    	return reply.redirect('/');
	},

	payFee: function(request, reply){
		
		models.Fee.findOrCreate({
			where: {
				userId	: request.auth.credentials.id,
				month	: request.payload.month
			},
			defaults: {
				amount	: request.payload.amount,
				id 		: request.credentials.id,
				month 	: request.payload.month
			}
		})
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
				userId: request.auth.credentials.id
			}
		})
		.then(function (feeDetail) {
			reply(feeDetail);
		})
		.catch(function (err) {
			reply(Boom.serverTimeout('unavailable', err));
		});
	}

}
