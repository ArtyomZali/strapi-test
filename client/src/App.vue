<template>
  <div id="app">
    <ui-app>
      <div v-if="routesLoaded !== 0 && routesLoaded === routes.length">
        <router-link
          v-for="route in routes"
          :to="route.attributes.path"
          :key="`link-${route.attributes.name}`"
          >{{ route.attributes.title }}</router-link
        >
        <router-view />
      </div>
      <p v-else>Loading</p>
    </ui-app>
  </div>
</template>
<script>
import axios from "axios";
import router from "./router";
export default {
  components: {
    'ui-app': ui.uiApp
  },
  data() {
    return {
      routes: [],
      routesLoaded: 0,
    };
  },

  async created() {
    window.process = process;
    this.routes = await axios
      .get("http://localhost:5000/routes")
      .then((resp) => resp.data);
      console.log(this.routes)
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