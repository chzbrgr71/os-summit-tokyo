<template>
    <div>
        <Row>
            <Col span="2"></Col>
            <Col span="14"><h3>Earthquakes over 30 days</h3></Col>
            <Col span="4">
                <Button type="primary" icon="location" @click="loadQuakes">Show Earthquakes</Button>
            </Col>
            <Col span="2"></Col>
        </Row>
        <br>
        <Row>
            <Col span="2"></Col>
            <Col span="16">
            <div id="map"></div>
            </Col>
            <Col span="2"></Col>
        </Row>
        <Row>
            <Col span="2"></Col>
            <Col span="10">
                <p id='latLng'>Lat: {{latitude}} Lng: {{longitude}}</p>
            </Col>
            <Col span="10"></Col>
            <Col span="2"></Col>
        </Row>
    </div>
</template>


<script>
import mapboxgl from "mapbox-gl";
import SampleQuakes from "../assets/data/4.5_month.geojson.json";

let map;
let vm;

export default {
  data() {
    return {
      latitude: 40.440624,
      longitude: -79.995888
    };
  },
  created() {},
  computed: {},
  mounted() {
    vm = this;
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic29ub2pvcmVsIiwiYSI6ImNqaDl1Z25udzAybGMzNnBmbzl4NDBsam0ifQ.itgTNw7IhsoPTwkxiPz7Vw";
    map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/sonojorel/cjhqx01wc6cqr2rmp9b5x70w4",
      center: [-79.995888, 40.440624],
      zoom: 14
    });

    map.on("load", function() {
      console.log("loaded");
    });

    //** show current map center lat lng on page **//
    map.on("moveend", function(e) {
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
        .then((response)  => { return response.json() })
        .then((data) =>{
            // console.log(data.payload)
            payload = data.payload
            map.addLayer(
                {
                    "id": "points",
                    "type": "symbol",
                    "source": {
                        "type": "geojson",
                        "data": {
                            "type": "FeatureCollection",
                            "features": data.payload
                        }
                    },
                    "layout": {
                        "icon-image": "info-15",
                        "text-field": "{title}",
                        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                        "text-offset": [0, 0.6],
                        "text-anchor": "top"
                    }
                })
         })
         .catch( error => { console.log(error) })
    },
    showFortress() {
      //console.log(this.map);
      map.loadImage("http://localhost:8080/static/super.png", function(
        error,
        image
      ) {
        if (error) throw error;
        map.addImage("super", image);
        map.addLayer({
          id: "points",
          type: "symbol",
          source: {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: [-82.8062, 27.9359]
                  }
                }
              ]
            }
          },
          layout: {
            "icon-image": "super",
            "icon-size": 2
          }
        })
      })
    }
  }
};
</script>

<style lang="scss">
@import url("https://api.tiles.mapbox.com/mapbox-gl-js/v0.45.0/mapbox-gl.css");

#map {
  width: 100%;
  height: 500px;
}
</style>

