//Dependencies
var express = require('express');
var cheerio = require('cheerio');
var rp = require('request-promise');
var router = express.Router();
var db = require('../models');

//route to scrape new headlines
router.get("/newheadlines", function(req, res) {
  //configuring options object for request-promist
  var options = {
    uri: 'https://www.wired.com/category/business/',
    transform: function (body) {
        return cheerio.load(body);
    }
  };
  //calling the database to return all saved headlines
  db.Healine
    .find({})
    .then((savedHeadlines) => {
      //Array of saved headlines
      let savedHeadlines = savedheadlines.map(headline => headline.headline)

        //calling request promist with options object
        rp(options)
        .then(function ($) {
          let newHeadlineArr = [];
          //iterating over returned headlines, and creating a newHeadline object from the data
          $('#latest-panel headline.story.theme-summary').each((i, element) => {
            let newheadline = new db.headline({
              storyUrl: $(element).find('.story-body>.story-link').attr('href'),
              headline: $(element).find('h2.headline').text().trim(),
              summary : $(element).find('p.summary').text().trim(),
              imgUrl  : $(element).find('img').attr('src'),
              byLine  : $(element).find('p.byline').text().trim()
            });
            //checking to make sure newheadline contains a storyUrl
            if (newHeadline.storyUrl) {

              if (!savedHeadlines.includes(newHeadline.headline)) {
                newHeadlineArr.push(newHeadline);
              }
            }
          });//end of each function

          //adding all new headlines to database
          db.Headline
            .create(newHeadlineArr)
            .then(result => res.json({count: newHeadlineArr.length}))//returning count of new articles to front end
            .catch(err => {});
        })
        .catch(err => console.log(err))//end of rp method
    })
    .catch(err => console.log(err))//end of db.Headline.find()
});

module.exports = router;