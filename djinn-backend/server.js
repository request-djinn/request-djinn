const express = require('express');
const PORT = 3001;
const app = express();
const mongoose = require('mongoose');
// const mongoDb = require("Request");
const Request = require('./binDb.js');
const hash = require('object-hash');
const { pool } = require("./relationalDb.js");
const bodyParser = require('body-parser');


const doc = new Request();
console.log(Request, doc);

app.use(bodyParser.urlencoded({ extended: true }));


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
  let webhookURL = 'http://' + makeHash() + '.request-djinn.com'
  // console.log(webhookURL)
  let sqlArr = parseReqNewBin(req, newBinKey, webhookURL);
  console.log(sqlArr);
  // create psql record with binKey and subdomain
  res.status(201).send({ status: 201, binKey: newBinKey });
  
  // res.status(404).send('Sorry, we cannot find that!')
});
// console.log(JSON.stringify(request.body, null, 2));


// {binKey: binKey, createdTime: createdTime, }

// pool.connect((err, client, release) => {
//   if (err) {
//     return console.error('400', err.stack)
//   }//(binKey, createdTime, endPoint, supported, last, status)
//   client.query('INSERT into bins ()', (err, result) => {
//     release()
//     if (err) {
//       return console.error('Error executing query', err.stack)
//     }
//     console.log(result.rows)
//   })
// })

// GET TO ‘/bin/:binId/requests’	{status: 200, requests: array of json objects}	
// {status: 400, error: malformed request} 	array of json objs


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

//binKey (from makeHash),
// createdTime (e.g. 2022-09-12 23:14:16.244501)
// endPoint (e.g. asdf2345.request-djinn.com)
//supported (e.g. DNS, HTTP)
//last (e.g. 2022-09-13 23:01:28.505521),
//status
//Count (e.g. 8)
//Status (e.g. active)

/*
function to parse request and return array in format below
- [binKey, createdTime, endPoint(webhook url), last]
- http://iqwerudfgbqwirougrbvwe.request-djinn.com
*/

function parseReqNewBin(request, binKey, webhookURL) {
  // console.log(request.headers) // check for .body
  // console.log(request.headers.host)
  // console.log(request.body)
  // console.log(request)
  const timestamp = getTimeStamp();
  return [binKey, timestamp, webhookURL, timestamp, 0];
}

function getTimeStamp() {
  return new Date(Date.now()).toISOString();
}

async function insertData() {
  try {
    const res = await pool.query(
      //  const test = [name, color]
      "INSERT INTO bins (binKey) VALUES ('abc123')",
      // "INSERT INTO bins (name, color) VALUES ($1, $2)"
    );
    console.log(`Added a row`);
  } catch (error) {
    console.error(error)
  }
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