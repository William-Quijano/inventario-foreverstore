<template>
  <v-card>



<!--    <v-tabs-->
<!--        v-model="tab"-->
<!--        background-color="deep-purple accent-4"-->
<!--        centered-->
<!--        dark-->
<!--        icons-and-text-->
<!--        class="position-menu"-->
<!--    >-->
<!--      <v-tabs-slider></v-tabs-slider>-->

<!--      <v-tab v-for="tab in tabs" :key="tab.id" class="order-last">-->
<!--        {{ tab.title }}-->
<!--        <v-icon>{{ tab.icon }}</v-icon>-->
<!--      </v-tab>-->
<!--      <v-tab-item v-for="tab in tabs" :key="tab.id">-->
<!--        <component :is="tab.component"/>-->
<!--      </v-tab-item>-->
<!--    </v-tabs>-->


  </v-card>
</template>
<script>
import ProductosComponent from './components/ProductosComponent.vue'
import ClientesComponents from './components/ClientesComponent.vue'
import EntregasComponent from './components/EntregasComponent.vue'

export default {
  components: {
    ProductosComponent,
    ClientesComponents,
    EntregasComponent
  },
  data() {
    return {
      tab: 0,
      tabs: [
        {id: 1, icon: 'mdi-tshirt-crew-outline', title: 'Productos', component: ProductosComponent},
        {id: 2, icon: 'mdi-account-tie', title: 'Clientes', component: ClientesComponents},
        {id: 3, icon: 'mdi-cube-send', title: 'Entregas', component: EntregasComponent},
      ]
    }
  }
}
</script>
<style lang="scss" scope>
.position-menu {
  position: fixed;
  bottom: 0;
}
</style>
