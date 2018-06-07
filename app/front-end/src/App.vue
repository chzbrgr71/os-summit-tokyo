<template>
  <v-app id="oss-japan" dark>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
    >
      <v-list>
        <v-list-tile :to="{path: '/flights'}">
          <v-list-tile-action>
            <v-icon medium>flight</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Flights</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{path: '/fracking'}">
          <v-list-tile-action>
            <v-icon medium>play_for_work</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Fracking</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{path: '/quakes'}">
          <v-list-tile-action>
            <v-icon medium>leak_add</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Earthquakes</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{path: '/location'}">
          <v-list-tile-action>
            <v-icon medium>my_location</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Location</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{path: '/weather'}">
          <v-list-tile-action>
            <v-icon medium>ac_unit</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Weather</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="hidden-sm-and-down">Open Source Summit Japan</v-toolbar-title>
      <v-spacer></v-spacer>
        <v-avatar size="22" tile>
          <img
            src="static/images/msft_logo_sm.png"
            alt="Microsoft"
          >
        </v-avatar>&nbsp;&nbsp;&nbsp;
        <v-icon size="22" color="red">fas fa-heart</v-icon>
      <span class="hidden-sm-and-down">&nbsp;&nbsp;Open Source</span>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <router-view/>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span class="pl-3">&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Raleway:200,300,400,500');
@import url('https://use.fontawesome.com/releases/v5.0.13/css/all.css');
</style>

<script>
export default {
  data: () => ({
    drawer: true
  }),
  props: {
    source: String
  }
}
</script>