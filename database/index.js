const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cryptobal');
mongoose.Promise = require('bluebird');

let userAccSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  balances: [{
    coin: String,
    balance: Number
  }]
})

let UserAcc = mongoose.model('UserAcc', userAccSchema);


let findUser = (username, coin, balance, cb) => {
  UserAcc.find({
    username: username
  }, (err, entry) => {
    if (err) console.log('ERROR in checkForUser, error: ', err);
    else {
      if (entry.length === 0) {
        //new user
        saveBalance(username, coin, balance, cb);
      } else {
        //existing user
        checkForCoin(username, coin, balance, cb);
        console.log('user found, entry: ', entry);
      }
    }
  })
}

let saveBalance = (username, coin, balance, cb) => {
  UserAcc.create({
    username: username,
    balances: [{
      coin: coin,
      balance: balance
    }]
  }, (err, entry) => {
    if (err) console.log('ERROR in createNewUser, error: ', err)
    else {
      console.log('Successful write to the DB with entry: ', entry)
      cb();
    }
  })
}

let checkForCoin = (username, coin, balance, cb) => {
  UserAcc.find({
    username: username,
    "balances.coin": coin
  }, (err, entry) => {
    if (err) console.log('ERRON in checkForCoin, error: ', err)
    else {
      if (entry) {
        updateCoinBalance(username, coin, balance, cb);
      } else {
        addCoinBalance(username, coin, balance, cb);
      }
    }
  })
}

let updateCoinBalance = (username, coin, balance, cb) => {
  UserAcc.update({
    username: username,
    "balances.coin": coin
  }, {
    $set: {
      "balances.$.balance": balance
    }
  }, () => {
    cb()
  })
}

let addCoinBalance = (username, coin, balance, cb) => {
  UserAcc.update({
    username: username
  }, {
    $push: {
      balances: {
        coin: coin,
        balance: balance
      }
    }
  }, () => {
    cb()
  })
}

// ADD READ FROM DB
let getBalances = () => {
  // Read from DB and update 
}

module.exports.findUser = findUser;
module.exports.saveBalance = saveBalance;
module.exports.checkForCoin = checkForCoin;
module.exports.updateCoinBalance = updateCoinBalance;
module.exports.addCoinBalance = addCoinBalance;