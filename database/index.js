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

// ADD WRITE TO DB
let saveBalance = (userInfo, cb) => {
  // REFACTOR LATER TO LOOKUP BY USERID
  UserAcc.create(userInfo, (err, entry) => {
    if (err) console.log('ERROR in createNewUser')
    else {
      console.log('Successful write to the DB with entry: ', entry)
      cb();
    }
  })
}

// ADD READ FROM DB
let getBalances = () => {
  // Read from DB and update 
}


module.exports.saveBalance = saveBalance;


// ADD EXPORTS
// module.exports.[this function to export]




/* EXAMPLE CODE FROM MONGOOSE.JS DOCS FOR UPDATING DOCUMENTS

Tank.findById(id, function (err, tank) {
  if (err) return handleError(err);

  tank.size = 'large';
  tank.save(function (err, updatedTank) {
    if (err) return handleError(err);
    res.send(updatedTank);
  });
});

*/