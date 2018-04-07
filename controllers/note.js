//delete route to remove an article from savedArticles
router.delete('/deleteArticle/:id', function(req,res){
    db.Article
      .remove({_id: req.params.id})
      .then(result => res.json(result))
      .catch(err => res.json(err));
  });