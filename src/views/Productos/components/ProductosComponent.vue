<template>
  <v-container fluid class="pa-0">
    <search-component
        style="position: fixed; z-index: 2"
        :search-producto="true"
        :search-tipo="true"
        type-search="product"
        @searchProduct="searchProduct"
    ></search-component>
    <v-row class="mx-5" :style="marginTop" style="position: absolute">
      <v-col
          v-for="(item,i) in items"
          :key="item.id"
          cols="12"
          md="6"
          lg="4"
          :class="items.length === (i+1) ? 'order-last' : ''"
      >

        <v-card
            color="purple"
            dark

        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title
                  class="text-h5"
                  v-text="item.name"
              ></v-card-title>

              <v-card-subtitle v-text="item.description"></v-card-subtitle>

              <v-card-actions>
                <v-btn
                    class="ml-2 mt-5"
                    outlined
                    rounded
                    small
                >
                  START RADIO
                </v-btn>
              </v-card-actions>
            </div>

            <v-avatar
                class="ma-3"
                size="125"
                tile
            >
              <v-img :src="item['url_photo']" width="300px"></v-img>
            </v-avatar>
          </div>
        </v-card>

      </v-col>

    </v-row>

    <btn-plus></btn-plus>

  </v-container>
</template>
<script>
import BtnPlus from "@/views/Productos/components/BtnPlus.vue";
import SearchComponent from "@/views/Productos/components/SearchComponent.vue";

export default {
  name: 'ProductosController',
  components: {SearchComponent, BtnPlus},
  data() {
    return {
      items: [],
      nameProduct: "",
      productType: ""
    }
  },
  methods: {
    async getProducts() {
      const filters = {
        name_product: this.nameProduct,
        product_type: this.productType
      }
      const {data} = await this.services.product.getProducts(filters)
      this.items = data.data
    },
    async searchProduct(filters) {
      this.nameProduct = filters.nameProduct
      this.productType = filters.typeProduct

      await this.getProducts()
    },
  },
  computed: {
    marginTop() {
      let marginTop = {}
      if (this.$vuetify.breakpoint.mdAndUp) {
        marginTop.marginTop = '150px'
      } else {
        marginTop.marginTop = '350px'
      }
      // else {
      //     marginTop.marginTop = '50px'
      //
      //   }
      return marginTop
    }
  },
  async created() {
    await this.getProducts()
  }
}
</script>
<style lang="scss" scoped>
.scroll-style {
  overflow: scroll;
}

.order-last {
  margin-bottom: 65px;
}

.card-filter {
  z-index: 2;
  top: 0;
  position: fixed
}


</style>
