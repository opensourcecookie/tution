// var Code = require('code');   // assertion library
// var Lab = require('lab');
// var lab = exports.lab = Lab.script();

// var describe = lab.experiment;
// var it = lab.test;

// var server = require('../server');

var user = require('./fixtures/user');

module.exports = function (server, describe, it, Code) {
	
	describe('user ->', function(){

		it('{ /register }register student', function(done){
			var options = { 
				method: 'post',
				url: '/register',
				payload: user.student
			};

			server.inject( options, function(res){
				Code.expect(res.statusCode).to.equal(200);
				Code.expect(res.result.status).to.equal(true);
				done();
			});
		});

		it("{ /login } login user", function(done){
			var options = { 
				method: 'post',
				url: '/login',
				payload: {
					mobile: user.student.mobile,
					password: user.student.password
				}
			};

			server.inject( options, function(res){
				Code.expect(res.statusCode).to.equal(200);
				Code.expect(res.result.status).to.equal(true);
				done();
			});
		});

	});

};
