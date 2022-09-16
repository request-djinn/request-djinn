const Request = require('../models/binDb.js');
const { pool } = require("../models/relationalDb.js");
const hash = require('object-hash');

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
    const res = await pool.query("SELECT binKey FROM bins WHERE endPoint = $1", [subdomain]);
    return res.rows[0].binkey;
  } catch (error) {
    console.error(error);
  }
}

async function insertData(sqlArr) {
  try {
    const [binKey, createdTime, endPoint, last, count] = sqlArr;
    const res = await pool.query(
       "INSERT INTO bins (binKey, createdTime, endPoint, last, count) VALUES ($1, $2, $3, $4, $5)", sqlArr
    );
  } catch (error) {
    console.error(error);
  }
}

async function insertRequest(req, binKey, reqId) {

  const request = new Request ({
    requestId: reqId,
    binKey: binKey,
    headers: JSON.stringify(req.headers),
    body: JSON.stringify(req.body)
  });
  await request.save();
}

function getBin() {
  pool.query("SELECT * FROM bins WHERE binKey = $1", [binKey]);
}

module.exports = { makeHash, parseReqNewBin, getTimeStamp, getBinKey, insertData, insertRequest, getBin }