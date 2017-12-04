require('dotenv').config();
const axios = require('axios')

// Yelp API setup
const baseUrl = 'https://api.yelp.com/v3/businesses/search'
    , limit = 50
    , offset = null
    , config = { 
        headers: {
          'Authorization': `Bearer ${process.env.YELP_ACCESS_TOKEN}`
        } 
    }


    
module.exports = {
  getBusinesses: (req, res) => {
    let { location, category, radius } = req.body;
    if (!radius) { radius = 15000; };
    console.log(`FULL URL:\n${baseUrl}?location=${location}&limit=${limit}&categories=${category}&radius=${radius}`);
    axios.get(`${baseUrl}?location=${location}&limit=${limit}&categories=${category}&radius=${radius}`, config)    
         .then(businesses => {
           console.log(businesses.data.businesses.length);
           res.status(200).send(businesses.data.businesses)
        })
         .catch(err => res.status(500).send(err));
  },

  getAllDates: (req, res) => {
    const db = req.app.get('db')
    db.get_all_dates().then((resp) => {
      res.status(200).send(resp)
    })
  },

  getDate: (req, res) => {
    const db = req.app.get('db')
    db.get_one_date(req.params.id).then( (resp) => {
      res.status(200).send(resp)
    }).catch(err => res.status(500).send(err));
  },

  addDate: (req, res) => {
    const db = req.app.get('db')
    let {date_id, title, first_buisness, second_buisness, third_buisness } = req.body
    db.add_date([date_id, title, first_buisness, second_buisness, third_buisness]).then( () => {
      res.status(200).send("successfully added date")
    }).catch(err => res.status(500).send(err));
  },

  modifyDate: (req,res) => {
    const db = req.app.get('db')
    let {first_buisness, second_buisness, third_buisness } = req.body
    db.modify_date([req.params.id, first_buisness, second_buisness, third_buisness ]).then(() => {
      res.status(200).send("succesfully modified date")
    }).catch(err => res.status(500).send(err));
  }
}
