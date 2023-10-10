<template>
  <v-container fluid>
    <search-component  :search-cliente="true" :search-producto="true"
                      :search-fecha="true"></search-component>

    <v-row class="flex-column" :style="marginTop">
      <p class="purple--text text-h3 text-center">Entregas</p>
      <v-data-table
          :headers="headers"
          :items="desserts"
          class="elevation-1"
          hide-default-footer
      >
        <template #[`item.action`]="{item}">
          <v-btn icon @click="openDialogText(item)">
            <v-icon color="#25D366">mdi-whatsapp</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon color="red">mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-row>
  </v-container>
</template>
<script>
import SearchComponent from "@/components/SearchComponent.vue";

export default {
  name: 'EntregasController',
  components: {SearchComponent},
  data() {
    return {
      headers: [
        {
          text: 'Nombre',
          value: 'nombre',
          aling: 'center'
        },
      ]
    }
  },
  computed: {
    marginTop() {
      let marginTop = {}
      if (this.$vuetify.breakpoint.mdAndUp) {
        marginTop.marginTop = '150px'
      } else{
        marginTop.marginTop = '430px'
      }
      // else {
      //     marginTop.marginTop = '50px'
      //
      //   }
      return marginTop
    }
  },
}
</script>
