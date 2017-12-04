require('dotenv').config();
const bodyParser = require("body-parser")
    , express = require("express")
    , massive = require('massive')
    , cors = require('cors')
    , dateCtrl = require('./controllers/dateCtrl');

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


const PORT = 4200;
app.listen(PORT, console.log(`I'm listening.. port: ${PORT}`));