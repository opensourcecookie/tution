var Code = require('code');   // assertion library
var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.experiment;
var it = lab.test;

var server = require('../server');
var config = require('../config');

describe('tution tests ->', function(){

	lab.before({timeout: 10000}, function(done){
		server.startServer(function(){
			done();
		});
	});

	require('./web_component')(server, describe, it, Code);
	require('./user')(server, describe, it, Code);

});