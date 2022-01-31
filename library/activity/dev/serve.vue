<script>
import Vue from 'vue';
import Activity from '@/activity.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    Activity
  }
});
</script>

<template>
  <div id="app">
    <activity />
  </div>
</template>
