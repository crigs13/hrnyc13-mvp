const express = require('express');
const bodyParser = require('body-parser');
let db = require('../database')
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.post('/', (req, res) => {
  console.log('this is the req.body: ', req.body)
  let userInfo = {
    username: 'chris',
    balances: [{
      coin: 'BTC',
      balance: 10
    }]
  }
  db.saveBalance(userInfo, () => {
    console.log('Successful write to db')
  })
})

app.get('/', (req,res) => {
  // handle get requests
})

let port = 9001;

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})