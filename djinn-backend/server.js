require("dotenv").config();
const PORT = 3001;

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan')
const hash = require('object-hash');
const bodyParser = require('body-parser');

const cors = require('cors');

const Request = require('./models/binDb.js');
const { pool } = require("./models/relationalDb.js");

const doc = new Request();
const app = express();


mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Connected to mongodb')
  })
  .catch((error) => {
    console.log(`Error connecting to MongoDB: ${error}`)
  });

app.use(cors());
app.use(express.static('build'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('tiny'))


app.post('/bin', (req, res) => {

  try {
    let newBinKey = makeHash();
    let endPoint = 'http://' + makeHash() + '.request-djinn.com';
    let sqlArr = parseReqNewBin(req, newBinKey, endPoint);
    console.log("I hit the route!")
    insertData(sqlArr);
    console.log("I got through to Postgres!")
    res.status(201).send({ status: 201, binKey: newBinKey, endPoint: endPoint });
  } catch (error) {
    res.status(400).send({ status: 400, error: 'malformed request'});
  }
});

app.all('/', async(req, res) =>  {
  try {
    const subdomain = 'http://' + req.headers.host;
    const binKey = await getBinKey(subdomain);
    const reqId = makeHash();
    insertRequest(req, binKey, reqId);

    res.status(200).send(JSON.stringify(reqId));

  } catch (error) {
    res.status(400).send({status: 400, error: 'malformed request'});
  }
});

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

app.listen(PORT, () => console.log('App is listening on port 3001'));

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
    console.log("subdomain", subdomain);
    const res = await pool.query("SELECT binKey FROM bins WHERE endPoint = $1", [subdomain]);
    console.log("res.rows", res.rows);
    return res.rows[0].binkey; // small k intentional
  } catch (error) {
    console.error(error);
  }
}

async function insertData(sqlArr) {
  try {
    console.log("IM HERE IN INSERTREQUEST", sqlArr)
    const [binKey, createdTime, endPoint, last, count] = sqlArr;
    const res = await pool.query(
       "INSERT INTO bins (binKey, createdTime, endPoint, last, count) VALUES ($1, $2, $3, $4, $5)", sqlArr
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
