var express = require('express');
var router = express.Router();
var models = require('../models/');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('add',{title: 'ADD A PAGE'})
});

router.post('/submit',function(req,res,next){
	// console.log('some thing');
	// res.render('add_page',{title: 'ADD A PAGE'})

  // STUDENT ASSIGNMENT:
  // add definitions of the `title`, `content` and `url_name` variables here
  var title = req.body.title;
  var content = req.body.content;
  var url_name = generateUrlName(title);
  var newTags = req.body.tags.split(' ');
  var page = new models.Page({ 'title': title, 'content': content, 'url_name': url_name, 'tags': newTags });
  page.save();
  res.redirect('/');

})

// router.post('/submit',function(req,res,next){
//   var url = req.headers.referer
//   var title = url.substr(url.lastIndexOf('/')+1)
//   var newTags = req.body.tags.split(' ');
//   models.Page.findOne({ title: title }, function(err, data) {
//     if (err) throw Error;
//     data.tags = data.tags.concat(newTags);
//     data.save();
//     res.redirect(url);
//   })
// });

function generateUrlName(name) {
  if (typeof name != "undefined" && name !== "") {
    // Removes all non-alphanumeric characters from name
    // And make spaces underscore
    return name.replace(/\s/ig, '_').replace(/\W/ig,'');
  } else {
    // Generates random 5 letter string
    return Math.random().toString(36).substring(2,7);
  }
};


module.exports = router;
