require("dotenv").config();
const PORT = 3001;
const db = require('./utils/dbUtils')
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
app.use(bodyParser.json());
app.use(morgan('tiny'))

app.all('/request', async(req, res) =>  {
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

app.post('/bin', (req, res) => {

  try {
    let newBinKey = db.makeHash();
    let endPoint = 'http://' + db.makeHash() + '.request-djinn.com/request';
    let sqlArr = db.parseReqNewBin(req, newBinKey, endPoint);
   const createdAt = sqlArr[1]; 
   db.insertData(sqlArr);
    res.status(201).send({ status: 201, binKey: newBinKey, endPoint: endPoint, createdAt });
  } catch (error) {
    res.status(400).send({ status: 400, error: 'malformed request'});
  }
});

app.get('/bin/:binKey/requests', async(req, res) => {
  const binKey = req.params.binKey;

  Request.find({binKey: binKey}, (error, data) => {
    if(error) {
      res.status(400).send({error: error})
    } else {
      res.status(200).send({status: 200, requests: data});
    }
  })
})

app.get('/bin/:binKey', async (req, res) => {
  const binKey = req.params.binKey;
  const data = await pool.query("SELECT * FROM bins WHERE binKey = $1", [binKey]);
  res.json(data);
})

app.listen(PORT, () => console.log('App is listening on port 3001'));