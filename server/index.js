const express = require('express');
const bodyParser = require('body-parser');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.post('/', (req, res) => {
  // handle post requests
})

app.get('/', (req,res) => {
  // handle get requests
})

let port = 9001;

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})