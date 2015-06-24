var express = require('express');
var router = express.Router();
var models = require('../models/');

/* GET home page. */
router.get('/', function(req, res, next) {
	models.Page.find(function(err,data) {
		if (err) throw Error;
  		res.render('index', { title: 'BROWSE MY WIKISTACK', pages: data});
	})
});

router.get('/wiki/:url', function(req, res, next) {
	models.Page.where({ url_name: req.params.url }).findOne(function(err,data) {
		if (err) throw Error;
		res.render('content', {pages: data});
	});
});

router.post('/add/tag',function(req,res,next){
  var url = req.headers.referer
  var title = url.substr(url.lastIndexOf('/')+1)
  var newTags = req.body.tags.split(' ');
  models.Page.findOne({ url_name: title }, function(err, data) {
    if (err) throw Error;
    data.tags = data.tags.concat(newTags);
    data.save();
    res.redirect(url);
  })
});
// router.post('/delete/tag',function(req,res,next){
//   var url = req.headers.referer
//   var title = url.substr(url.lastIndexOf('/')+1)
//   var newTags = req.body.tags.split(' ');
//   models.Page.findOne({ url_name: title }, function(err, data) {
//     if (err) throw Error;
//     data.tags = data.tags.concat(newTags);
//     data.save();
//     res.redirect(url);
//   })
// });

router.post('/edit',function(req,res,next){
	var url = req.headers.referer;
	var title = url.substr(url.lastIndexOf('/')+1)
	models.Page.findOne({ url_name: title }, function(err, data) {
    if (err) throw Error;
    console.log(data.content);
    res.render('edit_page',{title: 'EDIT PAGE '+data.title, pages:data});
  })

})

router.get('/tags/:tag',function(req,res,next){
	var tag = req.params.tag;
	// console.log(req);
	models.Page.find({tags:tag},function(err,data){
		if(err) throw Error;
		res.render('index',{title:'List pages with tag '+tag,pages:data});
	})
})

// router.get('/add_page',function(req,res,next){
// 	res.render('add_page',{title: 'ADD A PAGE'})
// })

module.exports = router;
