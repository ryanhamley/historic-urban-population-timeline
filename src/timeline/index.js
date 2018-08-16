import './timeline.css';

// const playControl = document.getElementById('play-control');
// const range = document.getElementById('range');
// const time = document.getElementById('time');
// let playback = false;

export default class Timeline {
  constructor(map, layer) {
    this.map = map;
    this.layer = layer;
    this.control = document.getElementById('play-control');
    this.control.addEventListener('click', this.setPlay.bind(this));
    this.range = document.getElementById('range');
    this.range.addEventListener('input', () => {
      if (this.playback) this.clearPlayback();
      this.play(parseInt(this.range.value, 10));
    });
    this.time = document.getElementById('time');
    this.playback = false;
  }

  startTimeline() {
    this.filterByYear(-3700);
  }

  filterByYear(year) {
    const prevYear = year - 100;
    const filter = [
      "all",
      ["<=", "year", year],
      [">", "year", prevYear]
    ];

    this.map.setFilter(this.layer, filter);
  }

  clearPlayback() {
    window.clearInterval(this.playback);
    this.control.classList.remove('pause');
    this.control.classList.add('play');
    this.playback = false;
  };

  setPlay() {
    if (this.playback) return this.clearPlayback();
    console.log('this', this);
    this.control.classList.remove('play');
    this.control.classList.add('pause');
    this.playback = window.setInterval(() => {
      const value = parseInt(this.range.value, 10);
      this.play(value + 100);
    }, 2000);
  };

  play(v) {
    this.range.value = v;

    if (this.range.value < 0) {
      this.time.innerHTML = `${Math.abs(this.range.value)} BCE`;
    } else if (this.range.value > 0) {
      this.time.innerHTML = `${this.range.value} CE`;
    } else {
      this.time.innerHTML = this.range.value;
    }

    this.filterByYear(v);
    if (v === 2000) {
      this.clearPlayback();
    }
  };
}
//
// export const playRange = (map) => {
//   playControl.addEventListener('click', setPlay.call(this, map));
//   console.log('playControl', playControl);
//   styleByTime(-3700, map);
// };
//
// const styleByTime = (year, map) => {
//   const prevYear = year - 100;
//   const filter = [
//     "all",
//     ["<=", "year", year],
//     [">", "year", prevYear]
//   ];
//
//   map.setFilter('cities', filter);
// };
//
// range.addEventListener('input', () => {
//   if (playback) clearPlayback();
//   play(parseInt(range.value, 10));
// });
//
// const clearPlayback = () => {
//   window.clearInterval(playback);
//   playControl.classList.remove('pause');
//   playControl.classList.add('play');
//   playback = false;
// };
//
// export const setPlay = (map) => {
//   if (playback) return clearPlayback();
//   playControl.classList.remove('play');
//   playControl.classList.add('pause');
//   playback = window.setInterval(function() {
//     const value = parseInt(range.value, 10);
//     play(value + 100, map);
//   }, 2000);
// };
//
// const play = (v, map) => {
//   range.value = v;
//
//   if (range.value < 0) {
//     time.innerHTML = `${Math.abs(range.value)} BCE`;
//   } else if (range.value > 0) {
//     time.innerHTML = `${range.value} CE`;
//   } else {
//     time.innerHTML = range.value;
//   }
//
//   styleByTime(v, map);
//   if (v === 2000) {
//     clearPlayback();
//   }
// };
