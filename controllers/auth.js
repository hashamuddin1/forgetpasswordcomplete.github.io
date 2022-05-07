const User = require("../models/users");
var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const lodash = require('lodash')

//Post Signup
const signup = async(req, res) => {
    try {
        const { firstName, email, password } = req.body;
        User.findOne({ email }).exec((err, user) => {
            if (err) {
                return res.send(400).json({ err: "User with this email is already exists" })
            }

            let newUser = new User({ firstName, email, password });
            newUser.save((err, success) => {
                if (err) {
                    console.log('error in signup' + err)
                    return res.status(400).send(err)
                }
                res.json({
                    message: "signup successfully"
                })
                console.log(req.body)
            })
        })
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
}

const forgetpassword = async(req, res) => {
    try {
        const { email, id } = req.body;
        User.findOne({ email }, (err, user) => {
            console.log(id)
            if (err || !user) {
                return res.status(400).json({ err: "USER WITH THIS EMAIL DOESNOT EXIST" })
            }
            const token = jwt.sign({ _id: user._id }, process.env.RESET_PASSWORD_KEY, { expiresIn: "20m" })
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'hasham.mangotech@gmail.com',
                    pass: 'mangotech_hasham147'
                }
            });
            var mailOptions = {
                from: 'hasham.mangotech@gmail.com',
                to: req.body.email,
                subject: 'Sending Email using Node.js',
                html: `<h1>Please click on given link to Reset Your Password</h1>
                    <p>http://localhost:80/password-reset/${id}/${token}</p>`
            };

            return User.updateOne({ resetLink: token }, (err, success) => {
                if (err) {
                    return res.status(400).json({ err: "Reset Password Link Error" })
                } else {
                    transporter.sendMail(mailOptions, function(error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                            return res.send("email send successfully")
                        }
                    });
                }
            })
        })
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
}

const forgetpasswordrender = async(req, res) => {
    const { resetLink, id } = req.params;
    if (resetLink) {
        jwt.verify(resetLink, process.env.RESET_PASSWORD_KEY, (error, decodeData) => {
            if (error) {
                console.log("Incorrect token or It is expired");
                return res.status(401).send("Incorrect token or It is expired")
            }
            User.findOne({ resetLink }, (err, user) => {
                if (err || !user) {
                    return res.status(400).send("User with this token doesnot exist")
                }
                console.log('token verified')
                return res.send(req.params)
            })
        })
    }
}

const resetpassword = async(req, res) => {
    const resetLink = req.params.resetLink
    const newPassword = req.body.newPassword;
    if (resetLink) {
        User.findOne({ resetLink }, (err, user) => {
            const obj = {
                password: newPassword,
                resetLink: ''
            }
            user = lodash.extend(user, obj);
            user.save((err, result) => {
                if (err) {
                    console.log(err)
                    return res.status(400).send("Reset Password error")
                } else {
                    return res.status(200).send("your password has been changed")
                }
            })
        })

    } else {
        return res.status(401).send("Authentication Error")
    }
}

module.exports = { signup, forgetpasswordrender, resetpassword, forgetpassword }