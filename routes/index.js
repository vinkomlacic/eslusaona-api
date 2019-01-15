/**
 * Route configuration for the application.
 * @author vmlacic
 */

/**
 * Swagger type definitions
 */

 /**
  * @typedef Status
  * @property {integer} code
  * @property {string} message
  */

 /**
  * @typedef Response
  * @property {string} type
  * @property {Status.model} status.required
  * @property {object} data
  */

  /**
   * @typedef User
   * @property {integer} id
   * @property {string} uuid
   * @property {string} firstName
   * @property {string} lastName
   * @property {string} userName
   * @property {string} email
   * @property {string} password
   * @property {integer} RoleId
   */

 const { SingleItemResponse } = require('../utils/response');
 const { statusCodes } = require('../utils');

module.exports = function(app) {
  const userRouter = require('./user');
  const songRouter = require('./song');
  const artistRouter = require('./artist');
  const albumRouter = require('./album');
  const genreRouter = require('./genre');
  
  app.use('/user', userRouter);
  app.use('/song', songRouter);
  app.use('/artist', artistRouter);
  app.use('/album', albumRouter);
  app.use('/genre', genreRouter);
  
  const authController = require('../controller/Authentication');

  /** 
   * Handles requests to /login.
   * @route POST /login
   * @group authentication - handles authentication operations
   * @param {string} username.body.required
   * @param {string} password.body.required
   * @produces application/json
   * @consumes application/json
   * @returns {Response.model} 200 - SingleItemResponse: the JWT token
   * @returns {Response.model} 500 - Error response if the user does not exist
   * or the username / password combination is invalid.
   */
  app.post('/login', authController.login);

  /** 
   * Handles requests to /register.
   * @route POST /register
   * @group authentication - handles authentication operations
   * @param {string} firstName.body.required
   * @param {string} lastName.body.required
   * @param {string} userName.body.required
   * @param {string} email.body.required
   * @param {string} password.body.required
   * @produces application/json
   * @consumes application/json
   * @returns {User.model} 200 - SingleItemResponse: The newly created user data
   * @returns {Response.model} 500 - Error response if the request format is
   * invalid on email or username already exist in database.
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
   * @route POST /validate
   * @group authentication - handles authentication operations
   * @produces application/json
   * @consumes application/json
   * @returns {Response.model} 200 - SingleItemResponse: decoded token
   * @returns {Response.model} 500 - Error if the token has expired or is
   * invalid in any other way.
   * @security JWT
   */
  app.get('/validate', authController.validate);

  /**
   * @route GET /
   * @produces text/plain
   * @returns {Response.model} 200 - SingleItemResponse: hello message
   */
  app.get('/', (req, res, next) => {
    const response = new SingleItemResponse(statusCodes.OK, {
      message: 'Hi! Server is working properly for this endpoint.',
    });
    res.status(200).send(response);
  });

  
}