<template>
  <v-row class="justify-center">
    <v-card class="card-filter" color="pink" elevation="5">
      <v-card-text style="border: 3px solid purple;">
        <v-row class="align-center mt-5">
          <v-col cols="12" sm="6" lg="5" v-if="searchProducto">
            <v-text-field
                v-model="name_product"
                label="Busqueda por producto"
                outlined
                rounded
                class="inputStyle"
                append-icon="mdi-magnify"
                dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="5" v-if="searchCliente">
            <v-text-field
                v-model="customerName"
                label="Busqueda por cliente"
                outlined
                rounded
                class="inputStyle"
                dense
                append-icon="mdi-magnify"></v-text-field>
          </v-col>
          <v-col cols="12" md="5" v-if="searchFecha">
            <v-menu
                ref="fecha"
                v-model="isOpenDate"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="fechaEntrega"
                    label="Date"
                    outlined rounded
                    class="inputStyle"
                    append-icon="mdi-calendar"
                    readonly
                    dense
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                  v-model="fechaEntrega"
                  no-title
                  @input="isOpenDate = false"
                  @change="$emit('date', fechaEntrega)"
                  locale="es-Es"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="6" lg="5" v-if="searchTipo">
            <v-autocomplete
                v-model="idTypeProduct"
                :items="itemsProductType"
                item-text="name"
                item-value="id"
                label="Tipo de prenda"
                outlined
                rounded
                class="inputStyle"
                dense
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" lg="2" class="pt-0 mb-4 d-flex justify-center" style="gap: 10px">
            <v-btn color="purple" class="white--text" @click="searchFilters">
              {{ `Buscar` }}
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
            <v-btn color="purple" class="white--text" @click="cleanFilters">
              {{ `Limpiar` }}
              <v-icon>mdi-filter-off</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-row>
</template>
<script>

export default {
  name: 'SearchComponent',
  props: {
    typeSearch: {
      type: String,
      default: () => 'product'
    },
    searchProducto: {
      type: Boolean,
      default: () => false
    },
    searchCliente: {
      type: Boolean,
      default: () => false
    },
    searchFecha: {
      type: Boolean,
      default: () => false
    },
    searchTipo: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      isOpenDate: false,
      fechaEntrega: null,
      name_product: null,
      customerName: null,
      idTypeProduct: null,
      itemsProductType: [],
    }
  },
  methods: {
    searchFilters() {
      if (this.typeSearch === 'product') {
        this.$emit('searchProduct', {
          nameProduct: this.name_product,
          typeProduct: this.idTypeProduct
        })
      } else if (this.typeSearch === 'customer') {
        this.$emit('searchCustomer', {
          nameCustomer: this.customerName
        })

      }
    },
    cleanFilters() {
      if (this.typeSearch === 'product') {
        this.name_product = "";
        this.idTypeProduct = ""
        this.$emit('searchProduct', {
          nameProduct: this.name_product,
          typeProduct: this.idTypeProduct
        })
      } else if (this.typeSearch === 'customer') {
        this.customerName = "";
        this.$emit('searchCustomer', {
          nameCustomer: this.customerName,
        })
      }
    },
    async getProductType() {
      try {
        const response = await this.$getDocs(this.$collection(this.$DB, 'product_types'))
        response.forEach((doc) => {
          const data = {id: doc.id, ...doc.data()}

          this.itemsProductType.push(data)
        })
      } catch (e) {
        console.log(e)
      }
    },
  },
  async created() {
    if (this.searchTipo) {
      await this.getProductType()
    }
  }
}
</script>
<style lang="scss" scoped>
.card-filter {
  width: 100%;
  z-index: 3;
  top: 0;
  position: fixed
}
</style>
