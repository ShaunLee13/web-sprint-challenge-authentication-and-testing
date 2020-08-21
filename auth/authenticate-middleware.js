/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken')
const constants = require('../config/config-vars')

module.exports = (req, res, next) => {
  const token = req.headers.authorization

  if(token){
    jwt.verify(token, constants.jwt, (error, decodedToken) => {
      if(error){
        res.status(401).json({ you: 'shall not pass!' });
      } else {
        req.jwt = decodedToken
        next()
      }
    })
  } else {
    res.status(401).json({message:'Please provide credentials'})
  }
};
