var express = require('express');
var router = express.Router();
const { checkDuplicateUsernameOrEmail, checkRolesExisted } = require('../middlewares/verifySignUp');
const { signup, signin } = require("../controllers/auth");
const { allAccess, adminBoard, userBoard, clientBoard } = require('../controllers/user')
const authJwt = require("../middlewares/authJwt");

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.post('/signup',[checkDuplicateUsernameOrEmail,checkRolesExisted],signup)

router.post("/signin", signin);

router.get("/test/all", allAccess);

router.get("/test/user", [authJwt.verifyToken], userBoard);

router.get("/test/client",[authJwt.verifyToken, authJwt.isClient],clientBoard);

router.get("/test/admin",[authJwt.verifyToken, authJwt.isAdmin],adminBoard);




module.exports = router;
