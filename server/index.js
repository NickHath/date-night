require('dotenv').config();
const bodyParser = require("body-parser")
    , express = require("express")
    , session = require("express-session")
    , massive = require('massive')
    , cors = require('cors')
    , dateCtrl = require('./dateCtrl');

const app = express();

app.use(bodyParser.json());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
}))

massive(process.env.CONNECTION_STRING).then((db) => {
    console.log("Database connected")
    app.set('db', db)
})


const PORT = 8080;
app.listen(PORT, console.log(`I'm listening... port: ${PORT}`));