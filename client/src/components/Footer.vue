<template>
  <div>
    <h1>Footer</h1>
    <div v-for="item in footerItems" :key="`footer-item-${item.id}`">
      <a v-if="item.attributes.link[0] !== '/'" :href="item.attributes.link">{{
        item.attributes.title
      }}</a>
      <router-link v-else :to="item.attributes.link">{{
        item.attributes.title
      }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    footerItems: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style>
</style>