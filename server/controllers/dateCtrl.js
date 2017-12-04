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
  }
}
