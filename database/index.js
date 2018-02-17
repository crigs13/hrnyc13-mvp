const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
let dbuser = process.env.dbuser;
let dbpassword = process.env.dbpassword;

if (process.env.NODE_ENV === 'production') {
  mongoose.connect(`mongodb://${dbuser}:${dbpassword}@ds239648.mlab.com:39648/mvpcryptoaccs`);
} else {
  mongoose.connect('mongodb://localhost/cryptobal');
}

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


let handleNewOrExistingUser = (username, coin, balance, cb) => {
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
      if (entry.length === 0) {
        addCoinBalance(username, coin, balance, cb);
      } else {
        updateCoinBalance(username, coin, balance, cb);
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

let updateChartsByUsername = (username, cb) => {
  UserAcc.find({
    username: username
  }, (err, data) => {
    if (err) console.log('ERROR in updateChartsByUsername, error: ', err);
    else {
      console.log('this is the format of the data: ', data[0]);
      cb(data);
    }
  })
}

module.exports.handleNewOrExistingUser = handleNewOrExistingUser;
module.exports.saveBalance = saveBalance;
module.exports.checkForCoin = checkForCoin;
module.exports.updateCoinBalance = updateCoinBalance;
module.exports.addCoinBalance = addCoinBalance;
module.exports.updateChartsByUsername = updateChartsByUsername;