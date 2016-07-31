var express = require('express');
var router = express.Router();
var tree = require('../jsonTree.js');

router.get('/parents', (req, res) => {
  tree.getParents(req.query.userId, req.query.generationBack, (err, data) => {
    if(err) {
      console.error(err);
      res.status(500).send('Something broke!');
    }
    else {
      res.json(data);
      res.end();
    }
  });
});

router.get('/children', (req, res) => {
  tree.getChildren(req.query.userId, req.query.generationBack, (err, data) => {
    if(err) {
      console.error(err);
      res.status(500).send('Something broke!');
    }
    else {
      res.json(data);
      res.end();
    }
  });
});

module.exports = router;
