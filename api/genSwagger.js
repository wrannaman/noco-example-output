
const fs = require('fs');
module.exports = (models) => {
const defs = {
  "openapi": "3.0.2",
  "info": {
    "title": "API",
    "version": "0.0.1"
  },
  components: {
    "schemas": models
  }
};
// does it exist?
let existing = null;
const exists = fs.existsSync('swagger.json');
if (exists) {
  existing = fs.readFileSync('swagger.json');
  existing = JSON.parse(existing);
  if (existing && existing.components && existing.components.schemas) {
    existing.components.schemas = models;
  } else {
    existing.components = {
      schemas: models
    };
  }
  if (!existing.openapi) existing.openapi = defs.openapi
  if (!existing.info) existing.info = defs.info
}

  if (!exists) fs.writeFileSync('swagger.json', JSON.stringify(defs, null, 2));
  else fs.writeFileSync('swagger.json', JSON.stringify(existing, null, 2));
}
