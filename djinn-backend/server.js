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

// Request to create a bin
app.post('/bin', (req, res) => {
  try {
    let newBinKey = makeHash();
    let endPoint = 'http://' + makeHash() + '.request-djinn.com';
    let sqlArr = parseReqNewBin(req, newBinKey, endPoint);
    insertData(sqlArr);
    res.status(201).send({ status: 201, binKey: newBinKey, endPoint: endPoint });
  } catch (error) {
    res.status(400).send({ status: 400, error: 'malformed request'});
  }
});

// Handle all webhook requests
app.all('/', (req, res) =>  {
  // console.log(req.method)
  const subdomain = req.headers.host;
  let binKey = getBinKey("http://11f77dc318b8e78a2c67f9eea7697f7345866165.request-djinn.com")
  // store in mongo accordingly.
  // if binKey doesn't exist; return 400
  // if domain/url doesn't exist, return 400
});

// function binRequest
// console.log(JSON.stringify(request.body, null, 2));

// Accepting a webhook req	HTTPMethod to *.request-djinn.com	{status: 200, timestamp: timestamp}	n/a
/*
app.get("///", (req, res) => {
  try {
    pool.connect(async (error, client, release) => {
      let confirmed = await client.query()
    })
  }
})
*/ 

app.listen(PORT, () => console.log('App is listening on port 3001'));

// Helper Functions

// function getSubdomain(headersObj) {
//   let splitHost = headersObj.host.split('.');
//   return splitHost[0]; // guard clause in case this doesn't exist?
// }



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

async function getBinKey(subdomain) {
  try {
    const res = await pool.query("SELECT binkey FROM bins WHERE endPoint = $1", [subdomain]);
    return res.rows[0].binkey;
  } catch (error) {
    console.error(error);
  }
}

async function insertData(sqlArr) {
  try {
    const [binkey, createdTime, endPoint, last, count] = sqlArr;
    const res = await pool.query(
       "INSERT INTO bins (binkey, createdTime, endPoint, last, count) VALUES ($1, $2, $3, $4, $5)", sqlArr
    );
    console.log(`Added a row`);
  } catch (error) {
    console.error(error)
  }
}

mongoose.connect(process.env.MONGODB_URL)
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to MongoDB'));
let url;
// finding a  bin id for documents in mongo
doc.find({ contentId: binId }); // binId found from app.all()

/*

{contentId: 'ajsdjksbfn',
  binKey: '6653ert',
  Host: 'aryan.request-djinn.com',
  fromIp: '44.388.596',
  requestMethod: 'HTTP',
  xRequestId: 'unknown'
}
*/