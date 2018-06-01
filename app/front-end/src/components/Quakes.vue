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
    vm = this
    mapboxgl.accessToken =
      'pk.eyJ1Ijoic29ub2pvcmVsIiwiYSI6ImNqaDl1Z25udzAybGMzNnBmbzl4NDBsam0ifQ.itgTNw7IhsoPTwkxiPz7Vw';
    map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/sonojorel/cjhw8422i15g72snx2zsof3s1',
      center: [-79.995888, 40.440624],
      zoom: 2
    })

    map.on('load', function() {
      vm.loadQuakes()
    })

    //** show current map center lat lng on page **//
    map.on('moveend', function(e) {
      vm.latitude = map.getCenter().lat
      vm.longitude = map.getCenter().lng
    })

  },
  methods: {
    filterItems(type, data, cb){
      var output
      switch(type) {
          case 'yellow':
              output = data.filter(quake => quake.properties.mag < 4.8)
              cb(output)
              break
          case 'orange':
              output = data.filter(quake => (quake.properties.mag > 4.8 && quake.properties.mag <5.2))
              cb(output)
              break
          case 'red':
              output = data.filter(quake => quake.properties.mag >= 5.2)
              cb(output)
              break
          default:
              break
      }

    },
    addLayer(type, data){
      var icon = 'epi-' + type
      var size

      switch(type){
        case 'yellow':
          size = .3
          break
        case 'orange':
          size = .35
          break
        case 'red':
          size = .4
          break
        default:
          break
      }
      
      map.addLayer(
          {
            'id': type,
            'type': 'symbol',
            'source': {
              'type': 'geojson',
              'data': {
                  'type': 'FeatureCollection',
                  'features': data
              }
            },
            'layout': {
              'icon-image': icon,
              'icon-size': size,
              //'text-field': '{mag}',
              'icon-allow-overlap': true,
              'text-allow-overlap':true,
              // 'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
              //'text-size': 10,
              //'text-offset': [0, 0.6],
              //'text-anchor': 'top'
            },
            'paint':{
              // 'text-color':'#555',
              // 'text-halo-color':'rgba(255, 255, 255, .50)',
              // 'text-halo-width':1
            }
            })

      map.on('click', type, function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice()
        var detail = e.features[0].properties
        var header = '<h3>Magnitude: ' + detail.mag + '</h3><ul>'
        var eventTime = new Date(detail.time)
        var place = '<li><strong>Location:</strong>&nbsp;' + detail.place + '</li>'
        var dated = '<li><strong>Date/Time:</strong>&nbsp;' + eventTime + '</li>'
        var end = '<ul>'
        var html = header.concat(place, dated, end)

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
        }

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(html)
            .addTo(map)
    })

    },
    loadQuakes() {


      let payload
      const myRequest = new Request('http://104.43.128.138:8080/api/earthquakes')
      fetch(myRequest)
      .then((response) => { 
        return response.json() })
      .then((data) => {
        payload = data.payload

        vm.filterItems('red', payload, function(red){
          console.log(red.length)
          vm.addLayer('red', red)
        })
        vm.filterItems('orange', payload, function(orange){
          console.log(orange.length)
          vm.addLayer('orange', orange)
        })
        vm.filterItems('yellow', payload, function(yellow){
          console.log(yellow.length)
          vm.addLayer('yellow', yellow)
        })
      })
       
    }
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


