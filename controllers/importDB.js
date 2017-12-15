var exports = module.exports = {};

var xml2js = require('xml2js');
var poi = require('../models/Poi')

// some xml attributes should be treated as numbers, not strings
function numberify(value, name) {
	if (['number', 'lat', 'lng'].indexOf(name) >= 0 ) {
		return parseFloat(value);
	}
	return value;
}

// http://www.velostanlib.fr/service/carto/
exports.importStationsVelib = (velos) => {
  xml2js.parseString(velos, {explicitRoot: false, attrValueProcessors: [numberify]}, (err, result) => {
		console.log(velos)
		exports.stationsVelib = result.markers[0].marker.map(x => ({
			coords: {
				lng: x.$.lng,
				lat: x.$.lat
			},
			name: x.$.name,
			desc: x.$.fullAddress,
			type: "Station Velib"
		}));
		console.log(exports.stationsVelib)
		poi.insertMany(exports.stationsVelib, (err, rawResponse) => {
			if (err) console.error(err);
			// console.log(rawResponse);
		});
  });
};

// http://opendata.grandnancy.eu/fileadmin/fichiers/opendata/Bus_arrets/Arrets_Stan_2014-01_01.kml
exports.importArretsStan = (arrets) => {
  xml2js.parseString(arrets, {explicitRoot: false, attrValueProcessors: [numberify]}, (err, result) => {
    exports.arretsStan = result.Document[0].Folder[0].Placemark.map(x => {
      let coords = x.Point[0].coordinates[0].split(',');
      return {
				coords: {
					lng: parseFloat(coords[0]),
          lat: parseFloat(coords[1])
				},
        name: x.name[0],
        desc: x.description[0],
				type: "Arrêt Stan"
      };
    });
		poi.insertMany(exports.arretsStan, (err, rawResponse) => {
			if (err) console.error(err);
			// console.log(rawResponse);
		});
  });
};
