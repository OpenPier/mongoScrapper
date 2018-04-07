//get route to render savedArticles.handlebars and populate with saved articles
router.get('/viewSaved', (req, res) => {
    db.Article
      .find({})
      .then(result => res.render('savedArticles', {articles:result}));
      .catch(err => res.json(err)
});
