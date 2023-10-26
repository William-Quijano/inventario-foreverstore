<template>
  <v-container fluid class="pa-0">
    <search-component type-search="customer" :search-cliente="true" @searchCustomer="searchCustomer"></search-component>
    <app-loader-f-s v-if="loading"></app-loader-f-s>
    <v-row v-else class="flex-column mt-5 mx-5">
      <p class="purple--text text-h3 text-center">Clientes</p>
      <v-row>
        <v-col cols="12" class="d-flex justify-end">
          <v-btn small color="purple" class="white--text" @click="createCutomerDialog = true">Agregar cliente</v-btn>
        </v-col>
      </v-row>
      <v-data-table
          :headers="headers"
          :items="customers"
          class="elevation-0 mb-16"
          hide-default-footer
          no-data-text="No hay clientes para mostrar"
      >
        <template #[`item.action`]="{item}">
          <v-btn icon @click="openDialogText(item)">
            <v-icon color="#25D366">mdi-whatsapp</v-icon>
          </v-btn>
          <v-btn @click="deleteCustomer(item)" icon>
            <v-icon color="red">mdi-delete</v-icon>
          </v-btn>
        </template>
        <template #footer>
<!--          <v-row class="justify-center ma-10">-->
<!--            <v-col cols="12" class="d-flex justify-center align-center">-->
<!--              <v-btn icon color="purple" large @click="changePage(false)">-->
<!--                <v-icon large>mdi-chevron-left</v-icon>-->
<!--              </v-btn>-->
<!--              <v-btn icon color="purple" large @click="changePage(true)">-->
<!--                <v-icon large>mdi-chevron-right</v-icon>-->
<!--              </v-btn>-->
<!--            </v-col>-->
<!--          </v-row>-->
          <AppPagination
              :total-registros="pagination.totalRows"
              :page="pagination.page"
              :per-page="pagination.perPage"
              @input="changePage"
          ></AppPagination>
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

    <!--    <btn-plus ></btn-plus>-->

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
                    :error-messages="nameErrors"
                    @change="$v.customer.name.$touch()"
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
                    :error-messages="cellPhoneErrors"
                    @change="$v.customer.cellphone.$touch()"
                />
              </v-col>
            </v-row>
            <v-divider class="purple"></v-divider>

          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn
                text
                color="red"
                @click="closeDialogCreate"
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
import {maxLength, minLength, required} from "vuelidate/lib/validators";
import AppPagination from "@/components/AppPagination.vue";
import AppLoaderFS from "@/components/AppLoaderFS.vue";

export default {
  name: 'ClientesController',
  components: {AppLoaderFS, AppPagination, SearchComponent, BtnPlus},
  data() {
    return {
      dialog: false,
      createCutomerDialog: false,
      loading: true,
      TotalRows: 0,
      telefono: null,
      messageWsp: null,
      ultimoDoc: null,
      primerDoc: null,
      pagination: {
        page: 1,
        perPage: 5,
        totalRows: 0
      },
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
  validations: {
    customer: {
      name: {
        required
      },
      cellphone: {
        required,
        maxlength: maxLength(9),
        minLength: minLength(9)
      }
    }
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.customer.name.$dirty) return errors;
      !this.$v.customer.name.required && errors.push("Nombre requerido");
      return errors;
    },
    cellPhoneErrors() {
      const errors = [];
      if (!this.$v.customer.cellphone.$dirty) return errors;
      !this.$v.customer.cellphone.required && errors.push("Telefono requerido");
      !this.$v.customer.cellphone.minLength && errors.push("Telefono tiene que ser de 8 digitos");
      !this.$v.customer.cellphone.maxlength && errors.push("Telefono tiene que ser de 8 digitos");

      return errors;
    }
    // marginTop() {
    //   let marginTop = {}
    //   if (this.$vuetify.breakpoint.mdAndUp) {
    //     marginTop.marginTop = '150px'
    //   } else {
    //     marginTop.marginTop = '250px'
    //   }
    //   return marginTop
    // }
  },
  methods: {
    openDialogText(item) {
      this.dialog = true
      this.telefono = item.cellphone
    },
    cleanForm() {
      this.customer = {
        name: "",
        cellphone: ""
      }
      this.$v.$reset()
    },
    closeDialogCreate() {
      this.cleanForm()
      this.createCutomerDialog = false
    },
    sendMessage() {
      window.location.href = `https://api.whatsapp.com/send?phone=+503${this.telefono}&text=${this.messageWsp ?? 'Mensaje provicional'}`
    },
    async searchCustomer(filters) {
      try {
        if (filters.nameCustomer) {
          this.nameCustomer = filters.nameCustomer
          this.pagination.page = 1
          this.primerDoc = null
          this.ultimoDoc = null
          await this.getCustomers(false)
        } else {
          this.nameCustomer = filters.nameCustomer
          this.pagination.page = 1
          this.primerDoc = null
          this.ultimoDoc = null
          await this.countAlDocuments()
          await this.getCustomers(false)
        }

      } catch (e) {
        this.temporalAlert({
          show: true,
          message: "Algo salio mal",
          type: "error",
        })
      }
    },
    changePage(page) {
      if (page < this.pagination.page) {
        this.pagination.page = page
        this.getCustomers(true)
      } else {
        this.pagination.page = page
        this.getCustomers(false)
      }

    },
    async addCutomer() {
      try {
        this.$v.$touch()
        if (this.$v.$invalid) {
          this.temporalAlert({
            show: true,
            message: "Faltan campos requeridos",
            type: "warning",
          });
          return false
        }
        const data = {
          name: this.customer.name.toLowerCase(),
          cellphone: `${this.customer.cellphone.split('-')[0]}${this.customer.cellphone.split('-')[1]}`,
          timestamp: this.$timestamp.now().toDate().toISOString()
        }

        await this.$addDoc(this.$collection(this.$DB, "customers"), data);
        this.temporalAlert({
          show: true,
          message: "Cliente guardado",
          type: "success",
        })
        this.ultimoDoc = null
        this.primerDoc = null
        this.pagination.page = 1
        await this.getCustomers(false)
        this.createCutomerDialog = false
        this.cleanForm()
        this.countAlDocuments()
      } catch (e) {
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
        this.ultimoDoc = null
        this.primerDoc = null
        this.pagination.page = 1
        this.getCustomers(true)
      } catch (e) {
        this.temporalAlert({
          show: true,
          message: "Error al eliminar cliente",
          type: "error",
        })
      }


    },
    async getCustomers(back = false) {
      try {
        this.loading = true
        this.customers = []
        let query = this.$query(this.$collection(this.$DB, 'customers'))

        query = this.$query(query, this.$orderBy('name'), this.$orderBy('timestamp', 'desc'), this.$limit(5))
        if (this.ultimoDoc && back) {
          query = this.$query(query, this.$limitToLast(5), this.$endBefore(this.primerDoc))
        } else if (this.ultimoDoc) {
          query = this.$query(query, this.$startAfter(this.ultimoDoc))
        }

        if (this.nameCustomer) {
          query = this.$query(query, this.$where('name', '>=', this.nameCustomer.toLowerCase()), this.$where("name", "<=", this.nameCustomer.toLowerCase() + "\uf8ff"))
        }

        const response = await this.$getDocs(query)
        if (this.nameCustomer !== null) {
          this.pagination.totalRows = response.size
        }
        await response.forEach(async (doc) => {

          const data = {id: doc.id, ...doc.data()}
          this.customers.push(data)
        })
        this.primerDoc = response?.docs[0]
        this.ultimoDoc = response?.docs[response?.docs?.length - 1]
        setTimeout(()=>{
          this.loading = false
        },1500)
      } catch (e) {
        setTimeout(()=>{
          this.loading = false
        },1500)
        this.temporalAlert({
          show: true,
          message: "No se pudieron cargar los clientes",
          type: "error",
        })
      }
    },
    async countAlDocuments() {
      const countResponse = await this.$getCountFromServer(this.$collection(this.$DB, 'customers'))
      this.pagination.totalRows = countResponse.data().count
    }
  },
  async created() {
    await this.countAlDocuments()
    await this.getCustomers(false)
  }
}
</script>
