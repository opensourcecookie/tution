// var Code = require('code');   // assertion library
// var Lab = require('lab');
// var lab = exports.lab = Lab.script();

// var describe = lab.experiment;
// var it = lab.test;

// var server = require('../server');

module.exports = function (server, describe, it, Code){

	describe('testing web component ->', function(){
	
		it('{ / } should fetch register.html', function(done){
			server.inject({method: 'get', url: '/'}, function(res){
				//console.log(res.headers);
				done();
			});
		});

		it('{ /login.html } should fetch login.html', function(done){
			server.inject({method: 'get', url: '/login.html'}, function(res){
				//console.log(res.header);
				done();
			});
		});

		it('{ /login } should redirect to login.html', function(done){
			server.inject({method: 'get', url: '/login'}, function(res){
				//console.log(res.header);
				done();
			});
		});

	});
}
