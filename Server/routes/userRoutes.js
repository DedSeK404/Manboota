const express = require("express");
const { Signup, Signin } = require("../controllers/userControllers");
const router = express.Router();

/**
 *@method POST /auth/signup
 *@description register a new user
 *@access public
 */

router.post("/signup",Signup); 

/**
 *@method POST /auth/signin
 *@description login user
 *@access public
 */

 router.post("/signin",Signin)

module.exports = router;
