var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'BROWSE MY WIKISTACK', pages: {1: 'Fullstack Home', 2: 'About Me', 3: 'My Project', 4: 'My City', 5: "Code I've written"}});
});

router.get('/about_us', function(req, res, next) {
	res.render('about_us', {});
});

module.exports = router;
