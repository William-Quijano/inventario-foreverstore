<template>
  <v-container fluid>
    <search-component style="position: fixed; z-index: 2" :search-cliente="true"></search-component>
    <v-row class="flex-column " :style="marginTop" >
      <p class="purple--text text-h3 text-center">Clientes</p>
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

    <v-dialog
        v-model="dialog"
        width="500"
    >
      <v-card>
        <v-card-title class="text-h5 greenWsp">
          Mensaje whatsapp
        </v-card-title>

        <v-card-text class="mt-5">
          <v-textarea rows="4" no-resize outlined class="inputStyle" v-model="messageWsp"></v-textarea>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="purple"
              text
              @click="sendMessage()"
          >
            Ir a whatsapp
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <btn-plus></btn-plus>
  </v-container>
</template>
<script>
import BtnPlus from "@/views/Productos/components/BtnPlus.vue";
import SearchComponent from "@/views/Productos/components/SearchComponent.vue";

export default {
  name: 'ClientesController',
  components: {SearchComponent, BtnPlus},
  data() {
    return {
      dialog: false,
      telefono: null,
      messageWsp: null,
      headers: [
        {
          text: 'Nombre',
          value: 'nombre',
          aling: 'center'
        },
        {
          text: 'Telefono',
          value: 'telefono',
          aling: 'center'
        },
        {
          text: 'Acciones',
          value: 'action',
          aling: 'center'
        }
      ],
      desserts: [
        {
          nombre: 'William Quijano',
          telefono: '70851923',
        }
      ]
    }
  },
  computed: {
    marginTop() {
      let marginTop = {}
      if (this.$vuetify.breakpoint.mdAndUp) {
        marginTop.marginTop = '150px'
      } else{
        marginTop.marginTop = '250px'
      }
      // else {
      //     marginTop.marginTop = '50px'
      //
      //   }
      return marginTop
    }
  },
  methods: {
    openDialogText(item) {
      this.dialog = true
      this.telefono = item.telefono
    },
    sendMessage() {
      window.location.href = `https://api.whatsapp.com/send?phone=+503${this.telefono}&text=${this.messageWsp ?? 'Mensaje provicional'}`
    }
  }
}
</script>
