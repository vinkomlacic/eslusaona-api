/**
 * Route configuration for the application.
 * @author vmlacic
 */

module.exports = function(app) {
  const userRouter = require('./user');

  app.route('/user', userRouter);
  
}