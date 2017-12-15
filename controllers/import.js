var exports = module.exports = {};

var fs = require('fs');
var xml2js = require('xml2js');

// some xml attributes should be treated as numbers, not strings
function numberify(value, name) {
	if (['number', 'lat', 'lng'].indexOf(name) >= 0 ) {
		return parseFloat(value);
	}
	return value;
}

// http://www.velostanlib.fr/service/carto/
fs.readFile('velos.xml', function(err, data) {
    xml2js.parseString(data, {explicitRoot: false, attrValueProcessors: [numberify]}, function (err, result) {
        exports.stationsVelib = result.markers[0].marker.map(x => x.$);
    });
});

// http://opendata.grandnancy.eu/fileadmin/fichiers/opendata/Bus_arrets/Arrets_Stan_2014-01_01.kml
fs.readFile('Arrets_Stan_2014-01_01.kml', function(err, data) {
    xml2js.parseString(data, {explicitRoot: false, attrValueProcessors: [numberify]}, function (err, result) {
        exports.arretsStan = result.Document[0].Folder[0].Placemark.map(x => {
          let coords = x.Point[0].coordinates[0].split(',');
          return {
            lng: parseFloat(coords[0]),
            lat: parseFloat(coords[1]),
            name: x.name[0],
            desc: x.description[0]
          };
        });
    });
});



process.on('exit', function (){
  console.log(JSON.stringify(exports));
});
