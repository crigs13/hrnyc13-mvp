const express = require('express');
const bodyParser = require('body-parser');
let db = require('../database')
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.post('/update', (req, res) => {
  let username = req.body.username;
  let coin = req.body.balances[0].coin;
  let balance = req.body.balances[0].balance;

  db.findUser(username, coin, balance, () => {
    res.status(201).send();
  })
})

app.get('/', (req,res) => {
  // handle get requests
})

let port = 9001;

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})