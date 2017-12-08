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
const crypto = require('crypto');

    
module.exports = {
  getBusinesses: (req, res) => {
    let { location, category, radius } = req.body;
    if (!radius) { radius = 15000; };
    let send1, send2, send3 = false;
    let arr = []
    console.log(`FULL URL:\n${baseUrl}?location=${location}&limit=${limit}&categories=${category}&radius=${radius}`);
    axios.get(`${baseUrl}?location=${location}&limit=${limit}&categories=${category}&radius=${radius}`, config)    
         .then(businesses => {
           console.log(businesses.data.businesses.length);
           
           for (let i = 0; i < businesses.data.businesses.length; i++) {
             arr.push(businesses.data.businesses[i])
             
           }
           send1 = true;

           if(send1 && send2 && send3){
            res.status(200).send(arr)
          }
        })
         .catch(err => res.status(500).send(err));
    
         axios.get(`${baseUrl}?location=${location}&limit=${limit}&categories=${category}&radius=${radius}&offset=${50}`, config)    
         .then(businesses => {
           if(businesses.data.businesses.length !== 0){
           for (let i = 0; i < businesses.data.businesses.length; i++) {
             arr.push(businesses.data.businesses[i])
             
           }
          }
           send2 = true;

           if(send1 && send2 && send3){
            res.status(200).send(arr)
          }
        })
         .catch(err => res.status(500).send(err));
    
         axios.get(`${baseUrl}?location=${location}&limit=${limit}&categories=${category}&radius=${radius}&offset=${100}`, config)    
         .then(businesses => {
           if(businesses.data.businesses.length !== 0){
           for (let i = 0; i < businesses.data.businesses.length; i++) {
             arr.push(businesses.data.businesses[i])
             
           }
          }
           send3 = true;
           if(send1 && send2 && send3){
            res.status(200).send(arr)
          }
        }).catch(err => res.status(500).send(err));

             
       


    
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
    
   
    function randomValueBase64 (len) {
      return crypto.randomBytes(Math.ceil(len * 3 / 4))
          .toString('base64')   // convert to base64 format
          .slice(0, len)        // return required number of characters
          .replace(/\+/g, '0')  // replace '+' with '0'
          .replace(/\//g, '0'); // replace '/' with '0'
  }
    let date_id = randomValueBase64(6)
    db.check_date_ID(date_id).then( (resp) => {
      
      if(resp[0]){
        date_id = randomValueBase64(6)
        res.status(200).send("same id used")
      }
      else{
        res.status(200).send(date_id)
      }
    })
    let { title, first_buisness, second_buisness, third_buisness } = req.body
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
  },

  test: (req, res) => {
    const db = req.app.get('db')
    
   
    function randomValueBase64 (len) {
      return crypto.randomBytes(Math.ceil(len * 3 / 4))
          .toString('base64')   // convert to base64 format
          .slice(0, len)        // return required number of characters
          .replace(/\+/g, '0')  // replace '+' with '0'
          .replace(/\//g, '0'); // replace '/' with '0'
  }
    let date_id = randomValueBase64(6)
    db.check_date_ID(date_id).then( (resp) => {
      
      if(resp[0]){
        date_id = randomValueBase64(6)
        res.status(200).send("same id used")
      }
      else{
        res.status(200).send(date_id)
      }
    })
    
  }
}