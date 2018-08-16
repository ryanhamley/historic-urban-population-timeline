import mapboxgl from 'mapbox-gl';
import geojson from '../data/hist-urban-pop.json';
import './index.css';
import Timeline from './timeline';

const cities = geojson.data.features;

mapboxgl.accessToken = 'pk.eyJ1IjoicnlhbmhhbWxleSIsImEiOiJjaWszbmluaG8wMDAzdTBrc2Q3Ymk3b3l1In0.BxdMyaYKg_0-LwANjPybNA';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v10',
    center: [0, 30],
    zoom: 2
});

const stops = [
  {color: [255, 255, 117], value: 0},
  {color: [252, 219, 88], value: 50000},
  {color: [246, 187, 63], value: 100000},
  {color: [240, 157, 41], value: 500000},
  {color: [188, 98, 26], value: 1000000},
  {color: [139, 51, 15], value: 10000000},
  {color: [96, 7, 1], value: 25000000}
];

const legend = document.getElementById('legend');
let circleColorInterpolation = ['interpolate', ['linear'], ['get', 'population']];

const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

stops.forEach(stop => {
  const div = document.createElement('div');
  const span = document.createElement('span');
  span.style.backgroundColor = `rgb(${stop.color.join(', ')})`;
  const text = document.createTextNode(numberWithCommas(stop.value));
  div.appendChild(span);
  div.appendChild(text);
  legend.appendChild(div);
  circleColorInterpolation.push(stop.value);
  circleColorInterpolation.push(['rgb'].concat(stop.color));
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
      'circle-color': circleColorInterpolation
    }
  });

  new Timeline(map, 'cities');
});

map.on('mouseenter', 'cities', (e) => {
  map.getCanvas().style.cursor = 'pointer';
  const props = e.features[0].properties;
  console.log('props', props);
});

console.log('cities', cities);
