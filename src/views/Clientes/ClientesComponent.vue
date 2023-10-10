<template>
  <v-container fluid>
    <search-component type-search="customer" :search-cliente="true" @searchCustomer="searchCustomer"></search-component>
    <v-row class="flex-column " :style="marginTop">
      <p class="purple--text text-h3 text-center">Clientes</p>
      <v-data-table
          :headers="headers"
          :items="customers"
          class="elevation-1 mb-16"
          hide-default-footer

      >
        <template #[`item.action`]="{item}">
          <v-btn icon @click="openDialogText(item)">
            <v-icon color="#25D366">mdi-whatsapp</v-icon>
          </v-btn>
          <v-btn @click="deleteCustomer(item)" icon>
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

    <btn-plus @click="createCutomerDialog = true"></btn-plus>

    <v-dialog
        v-model="createCutomerDialog"
        transition="dialog-bottom-transition"
        fullscreen
    >
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar
              color="pink"
              class="purple--text"
          >
            Creación de un nuevo cliente
          </v-toolbar>
          <v-card-text class="mt-10">

            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                    v-model="customer.name"
                    label="Nombre del cliente"
                    outlined
                    rounded
                    class="inputStyle"
                    append-icon="mdi-magnify"
                    dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                    v-model="customer.cellphone"
                    outlined
                    rounded
                    dense
                    label="Numero de telefono"
                    type="text"
                    placeholder="####-#####"
                    class="inputStyle"
                    v-mask="'####-####'"
                />
              </v-col>
            </v-row>
            <v-divider class="purple"></v-divider>

          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn
                text
                color="red"
                @click="createCutomerDialog = false"
            >
              cancelar
            </v-btn>
            <v-btn
                text
                color="purple"
                @click="addCutomer"
            >
              Guardar
            </v-btn>

          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-container>
</template>
<script>
import BtnPlus from "@/components/BtnPlus.vue";
import SearchComponent from "@/components/SearchComponent.vue";

export default {
  name: 'ClientesController',
  components: {SearchComponent, BtnPlus},
  data() {
    return {
      dialog: false,
      createCutomerDialog: false,
      telefono: null,
      messageWsp: null,
      customer: {
        name: "",
        cellphone: ""
      },
      headers: [
        {
          text: 'Nombre',
          value: 'name',
          aling: 'center'
        },
        {
          text: 'Telefono',
          value: 'cellphone',
          aling: 'center'
        },
        {
          text: 'Acciones',
          value: 'action',
          aling: 'center'
        }
      ],
      nameCustomer: null,
      customers: []
    }
  },
  computed: {
    marginTop() {
      let marginTop = {}
      if (this.$vuetify.breakpoint.mdAndUp) {
        marginTop.marginTop = '150px'
      } else {
        marginTop.marginTop = '250px'
      }
      return marginTop
    }
  },
  methods: {
    openDialogText(item) {
      this.dialog = true
      this.telefono = item.cellphone
    },
    sendMessage() {
      window.location.href = `https://api.whatsapp.com/send?phone=+503${this.telefono}&text=${this.messageWsp ?? 'Mensaje provicional'}`
    },
    async searchCustomer(filters) {
      this.nameCustomer = filters.nameCustomer

      await this.getCustomers()
    },
    async addCutomer(){
    try {
      const data ={
        name: this.customer.name.toLowerCase(),
        cellphone: `${this.customer.cellphone.split('-')[0]}${this.customer.cellphone.split('-')[1]}`
      }

      await this.$addDoc(this.$collection(this.$DB, "customers"), data);
      this.temporalAlert({
        show: true,
        message: "Cliente guardado",
        type: "success",
      })
      await this.getCustomers()
      this.createCutomerDialog = false
    }catch (e) {
      this.temporalAlert({
        show: true,
        message: "error al guardar cliente",
        type: "error",
      })
    }
    },
    async deleteCustomer(item) {
      try {
        const docRef = this.$doc(this.$DB, 'customers', item.id)
        await this.$deleteDoc(docRef)
        this.temporalAlert({
          show: true,
          message: "Cliente eliminado con exito",
          type: "success",
        })
        this.getCustomers()
      } catch (e) {
        this.temporalAlert({
          show: true,
          message: "Error al eliminar cliente",
          type: "error",
        })
      }


    },
    async getCustomers() {
      try {
        this.customers = []
        let query = this.$query(this.$collection(this.$DB, 'customers'))

        if (this.nameCustomer) {
          query = this.$query(query, this.$where('name', '>=', this.nameCustomer.toLowerCase()), this.$where("name", "<=", this.nameCustomer.toLowerCase() + "\uf8ff"))
        }

        const response = await this.$getDocs(query)
        await response.forEach(async (doc) => {
          const data = {id: doc.id, ...doc.data()}

          this.customers.push(data)
        })
      } catch (e) {
        this.temporalAlert({
          show: true,
          message: "No se pudieron cargar los clientes",
          type: "error",
        })
      }
    }
  },
  async created() {
    await this.getCustomers()
  }
}
</script>
