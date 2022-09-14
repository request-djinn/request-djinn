const express = require('express');
const PORT = 3001;
const app = express();
const mongoose = require('mongoose');
// const mongoDb = require("Request");
const Request = require('./binDb.js');

const doc = new Request();
console.log(Request, doc);

/*
connecting to mongo: mongoose.connect
Mongoose will not throw any errors by default if you use a model without connecting.
db = mongoose.connection (after this, test db connection and errors)



*/ 

// initial tests
let testInsert = {
  contentId: 87,
  binKey: '6653ert',
  Host: 'aryan.request-djinn.com',
  fromIp: '44.388.596',
  requestMethod: 'HTTP',
  xRequestId: 'unknown'
}

doc.insertOne(testInsert);
// console.log(Request.findOne());

app.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

app.use('/request-type', (req, res, next) => {
  console.log('Request type: ', req.method);
  next();
});

app.get('/', (req, res) => {
  res.send('Success!');
});

app.listen(3001, () => console.log('App is listening on port 3001'));

// CREATE BIN
// POST TO ‘/bin’

// GET BIN FUNCTION
// GET TO ‘/bin/:binId’

<<<<<<< Updated upstream
// Given headers object, returns subdomain string

function getSubdomain(headersObj) {
  let splitHost = headersObj.host.split('.');
  return splitHost[0]; // guard clause in case this doesn't exist?
}

<<<<<<< HEAD
console.log(getSubdomain(testObj)) // 'jordansbin'



=======
// GET REQUESTS FOR A GIVEN BINID
// GET TO ‘/bin/:binId/requests’
>>>>>>> Stashed changes

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
=======
// initial tests
>>>>>>> 980ad2416aecb52d02172d5a66bce6e48d7198f2

// app.post("/bin", (req, res) => {
//   console.log(res);
//   // json stringify the headers,
//   // 
// });

// app.get("/bin/:binId", (req, res) => {
//   console.log(res);
// });

// app.get("/bin/:binId/requests", (req, res) => {
//   console.log(res);
// });


// 