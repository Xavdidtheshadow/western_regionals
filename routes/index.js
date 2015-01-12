var express = require('express');
var router = express.Router();

// root
router.get('/', function(req, res) {
  res.render('index', { title: 'Western Regionals' });
});

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
