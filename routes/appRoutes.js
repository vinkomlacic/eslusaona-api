/**
 * Route configuration for the application.
 * @author vmlacic
 */

module.exports = function(app) {
  let userController = require('../controller/UserController');

  // User routes
  app.route('/users')
    .get(userController.getAllUsers)
    .post(userController.createUser);
  
  app.route('/users/:userId')
    .get(userController.getUser);
}