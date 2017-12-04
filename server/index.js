require('dotenv').config();
const bodyParser = require("body-parser")
    , express = require("express")
    , massive = require('massive')
    , cors = require('cors')
    , dateCtrl = require('./controllers/dateCtrl');

const app = express();

app.use(bodyParser.json());

massive(process.env.CONNECTION_STRING).then((db) => {
    console.log("Database connected")
    app.set('db', db)
})

// expect req.body to have location, category, radius (optional)
app.post('/api/yelp', dateCtrl.getBusinessesByCat)

const PORT = 4200;
app.listen(PORT, console.log(`I'm listening.. port: ${PORT}`));