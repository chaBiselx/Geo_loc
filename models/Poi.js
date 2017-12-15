const mongoose = require('mongoose');

const poiSchema = new mongoose.Schema({
  coords: {
    lng: Number,
    lat: Number
  },
  name: {
    type: String,
    validate: {
      validator: function(v, cb) {
        Poi.find({name: v}, function(err,docs){
          cb(docs.length == 0);
        });
      },
      message: 'Poi already exists!'
    }
  },
  desc: String,
  type: String,
}, { timestamps: true });

const Poi = mongoose.model('Poi', poiSchema);

module.exports = Poi;