const express = require('express');
const PORT = 3001;
const app = express();
const mongoose = require('mongoose');
const Request = require('./binDb.js');
const hash = require('object-hash');
const { pool } = require("./relationalDb.js");
const bodyParser = require('body-parser');
const dotenv = require("dotenv").config();


const doc = new Request();
console.log(Request, doc);

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL);
// const db = mongoose.connection;
// db.on('error', (error) => console.error(error));
// db.once('open', () => console.log('Connected to MongoDB'));


// Request to create a bin
app.post('/bin', (req, res) => {
  // Request.deleteMany({});
  // clearMongo();
  // console.log(Request.find({}));
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

//NOTE 
// IN THE ALL BLOCK, RETURN MONGO.FIND() WHEN A WEBHOOK REQ HITS A BIN ID
// SEND THAT TO FRONT END LATER


// Handle all webhook requests

// TO ADD:
// WE GET BINKEY from postgres; PASS THAT INTO MONGO 
app.all('/', async(req, res) =>  {
  try {
    const subdomain = req.headers.host;
    let binKey = await getBinKey(subdomain);
    console.log("binKey", binKey);
    // let binKey = "7109d4462970d8b413b0ff1bdc9d362c85b1177b"
    // if (binKey === null || binKey == undefined) {
    //   res.status(400).send({status: 400, error: 'malformed request'});
    // }
    // COUNT SHOULD BE INCREMENTED IN POSTGRES SO THAT WE CAN SET LIMITS/CLEAR BINS
    const reqId = makeHash();
    insertRequest(req, binKey, reqId);
    res.status(200).send(JSON.stringify(reqId));
  } catch (error) {
    res.status(400).send({status: 400, error: 'malformed request'});
  }
    // store in mongo accordingly.
    // if binKey doesn't exist; return 400
    // if domain/url doesn't exist, return 400
});

// Get all requests by binId (beloging to a specific bin)
// pass in a bin ID
// We need to find all requests with a matching binId = request.binKey in mongo
// /bin/:binId/requests
// return json file //list all requests in a json object?

app.get('/bin/:binKey/requests', async(req, res) => {
  // const matchingRequests = await Model.find(binKey: binId);
  const binKey = await req.params.binKey;

  const matchingRequests = Request.find({binKey: binKey}, (error, data) => {
    if(error) {
      console.log(error) // delete
      res.status(400).send({error: error})
    } else {
      console.log(data); // delete
      res.status(200).send({status: 200, requests: data});
    }
  })
})
// CONFIRM THAT REQUEST.FIND IS ASYNC BY NATURE,.

// function binRequest
// console.log(JSON.stringify(request.body, null, 2));

app.listen(PORT, () => console.log('App is listening on port 3001'));

// Helper Functions
function makeHash() {
  return hash([Math.random(), Math.random()]);
}

function parseReqNewBin(request, binkey, endPoint) {
  const timestamp = getTimeStamp();
  return [binkey, timestamp, endPoint, timestamp, 0];
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
    console.log("IM HERE IN INSERTREQUEST")
    const [binkey, createdTime, endPoint, last, count] = sqlArr;
    const res = await pool.query(
       "INSERT INTO bins (binkey, createdTime, endPoint, last, count) VALUES ($1, $2, $3, $4, $5)", sqlArr
    );
    console.log(`Added a row`);
  } catch (error) {
    console.error(error)
  }
}

async function insertRequest(req, binKey, reqId) {

  const request = new Request ({
    requestId: reqId, // do we need stringify here? not sure
    binKey: binKey,
    headers: JSON.stringify(req.headers),
    body: JSON.stringify(req.body) // body-parser
  });
  console.log("here now")
  await request.save();
  console.log(await Request.find({}));
}


// function clearMongo() {
// /* Connect to the DB */
//   mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.4", function(){
//     /* Drop the DB */
//     mongoose.connection.db.dropDatabase();
//     console.log("Mongo Cleared")
// });
// }

// finding a  bin id for documents in mongo
// doc.find({ contentId: binId }); // binId found from app.all()


// const request = new Request ({
//   contentId: JSON.stringify(req.binkey), // do we need stringify here? not sure
//   headers: JSON.stringify(req.headers),
//   body: JSON.stringify(req.body) // body-parser
// });

// await request.save();

/*

{contentId: 'ajsdjksbfn',
  binKey: '6653ert',
  Host: 'aryan.request-djinn.com',
  fromIp: '44.388.596',
  requestMethod: 'HTTP',
  xRequestId: 'unknown'
}
*/