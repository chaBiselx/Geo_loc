
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
