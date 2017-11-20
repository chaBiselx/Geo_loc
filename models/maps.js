const mongoose = require('mongoose');

const MapsSchema = new mongoose.Schema({
  name: String
});

const Maps = mongoose.model('Maps', MapsSchema);
module.exports = Maps;
