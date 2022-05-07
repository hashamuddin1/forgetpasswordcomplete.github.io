const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config();
require('./db/connectDB')
const bodyparser = require('body-parser')
const port = process.env.PORT || 80;
app.use(bodyparser.urlencoded({ extended: true }))
const authroutes = require('./routes/auth')
app.use(express.json());
app.get('/', (req, res) => {
    res.send('hasham')
})
app.use(cors())
app.use(authroutes)
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})