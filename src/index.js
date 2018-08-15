import mapboxgl from 'mapbox-gl';
import './index.css';
import geojson from '../data/hist-urban-pop.json';

const cities = geojson.data.features;

mapboxgl.accessToken = 'pk.eyJ1IjoicnlhbmhhbWxleSIsImEiOiJjaWszbmluaG8wMDAzdTBrc2Q3Ymk3b3l1In0.BxdMyaYKg_0-LwANjPybNA';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v10',
    center: cities[0].geometry.coordinates,
    zoom: 9
});

map.on('load', () => {
  map.addLayer({
    'id': 'cities',
    'type': 'circle',
    'source': geojson,
    'paint': {
      'circle-radius': {
        'base': 1.75,
        'stops': [[0, 5], [10, 20], [22, 180]]
      },
      'circle-stroke-width': {
        'base': 1,
        'stops': [[0, 1], [10, 3], [22, 5]]
      },
      'circle-color': [
        'interpolate',
        ['linear'],
        ['get', 'population'],
        0, ['rgb', 255, 255, 117],
        50000, ['rgb', 252, 219, 88],
        100000, ['rgb', 246, 187, 63],
        500000, ['rgb', 240, 157, 41],
        1000000, ['rgb', 188, 98, 26],
        10000000, ['rgb', 139, 51, 15],
        25000000, ['rgb', 96, 7, 1]
      ]
    }
  })
});

console.log('cities', cities);
