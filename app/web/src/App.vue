<style>
html,
body {
  width: 100%;
  height: 100%;
  display: flex;
}
.app-main {
  width: 100%;
  height: 100%;
  display: flex;
}
.layout {
  background: #f5f7f9;
  position: relative;
  width: 100%;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
.layout-footer-center {
  text-align: center;
}
</style>
<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <MenuItem name="home">
                            <Icon type="home"></Icon>
                            <router-link v-bind:to="'/'">Home</router-link>
                        </MenuItem>
                        <MenuItem name="about">
                            <Icon type="information-circled"></Icon>
                            <router-link v-bind:to="'About'">About</router-link>
                        </MenuItem>
                        <MenuItem name="map">
                            <Icon type="map"></Icon>
                            <router-link v-bind:to="'Map'">Map</router-link>
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Content :style="{padding: '0 50px'}">
                <Card>
                    <div style="min-height: 200px;">
                      <router-view name="main"></router-view>
                    </div>
                </Card>
            </Content>
            <router-view name="footer"></router-view>
        </Layout>
    </div>
</template>
<script>
export default {
  name: "app"
};
</script>

