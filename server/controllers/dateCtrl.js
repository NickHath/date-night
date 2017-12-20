require('dotenv').config();
const axios = require('axios')

// Yelp API setup
const baseUrl = 'https://api.yelp.com/v3/businesses/'
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
    console.log(req.body)
    let { location, category, radius } = req.body;
    if (!radius) { radius = 15000; }
    if(!location){location = "provo"}
    
    let send1, send2, send3 = false;
    let arr = []

    // filterRatings = (array) =>{
    //  var newArray = array.filter( (business) => business.rating >= 3 || category == 'park'
    //   )
    //  arr = newArray
    // }


    console.log(`FULL URL:\n${baseUrl}search?location=${location}&limit=${limit}&categories=${category}&radius=${radius}`);
    axios.get(`${baseUrl}search?location=${location}&limit=${limit}&categories=${category}&radius=${radius}`, config)    
         .then(businesses => {
           
           for (let i = 0; i < businesses.data.businesses.length; i++) {
             arr.push(businesses.data.businesses[i])
             
           }
           send1 = true;

           if(send1 && send2 && send3){
           // filterRatings(arr)
            res.status(200).send(arr)
          }
        })
         .catch(err => res.status(500).send("Invalid API request"));
    
         axios.get(`${baseUrl}search?location=${location}&limit=${limit}&categories=${category}&radius=${radius}&offset=${50}`, config)    
         .then(businesses => {
           if(businesses.data.businesses.length !== 0){
           for (let i = 0; i < businesses.data.businesses.length; i++) {
            
            arr.push(businesses.data.businesses[i])
             
           }
          }
           send2 = true;

           if(send1 && send2 && send3){
            //filterRatings(arr) 
            res.status(200).send(arr)
          }
        })
         .catch(err => res.status(500).send("Invalid API request"));
    
         axios.get(`${baseUrl}search?location=${location}&limit=${limit}&categories=${category}&radius=${radius}&offset=${100}`, config)    
         .then(businesses => {
           if(businesses.data.businesses.length !== 0){
           for (let i = 0; i < businesses.data.businesses.length; i++) {
             arr.push(businesses.data.businesses[i])
             
           }
          }
           send3 = true;
           if(send1 && send2 && send3){
            //filterRatings(arr)
            res.status(200).send(arr)
          }
        }).catch(err => res.status(500).send("Invalid API request"));

             
       


    
  },


  getBusinessById: (req, res ) => {
    
    const db = req.app.get("db");
    db.get_one_date(req.body.id).then( (resp) => {
      
      let arr = [resp[0].first_business, resp[0].second_business, resp[0].third_business]
      let arr2 = ['','','']
      let count = 3;

      arr.map( (ID, I) => {
        if(ID){
        axios.get(`${baseUrl}${ID}`, config).then(resp => {
          arr2[I] = resp.data
          count--
          if(count === 0){
            res.status(200).send(arr2)
          }
        })
      }
      
      else{
        count--;
        if(count === 0){
          console.log(arr2)
          res.status(200).send(arr2)
        }
      }
    }) 
  })
},


  getAllDates: (req, res) => {
    const db = req.app.get('db')
    db.get_all_dates([req.params.location]).then((resp) => {
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
      }
      
    })
    let { title, first_business, second_business, third_business } = req.body;
    // destructure preferences from req.body
    let { location, radius, startDate, startTime, duration } = req.body;
    db.add_date([date_id, title, first_business, second_business, third_business, location, radius, startDate, startTime, duration]).then( () => {
      res.status(200).send(date_id)
    }).catch(err => res.status(500).send(err));
  },

  modifyDate: (req,res) => {
    const db = req.app.get('db')
    let {first_business, second_business, third_business } = req.body
    db.modify_date([req.params.id, first_business, second_business, third_business ]).then(() => {
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
    
  },

  hotAndNew: (req, res) => {
    const { lat, long } = req.params;
    console.log(`${baseUrl}search?latitude=${lat}&longitude=${long}&hot_and_new`);
    console.log(config);
    axios.get(`${baseUrl}search?latitude=${lat}&longitude=${long}&hot_and_new`, config)
         .then(businesses => res.status(200).send(businesses.data))
         .catch(err => res.status(500).send('What!'));
  }
}