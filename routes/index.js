/**
 * Route configuration for the application.
 * @author vmlacic
 */

module.exports = function(app) {
  const userRouter = require('./user');
  const songRouter = require('./song');
  
  app.use('/user', userRouter);
  app.use('/song', songRouter);
  
  const authController = require('../controller/Authentication');
  /**
   * Handles requests to /login.
   * Contents of the request are username/email and password.
   * In the response the API returns a token.
   * In the header of every consequent request the client must send that token.
   * The token is valid for 5 minutes. Every new request refreshes the token.
   */
  app.post('/login', authController.login);

  /**
   * Handles requests to /register.
   * Contents of the request are:
   * -first name
   * -last name
   * -username
   * -email
   * -password
   * 
   * The response is just an OK status if the request passes server validation
   * and the user has to login with the data he specified to access the API.
   */
  app.post('/register', authController.register);

  /**
   * Handles requests to /resetPassword.
   * Contents of the request are:
   * -email
   * -oldPassword
   * -newPassword
   * 
   * The response is status OK is request is valid.
   * @todo Not set on the logic for this endpoint. Should this be on the /user endpoint?
   */
  // router.post('/', authController.resetPassword);

  /**
   * Handles requests to /validate.
   * Validates the token.
   * Response status is OK if the token has not expired.
   */
  app.get('/validate', authController.validate);

  app.get('/', (req, res, next) => {
    res.status(200).send('Hi! Server is working properly for this endpoint.');
  });

  
}