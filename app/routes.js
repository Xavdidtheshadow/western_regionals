module.exports = function(app) {
  var mongoose = require('mongoose');
  var Team = mongoose.model('Team');
  var Person = mongoose.model('Person');

	app.get('/api/teams', function(req, res, next){
    Team.find(function(err, teams){
      if(err){return next(err);}

      res.json(teams);
    });
  });

  app.get('/api/people', function(req, res, next){
    Person.find(function(err, people){
      if(err){return next(err);}

      res.json(people);
    });
  });

  app.get('/api/search/:email', function(req, res){
    var q = Person.findOne({email: req.params.email});

    q.exec(function(err, person){
      console.log(person);
      res.json(person);
    });
  });

  app.post('/api/people', function(req, res, next){
    var p = new Person(req.body);

    p.save(function(err, pers){
      if(err){return next(err);}
      res.json(pers);
    });
  });

	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};