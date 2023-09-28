<template>
  <v-row class="justify-center">
    <v-card width="100%" class="card-filter" color="pink" elevation="0">
      <v-card-text>
        <v-row class="align-center mt-5">
          <v-col cols="12" md="5" v-if="searchProducto">
            <v-text-field
                v-model="name_product"
                label="Busqueda por producto"
                outlined
                rounded
                class="inputStyle"
                append-icon="mdi-magnify"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="5" v-if="searchCliente">
            <v-text-field label="Busqueda por cliente" outlined rounded class="inputStyle"
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
          <v-col cols="12" md="5" v-if="searchTipo">
            <v-autocomplete
                v-model="idTypeProduct"
                :items="tipoProducto"
                item-text="name"
                item-value="id"
                label="Tipo de prenda"
                outlined
                rounded
                class="inputStyle"
            ></v-autocomplete>
          </v-col >
          <v-col cols="12" md="2" class="pt-0 mb-4 d-flex justify-center" style="gap: 10px">
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
    typeSearch:{
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
      idTypeProduct: null,
      tipoProducto: [
        {
          id: 1,
          name: 'Blusa'
        }
      ]
    }
  },
  methods:{
    searchFilters(){
      if(this.typeSearch === 'product'){
        this.$emit('searchProduct', {
          nameProduct: this.name_product,
          typeProduct: this.idTypeProduct
        })
      }
    },
    cleanFilters(){
      if(this.typeSearch === 'product'){
        this.name_product = null;
        this.idTypeProduct = null
        this.$emit('searchProduct', {
          nameProduct: this.name_product,
          typeProduct: this.idTypeProduct
        })
      }
    }
  }
}
</script>
