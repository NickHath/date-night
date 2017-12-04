// required libraries
const axios = require('axios')
require('dotenv').config();

// Yelp API set-up
const baseUrl = 'https://api.yelp.com/v3/businesses/search'
const config = { headers: { 'Authorization': `Bearer ${process.env.YELP_ACCESS_TOKEN}` } };
const limit = 50;
// can use offset to return more than 50 results per search
let offset = null;

module.exports = {
  // given a main category and location, return 50 dates
  getBusinessesByCat: (req, res) => {
    const { location, category, radius } = req.body;
    if (!location || !category) { 
      res.status(500).send('Need a location AND a category'); 
    };
    axios.get(`${baseUrl}?
               location=${location}&
               categories=${category}&
               limit=${limit}&
               radius=${radius}`
               , config)    
          .then(businesses => {
            res.status(200).send(businesses.data.businesses)
          })
          .catch(err => res.status(500).send(err));
  }
}