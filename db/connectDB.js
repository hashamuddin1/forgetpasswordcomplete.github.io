const mongoose = require("mongoose");

mongoose.connect(process.env.Database, {
    useNewUrlParser: true
}).then(() => {
    console.log("Connection Successful")
}).catch((e) => {
    console.log(e)
})