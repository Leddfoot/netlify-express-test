const express = require('express')

const serverless = require('serverless-http')

const app = express()

const router = express.Router()

router.get('/', (req, res) => {
    res.json({
        'hello' : 'hi'
    })
})

router.get('/test', (req, res) => {
    res.json({
        'hello' : 'test'
    })
})

app.use('/.netlify/functions/api', router)


////////////////////////////////////////////
////////////////////////////////////////////
router.get('/homestore', (req, res) => {
    if (!req.query.id) {
        return res.send({
            error: 'You must provide an id in the query! IE: localhost:3000/vinmonopolet?id=blabla. (in the future Marty)'
        })
    }
    const searchTerm = req.query.id
  
    fetchHomeStore(searchTerm, (error, storeData) => {
      if (error) {
          return res.send({ error })
      }
  
        res.send({
            storeData: storeData,          
            storeID: req.query.id,//note this is the query field in the browser, whatever is typed after ?id=blabla inthe browser
            
        })
    })
  
  })
  router.get('/vinmonopolet', (req, res) => {
    if (!req.query.city) {
        return res.send({
            error: 'You must provide a city in the query! IE: localhost:3000/vinmonopolet?city=blabla. (in the future Marty)'
        })
    }
  
    const searchTerm = req.query.city
  
    fetchVinmonopolet(searchTerm, req.query.getallstores, (error, storeData) => {
      if (error) {
          return res.send({ error })
      }
  
        res.send({
            storeData: storeData,          
            cityFromBrowserQuery: req.query.city//note this is the query field in the browser, whatever is typed after ?address=blabla inthe browser
        })
    })
  
  })
////////////////////////////////////////////
////////////////////////////////////////////




module.exports.handler = serverless(app)