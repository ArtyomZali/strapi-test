<template>
  <div>
    <h1>Header</h1>
    <div v-for="item in menuItems" :key="`menu-item-${item.id}`">
      <div v-if="item.attributes.type === 'logo'">
        <img :src="item.attributes.image" alt="Logo" />
        {{ item.attributes.title }}
      </div>
      <div v-else-if="item.attributes.type === 'control'">
        <a
          v-if="item.attributes.link[0] !== '/'"
          :href="item.attributes.link"
          >{{ item.attributes.title }}</a
        >
        <router-link v-else :to="item.attributes.link">{{
          item.attributes.title
        }}</router-link>
      </div>
      <div v-else>
        <p>{{ item.attributes.title }}</p>
        <div
          v-for="column in item.attributes.dropdown_columns.data"
          :key="`menu-item-${item.id}-column-${column.id}`"
          :style="getDropdownColumnStyle(column)"
        >
        <h2>{{column.attributes.title}}</h2>
          <div
            v-for="dropdownItem in column.attributes.dropdown_items.data"
            :key="`menu-item-${item.id}-column-${column.id}-dropdown-item-${dropdownItem.id}`"
          >
            <a
              v-if="dropdownItem.attributes.link[0] !== '/'"
              :href="dropdownItem.attributes.link"
              >{{ dropdownItem.attributes.title }}</a
            >
            <router-link v-else :to="dropdownItem.attributes.link">{{
              dropdownItem.attributes.title
            }}</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menuItems: {
      type: Array,
      required: true,
    },
  },

  methods: {
    getDropdownColumnStyle(column) {
      console.log(column);
      return {
        //width: `${column.attributes.width * 100}%`,
      };
    },
  },
};
</script>

<style>
</style>