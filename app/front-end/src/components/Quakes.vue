<template>
  <v-container fluid fill-height="true">
    <v-slide-y-transition mode='out-in'>
      <v-layout column align-center>
          <div id='map'></div>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
/* eslint-disable */
import mapboxgl from 'mapbox-gl'

let map
let vm

export default {
  data () {
    return {
      latitude: 40.440624,
      longitude: -79.995888
    }
  },
  created() {},
  computed: {},
  mounted() {
    vm = this;
    mapboxgl.accessToken =
      'pk.eyJ1Ijoic29ub2pvcmVsIiwiYSI6ImNqaDl1Z25udzAybGMzNnBmbzl4NDBsam0ifQ.itgTNw7IhsoPTwkxiPz7Vw';
    map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/sonojorel/cjhqx01wc6cqr2rmp9b5x70w4',
      center: [-79.995888, 40.440624],
      zoom: 2
    })

    map.on('load', function() {
      vm.loadQuakes()
    })

    map.on('click', 'points', function (e) {
      //console.log(e.features[0].properties.mag);
        var coordinates = e.features[0].geometry.coordinates.slice();
        var detail = e.features[0].properties;
        var header = '<h3>Magnitude: ' + detail.mag + '</h3><ul>';
        var eventTime = new Date(detail.time);
        var place = '<li><strong>Location:</strong>&nbsp;' + detail.place + '</li>';
        var dated = '<li><strong>Date/Time:</strong>&nbsp;' + eventTime + '</li>'; 
        var end = '<ul>';
        var html = header.concat(place, dated, end);
        //  url
        // title
// <i class="fas fa-camera-retro"></i>

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(html)
            .addTo(map);
    });

    //** show current map center lat lng on page **//
    map.on('moveend', function(e) {
      vm.latitude = map.getCenter().lat
      vm.longitude = map.getCenter().lng
      // console.log(map.getCenter().lng)
      // console.log(map.getCenter().lat)
    })

    // map.on('mousemove', (e) => {
    //     console.log(e.lngLat)
    // })
  },
  methods: {
    loadQuakes() {
      let payload
      const myRequest = new Request('http://104.43.132.254:8080/api/earthquakes')
      fetch(myRequest)
      .then((response) => { return response.json() })
      .then((data) => {
        payload = data.payload
        map.addLayer(
          {
          'id': 'points',
          'type': 'symbol',
          'source': {
              'type': 'geojson',
              'data': {
                  'type': 'FeatureCollection',
                  'features': data.payload
              }
          },
          'layout': {
              'icon-image': 'circle-11',
              'text-field': '{mag}',
              'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
              'text-offset': [0, 0.6],
              'text-anchor': 'top'
          },'paint': {
              'icon-color':'#FFCC00',
          }
                })
         })
         .catch(error => { console.log(error) })
    }
    // showFortress() {
    //   //console.log(this.map);
    //   map.loadImage('http://localhost:8080/static/super.png', function(
    //     error,
    //     image
    //   ) {
    //     if (error) throw error;
    //     map.addImage('super', image);
    //     map.addLayer({
    //       id: 'points',
    //       type: 'symbol',
    //       source: {
    //         type: 'geojson',
    //         data: {
    //           type: 'FeatureCollection',
    //           features: [
    //             {
    //               type: 'Feature',
    //               geometry: {
    //                 type: 'Point',
    //                 coordinates: [-82.8062, 27.9359]
    //               }
    //             }
    //           ]
    //         }
    //       },
    //       layout: {
    //         'icon-image': 'super',
    //         'icon-size': 2
    //       }
    //     })
    //   })
    // }
  }
}
</script>

<style lang='scss'>
@import url('https://api.tiles.mapbox.com/mapbox-gl-js/v0.45.0/mapbox-gl.css');

#map {
  width: 100%;
  height: 100%;
}
.mapboxgl-popup-close-button{
  font-size: 20px;
  position: absolute;
  right: 5px;
  top: 1px;
  border: 0;
  cursor: pointer;
  background-color: transparent;
}
.mapboxgl-popup-content{
  color:#444;
  padding: 10px;
  position: relative;
  width: 250px;
  background: #fff;
  border-radius: 0px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.3);
  padding: 15px;
  pointer-events: auto;
}
.mapboxgl-popup-content li {
  list-style:none;
}
</style>


