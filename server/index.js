const express = require('express');
const bodyParser = require('body-parser');
let db = require('../database')
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.post('/update', (req, res) => {
  /*
  PROCESS
  Receive post request
  Check for checkForUser
    if true, check for existing coin
    if false
      if true, update exising coin balance
  */
  db.findUser(req.body.username, () => {
    res.status(201).send();
  })

  // db.saveBalance(req.body, () => {
  //   res.status(201).send()
  // })

  // db.updateCoinBalance(req.body.username, req.body.coin, req.body.balance, '20', () => {
  //   res.status(201).send();
  // })
})

app.get('/', (req,res) => {
  // handle get requests
})

let port = 9001;

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})


  // let userInfo = {
  //   username: 'chris',
  //   balances: [{
  //     coin: 'BTC',
  //     balance: 10
  //   }]
  // }
  // db.saveBalance(req.body, () => {
  //   console.log('Successful write to db')
  // })