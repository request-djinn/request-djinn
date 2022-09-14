const express = require('express');
const PORT = 3001;
const app = express();
const mongoose = require('mongoose');
// const mongoDb = require("Request");
const Request = require('./binDb.js');

const doc = new Request();
// console.log(Request, doc);
// CREATE BIN
// POST TO ‘/bin’

// GET BIN FUNCTION
// GET TO ‘/bin/:binId’

// GET REQUESTS FOR A GIVEN BINID
// GET TO ‘/bin/:binId/requests’

// store document
// print entire document out
// 
let testInsert = {
  contentId: 87,
  binKey: '6653ert',
  Host: 'aryan.request-djinn.com',
  fromIp: '44.388.596',
  requestMethod: 'HTTP',
  xRequestId: 'unknown'
}

doc.save(testInsert);
// console.log(Request.findOne());
/*

{contentId: 'ajsdjksbfn',
  binKey: '6653ert',
  Host: 'aryan.request-djinn.com',
  fromIp: '44.388.596',
  requestMethod: 'HTTP',
  xRequestId: 'unknown'
}


*/

app.post("/bin", (req, res) => {
  console.log(res);
  // json stringify the headers,
  // 
});

app.get("/bin/:binId", (req, res) => {
  console.log(res);
});

app.get("/bin/:binId/requests", (req, res) => {
  console.log(res);
});










// Given headers object, returns subdomain string

let testObj = {
  'connection': 'upgrade',
'host': 'jordansbin.request-djinn.com',
'upgrade-insecure-requests': '1',
'user-agent':
 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
'accept':
 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
'sec-gpc': '1',
'accept-language': 'en-US,en;q=0.8',
'accept-encoding': 'gzip, deflate' }

function getSubdomain(headersObj) {
  let splitHost = headersObj.host.split('.');
  return splitHost[0];
}

console.log(getSubdomain(testObj)) // 'jordansbin'





// initial tests


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

// app.listen(3001, () => console.log('App is listening on port 3001'));

