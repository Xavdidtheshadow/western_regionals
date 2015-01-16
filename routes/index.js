var express = require('express');
var router = express.Router();

// routes

// root
router.get('/', function(req, res) {
  res.render('layout', {title: 'Register to Volunteer'});
});

// router.get('/check', function(req, res){
//   res.render('havei', {title: 'Have you?'});
// });

// API
router.get('/api', function(req, res) {
  res.json({
    message: "This is some brief documentation",
    routes: {
      player: {
        get: "get player",
        post: "store player"
      },
      team: {
        get: "get team"
      }
    }
  });
});

module.exports = router;
