<template>
  <div id="app">
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
  </div>
</template>
<script>
import axios from "axios";
import router from "./router";
export default {
  data() {
    return {
      routes: [],
      routesLoaded: 0,
    };
  },

  async created() {
    this.routes = await axios
      .get("http://localhost:1337/api/routes")
      .then((resp) => resp.data.data);
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
