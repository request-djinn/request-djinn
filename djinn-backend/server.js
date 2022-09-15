const express = require('express');
const PORT = 3001;
const app = express();
const mongoose = require('mongoose');
// const mongoDb = require("Request");
const Request = require('./binDb.js');
const hash = require('object-hash');
// const { Pool } = require('pg');
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
  let newBinKey = makeHash();
  let endPoint = 'http://' + makeHash() + '.request-djinn.com';
  let sqlArr = parseReqNewBin(req, newBinKey, endPoint);
  insertData(sqlArr);
  res.status(201).send({ status: 201, binKey: newBinKey, endPoint: endPoint });
;
  // res.status(404).send('Sorry, we cannot find that!')
});
// console.log(JSON.stringify(request.body, null, 2));


app.listen(3001, () => console.log('App is listening on port 3001'));

// Helper Functions

function getSubdomain(headersObj) {
  let splitHost = headersObj.host.split('.');
  return splitHost[0]; // guard clause in case this doesn't exist?
}

function makeHash() {
  return hash([Math.random(), Math.random()]);
}

function parseReqNewBin(request, binKey, endPoint) {
  const timestamp = getTimeStamp();
  return [binKey, timestamp, endPoint, timestamp, 0];
}

function getTimeStamp() {
  return new Date(Date.now()).toISOString();
}

async function insertData(sqlArr) {
  try {
    const [binkey, createdTime, endPoint, last, count] = sqlArr;
    const res = await pool.query(
       "INSERT INTO bins (binKey, createdTime, endPoint, last, count) VALUES ($1, $2, $3, $4, $5)", sqlArr
    );
    console.log(`Added a row`);
  } catch (error) {
    console.error(error)
  }
}

/*

{contentId: 'ajsdjksbfn',
  binKey: '6653ert',
  Host: 'aryan.request-djinn.com',
  fromIp: '44.388.596',
  requestMethod: 'HTTP',
  xRequestId: 'unknown'
}
*/