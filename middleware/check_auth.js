"use strict";

var jwt = require("jsonwebtoken");
require("../controllers/auth")

module.exports = function(req, res, next) {
    try {
        //ye split isliye kia take bearer ko hata sakay aur sirf token ka link lesakay
        var token = req.headers.authorization;
        console.log(token);
        const verify = jwt.verify(token, process.env.KEY);
        console.log(verify);
        // res.render("newpassword.html")
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).send(err);
    }
};