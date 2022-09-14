const express = require('express');
const PORT = 3001;
const app = express();
const mongoose = require('mongoose');
// const mongoDb = require("Request");
const Request = require('./binDb.js');
const hash = require('object-hash');

const doc = new Request();
console.log(Request, doc);


// connecting to mongo: mongoose.connect
// Mongoose will not throw any errors by default if you use a model without connecting.
// db = mongoose.connection (after this, test db connection and errors)

// console.log(hash([1, 2, 2.718, 3.14159]));
// console.log(hash([Math.random(), Math.random()]));
/*
// Request to create a bin
Receive post request to create bin
create unique bin id
create record on psql
mongo created automatically
if successful return binKey and {status: 201, binKey: binKey}
else return {status: 400, error: malformed request} 
*/

// app.use('/request-type', (req, res, next) => {
//   console.log('Request type: ', req.method);
//   next();
// });

app.post('/bin', (req, res) => {
  console.log('got here')
  let newBinKey = makeHash();
  // create psql record with binKey and subdomain

  res.status(201).send({ status: 201, binKey: newBinKey });

  // res.status(404).send('Sorry, we cannot find that!')
});

// initial tests
let testInsert = {
  contentId: 87,
  binKey: '6653ert',
  Host: 'aryan.request-djinn.com',
  fromIp: '44.388.596',
  requestMethod: 'HTTP',
  xRequestId: 'unknown'
}

// doc.insertOne(testInsert);
// console.log(Request.findOne());

// app.use((req, res, next) => {
//   console.log('Time: ', Date.now());
//   next();
// });

// app.use('/request-type', (req, res, next) => {
//   console.log('Request type: ', req.method);
//   next();
// });

// app.get('/', (req, res) => {
//   res.send('Success!');
// });

app.listen(3001, () => console.log('App is listening on port 3001'));

// CREATE BIN
// POST TO ‘/bin’

// GET BIN FUNCTION
// GET TO ‘/bin/:binId’

// <<<<<<< Updated upstream
// Given headers object, returns subdomain string




// Helper Functions

function getSubdomain(headersObj) {
  let splitHost = headersObj.host.split('.');
  return splitHost[0]; // guard clause in case this doesn't exist?
}

function makeHash() {
  return hash([Math.random(), Math.random()]);
}

// console.log(getSubdomain(testObj)) // 'jordansbin'




// store document
// print entire document out
// 

/*
12:50 9/14
inserting a doc:
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var myobj = { name: "Company Inc", address: "Highway 37" };
  dbo.collection("customers").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});
*/

/*

{contentId: 'ajsdjksbfn',
  binKey: '6653ert',
  Host: 'aryan.request-djinn.com',
  fromIp: '44.388.596',
  requestMethod: 'HTTP',
  xRequestId: 'unknown'
}
*/