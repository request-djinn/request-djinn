require("dotenv").config();
const PORT = 3001;
const db = require('./utils/dbUtils')
const express = require('express');
const mongoose = require('mongoose');
<<<<<<< HEAD
const morgan = require('morgan');
const hash = require('object-hash');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const Request = require('./models/binDb.js');
const { pool } = require("./models/relationalDb.js");

const doc = new Request();
=======
const morgan = require('morgan')
const bodyParser = require('body-parser');
const cors = require('cors');
>>>>>>> f431e923171c6bd56e04b111b280012d6b7b67d8
const app = express();


mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Connected to mongodb')
  })
  .catch((error) => {
    console.log(`Error connecting to MongoDB: ${error}`)
  });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('tiny'))

<<<<<<< HEAD
app.use(express.static('build'));

app.post('/bin', (req, res) => {

  try {
    let newBinKey = makeHash();
    let endPoint = 'http://' + makeHash() + '.request-djinn.com';
    let sqlArr = parseReqNewBin(req, newBinKey, endPoint);
   const createdAt = sqlArr[1]; 
   console.log("I hit the route!")
    insertData(sqlArr);
    console.log("I got through to Postgres!")
    res.status(201).send({ status: 201, binKey: newBinKey, endPoint: endPoint, createdAt });
  } catch (error) {
    res.status(400).send({ status: 400, error: 'malformed request'});
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

app.get('/bin/:binKey', async (req, res) => {
  console.log("I'm getting your bin!")
  const binKey = req.params.binKey;
  const data = await pool.query("SELECT * FROM bins WHERE binKey = $1", [binKey]);
  console.log(data);
  res.json(data);
})

app.all('/', async(req, res) =>  {
=======
app.all('/request', async(req, res) =>  {
>>>>>>> f431e923171c6bd56e04b111b280012d6b7b67d8
  try {
    const subdomain = 'http://' + req.headers.host + '/request';
    const binKey = await db.getBinKey(subdomain);
    const reqId = db.makeHash();
    db.insertRequest(req, binKey, reqId);

    res.status(200).send(JSON.stringify(reqId));

  } catch (error) {
    res.status(400).send({status: 400, error: 'malformed request'});
  }
});

<<<<<<< HEAD
app.all('/*', (req, res) => {
  console.log("hit the catchall!")
  res.sendFile(path.join(__dirname, '/build/index.html'));
});

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
=======
app.post('/bin', (req, res) => {
>>>>>>> f431e923171c6bd56e04b111b280012d6b7b67d8

  try {
    let newBinKey = db.makeHash();
    let endPoint = 'http://' + db.makeHash() + '.request-djinn.com/request';
    let sqlArr = db.parseReqNewBin(req, newBinKey, endPoint);
    const createdAt = sqlArr[1]; 
    db.insertData(sqlArr);
    res.status(201).send({ status: 201, binKey: newBinKey, endPoint: endPoint, createdAt });
  } catch (error) {
    res.status(400).send({ status: 400, error: 'malformed request', message: error});
  }
});

app.get('/bin/:binKey/requests', async(req, res) => {
  const binKey = req.params.binKey;
  try {
    let data = await db.getRequests(binKey);
    res.status(200).send({status: 200, requests: data});
  } catch(error) {
    res.status(400).send({error: error})
  }
})

app.get('/bin/:binKey', async (req, res) => {
  const binKey = req.params.binKey;
  const data = await db.getBin(binKey);
  res.json(data);
})

app.listen(PORT, () => console.log('App is listening on port 3001'));