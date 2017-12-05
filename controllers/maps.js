const https = require('https');
const http = require('http');

const stanlib = "http://www.velostanlib.fr/service/carto"
/**
 * GET /maps
 * List all maps.
 */
const Maps = require('../models/maps.js');

exports.getMaps = (req, res) => {
  Maps.find((err, docs) => {
    res.render('maps', { maps: docs });
  });
};

exports.postActualise = (req, res) => {//actualise manuellement
  actualise();
  res.redirect('/maps');
}

exports.actualiseDB = (req, res) => {
  console.log("Actualisation base de donnee");
  actualise()

}

function actualise(){

  httprequest( stanlib);
}

function httprequest( url){
  http.get(url, (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(data); //TODO COnvert in db
  });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
}

function httpsrequest(url){
  https.get(url, (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(data); //TODO COnvert in db
  });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
}
