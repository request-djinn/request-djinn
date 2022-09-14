const express = require('express');
const PORT = 3000;
const app = express();
const mongoose = require('mongoose');

// CREATE BIN
// POST TO ‘/bin’

// GET BIN FUNCTION
// GET TO ‘/bin/:binId’

// GET REQUESTS FOR A GIVEN BINID
// GET TO ‘/bin/:binId/requests’

// store document
// print entire document out
// 

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

// app.listen(3000, () => console.log('App is listening on port 3000'));

