require('dotenv').config();
const bodyParser = require("body-parser")
    , express = require("express")
    , massive = require('massive')
    , cors = require('cors')
    , dateCtrl = require('./controllers/dateCtrl');

const app = express();

app.use(cors());
app.use(bodyParser.json());

massive(process.env.CONNECTION_STRING)
  .then((db) => {
    console.log("Database connected")
    app.set('db', db)
  })
  .catch(err => console.log(err));

// req.body should have location, category and (optionally) radius
app.post('/api/yelp', dateCtrl.getBusinesses)
app.post('/api/yelp/business', dateCtrl.getBusinessById)
app.get('/api/yelp/hotandnew/:lat/:long', dateCtrl.hotAndNew)

app.get("/api/getAllDates/:location", dateCtrl.getAllDates)
app.get("/api/getDate/:id", dateCtrl.getDate)
app.post("/api/addDate", dateCtrl.addDate)
app.put("/api/modifyDate/:id", dateCtrl.modifyDate)
app.get("/api/test", dateCtrl.test)

const PORT = 4200;
app.listen(PORT, console.log(`I'm listening.. port: ${PORT}`));