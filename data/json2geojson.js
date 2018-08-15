const json = require('./output.json');
const fs = require('fs');

const convertToFeature = (obj) => {
  return {
    "type": "Feature",
    "id": +obj.Record,
    "geometry": {
      "type": "Point",
      "coordinates": [+obj.Longitude, +obj.Latitude]
    },
    "properties": {
      "cityid": obj.cityid,
      "certainty": +obj.Certainty,
      "year": +obj.year,
      "population": +obj.pop,
      "name": obj.City,
      "otherName": obj.OtherName,
      "country": obj.Country
    }
  }
};

const geojson = {
  "type": "geojson",
  "data": {
    "type": "FeatureCollection",
    "features": json.map(convertToFeature)
  }
};

fs.writeFileSync('./hist-urban-pop.json', JSON.stringify(geojson));
