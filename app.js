var express = require('express');
const http = require('http');
var cors = require('cors');
var app = express();

const PORT = 80;

app.get('/witsproxy/*', cors(), function (req, res, next) {
    var data = '';

    http.get('http://wits.worldbank.org/API/V1/SDMX/V21/datasource/tradestats-trade' + req.url.replace('/witsproxy', ''), (resp) => {
      resp.on('data', (chunk) => {
        data += chunk;
      });
  
      resp.on('end', () => {
          res.send(data);
      });
  
    })
    .on("error", (err) => {
        res.status(500).send('API Error: ' + err.message);
    });
})

app.listen(PORT, function () {
  console.log(`CORS-enabled web server listening on port ${PORT}`);
})