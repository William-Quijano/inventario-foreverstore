<template>
  <v-bottom-navigation
      v-model="value"
      color="purple"
      background-color="pink"
      style="position: fixed; z-index: 3"
  >
    <v-btn v-for="tab in tabs" :key="tab.id" :to="{name: tab.uri}">
      <span>{{ tab.title }}</span>
      <v-icon>{{ tab.icon }}</v-icon>
    </v-btn>


  </v-bottom-navigation>
</template>
<script>
export default {
  data() {
    return {
      value: null,
      tabs: [
        {id: 0, icon: 'mdi-tshirt-crew-outline', title: 'Productos', uri: 'productos'},
        {id: 1, icon: 'mdi-account-tie', title: 'Clientes', uri: 'clientes'},
        {id: 2, icon: 'mdi-cube-send', title: 'Entregas', uri: 'entregas'},
      ]
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.theme--light .v-bottom-navigation .v-btn:not(.v-btn--active) {
  color: white !important;
}
</style>
