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

  jwt.verify(token, secret, function(err, user){
    if(!user) return res.status(401).json({
      message: 'Invalid token'});
      req.user = user;
      next();
  });
}

router.route('/authors')
  .get(secureRoute, authorsController.index);

router.route('/authors/:id')
  .all(secureRoute)
  .get(authorsController.show)
  .put(authorsController.update)
  .delete(authorsController.delete);

router.post('/register', authenticationController.register);
router.post('/login', authenticationController.login);

module.exports = router;