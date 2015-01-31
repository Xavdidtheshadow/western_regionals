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
    Person
      .find()
      .populate('team')
      .exec(function(err, teams){
        if(err){return next(err);}

        res.json(teams);
      });
  });

  app.get('/api/people/aggregate', function(req, res, next){
    Person
      .aggregate([{
        $group: {
          _id: "$team", 
          num: {
            $sum: 1
          }
        }
      }])
      .exec(function(err, teams){
        if(err){return next(err);}

        var opts = {
          path: '_id',
          model: 'Team'
        };

        Team.populate(teams, opts, function(err, teams){
          if(err){return next(err);}

          res.json(teams);
        });
      });

  });

  app.post('/api/people', function(req, res, next){
    var p = new Person(req.body);

    p.save(function(err, pers){
      if(err){return next(err);}
      res.json(pers);
    });
  });

  app.get('/api/search/:email', function(req, res){
    Person
      .findOne({email: req.params.email})
      .exec(function(err, person){
        if(err){return next(err);}

        res.json(person);
    });
  });

	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};