const User = require('../models/user')
const ROLES = require('../utils/auth.config').Roles
const xd = {}
xd.checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }
    // Email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }
      next();
    });
  });
};

xd.checkRolesExisted = (req, res, next) => {
  console.log('Comprobando si existen los roles')
  if (req.body.roles) {
    for (let i = 0; i < xd.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`
        });
        return;
      }
    }
  }

  next();
};

module.exports = xd;