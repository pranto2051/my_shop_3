const chairs = require('./Product/chair');
const tables = require('./Product/table');
const doors = require('./Product/door');
const windows = require('./Product/window');
const sofas = require('./Product/sofa');
const beds = require('./Product/bed');
const wardrobes = require('./Product/wardrobe');
const shelves = require('./Product/shelf');

module.exports = [
  ...chairs,
  ...tables,
  ...doors,
  ...windows,
  ...sofas,
  ...beds,
  ...wardrobes,
  ...shelves
];
