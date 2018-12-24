/**
 * Route configuration for the application.
 * @author vmlacic
 */

module.exports = function(app) {
  // const userRouter = require('./user');

  // app.use('/user', userRouter); // controller not finished yet
  app.get('/', function(req, res) {
    res.send('Lorem ipsum get response.');
  })

  app.post('/', function(req, res) {
    res.send('Lorem ipsum post response.')
  })
  
}