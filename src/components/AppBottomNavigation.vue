<template>
  <v-bottom-navigation
      :value="value"
      color="purple"
      background-color="pink"
      style="position: fixed"
  >
    <v-btn v-for="tab in tabs" :key="tab.id" :to="{name: tab.uri}" >
      <span >{{ tab.title }}</span>

      <v-icon >{{ tab.icon }}</v-icon>
    </v-btn>


  </v-bottom-navigation>
</template>
<script>
export default {
  data() {
    return {
      value: 0,
      tabs: [
        {id: 1, icon: 'mdi-tshirt-crew-outline', title: 'Productos', uri: 'productos'},
        {id: 2, icon: 'mdi-account-tie', title: 'Clientes', uri: 'clientes'},
        {id: 3, icon: 'mdi-cube-send', title: 'Entregas', uri: 'entregas' },
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.theme--light .v-bottom-navigation .v-btn:not(.v-btn--active){
  color: white !important;
}
</style>
