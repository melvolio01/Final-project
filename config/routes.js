var router = require('express').Router();
var jwt = require('jsonwebtoken');
var authenticationController = require('../controllers/authentication');
var authorsController = require('../controllers/authors');
var commentsController = require('../controllers/comments');
var storiesController = require('../controllers/stories');
var secret = require('../config/tokens').secret;

function secureRoute(req, res, next){
  if(!req.headers.authorization) return res.status(401).json({ message: 'Unauthorized'});

  var token = req.headers.authorization.replace('Bearer ', '');

  jwt.verify(token, secret, function(err, author){
    if(!author) return res.status(401).json({
      message: 'Invalid token'});
      req.author = author;
      next();
  });
}

router.route('/stories')
  .get(secureRoute, storiesController.index);

router.route('/stories/:id')
  .all(secureRoute)
  .get(storiesController.show)
  .put(storiesController.update)
  .delete(storiesController.delete);

router.route('/authors')
  .get(secureRoute, authorsController.index);

router.route('/authors/:id')
  .all(secureRoute)
  .get(authorsController.show)
  .put(authorsController.update)
  .delete(authorsController.delete);

router.post('/register', authenticationController.register);
router.post('/login', authenticationController.login);

router.get('/', function(req, res) {
  res.render('index');
});

module.exports = router;