<template>
  <ui-app id="app">
    <div v-if="routesLoaded !== 0 && routesLoaded === routes.length">
      <app-header :menuItems="menuItems"></app-header>
      <router-link
        v-for="route in routes"
        :to="route.attributes.path"
        :key="`link-${route.attributes.name}`"
        >{{ route.attributes.title }}</router-link
      >
      <router-view />
      <app-footer :footerItems="footerItems"></app-footer>
    </div>
    <p v-else>Loading</p>
  </ui-app>
</template>
<script>
import axios from "axios";
import router from "./router";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
export default {
  components: {
    "ui-app": ui.uiApp,
    "app-footer": Footer,
    "app-header": Header,
  },
  data() {
    return {
      routes: [],
      menuItems: [],
      footerItems: [],
      routesLoaded: 0,
    };
  },

  methods: {
    async fetchRoutes() {
      this.routes = await axios
        .get("http://localhost:5000/routes")
        .then((resp) => resp.data);
      this.routes.forEach(async (route) => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = route.attributes.component;
        document.head.appendChild(script);
        script.onload = async () => {
          await router.addRoute({
            path: route.attributes.path,
            component: window[route.attributes.name],
          });
          this.routesLoaded++;
        };
      });
    },

    async fetchMenuItems() {
      this.menuItems = await axios
        .get("http://localhost:5000/menu-items")
        .then((resp) => resp.data);
    },

    async fetchFooterItems() {
      this.footerItems = await axios
        .get("http://localhost:5000/footer-items")
        .then((resp) => resp.data);
    },
  },

  async created() {
    window.process = process;
    this.fetchRoutes();
    this.fetchMenuItems();
    this.fetchFooterItems();
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>