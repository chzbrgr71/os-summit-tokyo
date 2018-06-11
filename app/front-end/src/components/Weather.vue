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
    return {}
  },
  created() {},
  computed: {},
  mounted() {
    vm = this
    mapboxgl.accessToken =
      'pk.eyJ1Ijoic29ub2pvcmVsIiwiYSI6ImNqaDl1Z25udzAybGMzNnBmbzl4NDBsam0ifQ.itgTNw7IhsoPTwkxiPz7Vw';
    map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/sonojorel/cji44089r1o0g2rp6vi0ixjsy',
      center: [-79.995888, 40.440624],
      zoom: 2
    })

    map.on('load', function() {
      vm.loadWeather()
    })

    //** show current map center lat lng on page **//
    map.on('moveend', function(e) {
      vm.latitude = map.getCenter().lat
      vm.longitude = map.getCenter().lng
      // console.log (map.getCenter())
    })

  },
  methods: {
    addLayer(weatherType, obj){
      map.addLayer(
          {
            'id': weatherType,
            'type': 'symbol',
            'source': {
              'type': 'geojson',
              'data': {
                  'type': 'FeatureCollection',
                  'features': obj
              }
            },
            'layout': {
              'icon-image': 'weather-' + weatherType ,
              'icon-size': .3,
              'text-field': '{Temp}',
              'icon-allow-overlap': false,
              'text-allow-overlap':false,
              'text-font': ['Raleway Bold', 'Arial Unicode MS Bold'],
              'text-size': 16,
              'text-offset': [0, 1.2],
              'text-anchor': 'top'
            },
            'paint':{
              'text-color':'#FFF',
              'text-halo-color':'#3bbacc',
              'text-halo-width':.25
            }
            })

      map.on('click', weatherType, function (e) {

        var coordinates = e.features[0].geometry.coordinates.slice()
        var detail = e.features[0].properties
        var header = '<h2>' + detail.Temp + '</h2><ul>'
        var loc = '<li>Locale:&nbsp;<strong>' + detail.Locale + ' </strong></li>'
        var cond = '<li>Conditions:&nbsp;<strong>' + detail.Conditions + ' </strong></li>'
        var stamp = '<li>Timestamp:&nbsp;<strong>' + detail.DateTime + ' </strong></li>'
        var end = '<ul>'
        var html = header.concat(loc, cond, stamp, end)

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
        }

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(html)
            .addTo(map)
    })

    },
    loadWeather() {
        // potential weather statuses
        var layers = {
            clouds :[],
            mist : [],
            rain : [],
            snow : [],
            clear : [],
            haze : [],
            fog : []
        }

      let payload
      const myRequest = new Request('http://gateway.brianredmond.io/api/weather')
      fetch(myRequest)
      .then((response) => { 
        return response.json() })
      .then((data) => {
        payload = data.payload

        for (var i = 0; i < payload.length; i++) {
            var cTemp = Math.round(payload[i].main.temp - 273.15)
            var fTemp = Math.round((cTemp * (9/5)) + 32)
            var dt = new Date(payload[i].time * 1000)
            var feature = {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [payload[i].city.coord.lon, payload[i].city.coord.lat]
                },
                    "properties": {
                        "Locale": payload[i].city.name + ", " + payload[i].city.country,
                        "Temp": cTemp + " c / " + fTemp + " f",
                        "Conditions": payload[i].weather[0].description,
                        "DateTime": dt.toString()
                }
            }

            layers[payload[i].weather[0].main.toLowerCase()].push(feature)
            
            if (i === payload.length-1){
                Object.keys(layers).forEach(function(key) {
                    vm.addLayer(key,layers[key])
                })
            }
        }
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
  color:#1de9b6;
  border: 0;
  cursor: pointer;
  background-color: transparent;
}

.mapboxgl-popup-content{
    background-color: rgba(0, 0, 0, 0.9);
    border-radius: 5px;
    border: 1px solid rgba(115, 167, 160, 1);
    color: #FFF;
    font-size: 14px;
    padding: 18px;
    position: relative;
    width: 300px;
    -webkit-box-shadow: 0 4px 4px rgba(0, 0, 0, 0.3);
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.3);
    padding: 15px;
    pointer-events: auto;
}

.mapboxgl-popup-content li{
  padding:3px;
  list-style:none;
}

.mapboxgl-popup-content h2{
  padding-bottom:18px;
}

.mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip {
    -webkit-align-self: center;
    align-self: center;
    border-bottom: none;
    border-top-color: #777;
}

</style>


