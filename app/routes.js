module.exports = function(app) {
  var mongoose = require('mongoose');
  var Team = mongoose.model('Team');
  var Person = mongoose.model('Person');

	// server routes ===========================================================
	// handle things like api calls
	app.get('/api/teams', function(req, res, next){
    Team.find(function(err, teams){
      if(err){return next(err);}
      res.json(teams);
    });
  });

  app.post('/api/persons', function(req, res, next){
    var p = new Person(req.body);

    p.save(function(err, pers){
      if(err){return next(err);}
      res.json(pers);
    });
  });

	// frontend routes =========================================================
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};