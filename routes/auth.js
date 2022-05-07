const express = require("express");
const router = express.Router();
const { signup, forgetpasswordrender, resetpassword, forgetpassword } = require("../controllers/auth");

router.post('/signup', signup);
router.get('/password-reset/:id/:resetLink', forgetpasswordrender)
router.put('/forgetpassword', forgetpassword)
router.put('/resetpassword/:resetLink', resetpassword)
module.exports = router;