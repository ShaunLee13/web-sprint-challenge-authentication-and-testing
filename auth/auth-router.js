const router = require('express').Router();
const Users = require('../users/users-model')
const constants = require('../config/config-vars')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')

router.post('/register', (req, res) => {
  const user = req.body;

    if (user.username && user.password) {
      user.password = bcryptjs.hashSync(user.password, constants.rounds);
      Users.add(user)
        .then(user => {
          res.status(201).json({ data: user });
        })
        .catch(error => {
          res.status(500).json({ message: error.message });
        });
    } else {
      res.status(400).json({
        message: "Please provide username and password for registration.",
      });
    }
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    Users.findBy({ username: username })
      .then(([user]) => {
        if (user && bcryptjs.compareSync(password, user.password)) {
          const token = signToken(user)

          res.status(200).json({ message: "Access granted", token });
        } else {
          res.status(401).json({ message: "You shall not pass!" });
        }
      })
      .catch(error => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message: "Please provide username and password",
    });
  }
});

function signToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  }

  const secret = constants.jwt

  const options = {
    expiresIn: '12h'
  }

  return jwt.sign(payload, secret, options)
}

module.exports = router;
