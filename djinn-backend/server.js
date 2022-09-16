const PORT = 3001;
const BASE_URL = '.request-djinn.com'
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('./utils/dbUtils');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Connected to mongodb');
  })
  .catch((error) => {
    console.log(`Error connecting to MongoDB: ${error}`);
  });

app.use(cors());
app.use(express.static('build'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('tiny'));

app.all('/request', async (req, res) => {
  try {
    const subdomain = `http://${req.headers.host}/request`;
    const binKey = await db.getBinKey(subdomain);
    const reqId = db.makeHash();
    db.insertRequest(req, binKey, reqId);

    res.status(200).send(JSON.stringify(reqId));
  } catch (error) {
    res.status(400).send({ status: 400, error: 'malformed request' });
  }
});

app.post('/bin', (req, res) => {
  try {
    const newBinKey = db.makeHash();
    const endPoint = `http://${db.makeHash()}${BASE_URL}/request`;
    console.log(endPoint)
    const sqlArr = db.parseReqNewBin(req, newBinKey, endPoint);
    const createdAt = sqlArr[1];
    db.insertData(sqlArr);
    res.status(201).send({
      status: 201,
      binKey: newBinKey,
      endPoint,
      createdAt,
    });
  } catch (error) {
    res.status(400).send({
      status: 400,
      error: 'malformed request',
      message: error,
    });
  }
});

app.get('/bin/:binKey/requests', async (req, res) => {
  const binKey = req.params.binKey;
  try {
    const data = await db.getRequests(binKey);
    res.status(200).send({
      status: 200,
      requests: data,
    });
  } catch (error) {
    res.status(400).send({ error });
  }
});

app.get('/bin/:binKey', async (req, res) => {
  const binKey = req.params.binKey;
  const data = await db.getBin(binKey);
  res.json(data);
});

app.listen(PORT, () => console.log('App is listening on port 3001'));