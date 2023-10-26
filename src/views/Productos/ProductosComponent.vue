<template>
  <v-container fluid class="pa-0">
    <search-component

        :search-producto="true"
        :search-tipo="true"
        type-search="product"
        @searchProduct="searchProduct"
    ></search-component>

    <!--    :class="items.length === (i+1) && items.length !== 1  ? 'order-last' : ''"-->
    <app-loader-f-s v-if="loading"></app-loader-f-s>
    <v-row v-else class="mx-1 mx-sm-0 justify-center mt-5 " style="row-gap: 10px; column-gap:10px">
      <v-col
          v-for="(item,i) in items"
          :key="item.id"
          cols="12"
          md="4"
          style="border: 3px solid black; padding: 4px"
      >

        <v-card
            color="purple"
            dark
        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title
                  class="text-subtitle-1 text-md-h4"
                  v-text="item.name"
              ></v-card-title>

              <v-card-subtitle v-text="item.description"></v-card-subtitle>
              <v-card-actions class="pt-15">
                <v-btn
                    icon
                    @click="show[i][item.id] = !show[i][item.id]"
                >
                  <v-icon>{{ show[i][item.id] ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
              </v-card-actions>

            </div>


            <v-avatar
                class="ma-3"
                size="125"
                tile
            >
              <v-img :src="item['url_img']" width="300px" @click="openImg(item)" style="cursor: pointer"></v-img>
            </v-avatar>

          </div>

          <v-expand-transition>
            <div v-show="show[i][item.id]">
              <v-divider></v-divider>

              <v-card-text>
                <v-row>
                  <v-col cols="12">
                    <v-timeline
                        align-top
                        dense
                    >
                      <v-timeline-item
                          color="pink"
                          small
                      >
                        <v-row class="pt-1">
                          <!--                          <v-col cols="3">-->
                          <!--                            <strong>5pm</strong>-->
                          <!--                          </v-col>-->
                          <v-col>
                            <strong>Fecha de compra</strong>
                            <div class="text-caption">
                              {{ moment(item.date_purchase).format('DD/MM/YYYY') }}
                            </div>
                          </v-col>
                        </v-row>
                      </v-timeline-item>
                      <v-timeline-item
                          color="pink"
                          small
                      >
                        <v-row class="pt-1">
                          <!--                          <v-col cols="3">-->
                          <!--                            <strong>5pm</strong>-->
                          <!--                          </v-col>-->
                          <v-col>
                            <strong>Nombre del producto</strong>
                            <div class="text-caption">
                              {{ item.name }}
                            </div>
                          </v-col>
                        </v-row>
                      </v-timeline-item>
                      <v-timeline-item
                          color="pink"
                          small
                      >
                        <v-row class="pt-1">
                          <!--                          <v-col cols="3">-->
                          <!--                            <strong>5pm</strong>-->
                          <!--                          </v-col>-->
                          <v-col>
                            <strong>Cantidad</strong>
                            <div class="text-caption">
                              {{ item.stock }}
                            </div>
                          </v-col>
                        </v-row>
                      </v-timeline-item>
                      <v-timeline-item
                          color="pink"
                          small
                      >
                        <v-row class="pt-1">
                          <!--                          <v-col cols="3">-->
                          <!--                            <strong>5pm</strong>-->
                          <!--                          </v-col>-->
                          <v-col>
                            <strong>Precios de compra</strong>
                            <div class="text-caption">
                              {{ $currency.format(item.purchase_price) }}
                            </div>
                          </v-col>
                        </v-row>
                      </v-timeline-item>
                      <v-timeline-item
                          color="pink"
                          small
                      >
                        <v-row class="pt-1">
                          <!--                          <v-col cols="3">-->
                          <!--                            <strong>5pm</strong>-->
                          <!--                          </v-col>-->
                          <v-col>
                            <strong>Precios de venta</strong>
                            <div class="text-caption">
                              {{ $currency.format(item.sale_price) }}
                            </div>
                          </v-col>
                        </v-row>
                      </v-timeline-item>
                      <v-timeline-item
                          color="pink"
                          small
                      >
                        <v-row class="pt-1">
                          <!--                          <v-col cols="3">-->
                          <!--                            <strong>5pm</strong>-->
                          <!--                          </v-col>-->
                          <v-col>
                            <strong>Ganancias</strong>
                            <div class="text-caption">
                              {{ $currency.format(item.profit) }}
                            </div>
                          </v-col>
                        </v-row>
                      </v-timeline-item>
                      <v-timeline-item
                          color="pink"
                          small
                      >
                        <v-row class="pt-1">
                          <!--                          <v-col cols="3">-->
                          <!--                            <strong>5pm</strong>-->
                          <!--                          </v-col>-->
                          <v-col>
                            <strong>Tipo de prenda</strong>
                            <div class="text-caption">
                              {{ item.products_types_reference.name }}
                            </div>
                          </v-col>
                        </v-row>
                      </v-timeline-item>
                      <v-timeline-item
                          color="pink"
                          small
                      >
                        <v-row class="pt-1">
                          <!--                          <v-col cols="3">-->
                          <!--                            <strong>5pm</strong>-->
                          <!--                          </v-col>-->
                          <v-col>
                            <strong>Tallas disponibles</strong>
                            <div class="text-caption">
                              <v-chip
                                  v-for="(size, index) in item.sizes"
                                  :keys="index"
                                  class="ma-2"
                                  color="pink"
                                  text-color="white"
                              >
                                {{ `${size.size_name} - cantidad: ${size.stock}` }}
                                <v-icon right>
                                  mdi-hanger
                                </v-icon>
                              </v-chip>
                            </div>
                          </v-col>
                        </v-row>
                      </v-timeline-item>
                      <v-timeline-item
                          color="pink"
                          small
                      >
                        <v-row class="pt-1">
                          <!--                          <v-col cols="3">-->
                          <!--                            <strong>5pm</strong>-->
                          <!--                          </v-col>-->
                          <v-col>
                            <strong>Acciones</strong>
                            <div class="text-caption">
                              <v-btn color="red" @click="deleteProduct(item)" text>
                                Eliminar
                                <v-icon>mdi-delete</v-icon>
                              </v-btn>
                            </div>
                          </v-col>
                        </v-row>
                      </v-timeline-item>
                    </v-timeline>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>

                  </v-col>
                </v-row>
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>

      </v-col>
      <v-col cols="12" class="d-flex justify-center order-last">
        <v-btn v-if="items.length < TotalRows && !isSearch || TotalRows === 0 && !isSearch" color="purple"
               class="text-caption text-none white--text" small
               @click="pagination">ver mas
        </v-btn>
        <span class="text-center text-caption purple--text" v-else>No hay mas productos disponibles</span>
      </v-col>
      <!--      :class="items.length === (i+1) && items.length !== 1  ? 'order-last' : ''"-->
    </v-row>
    <!--    <v-card v-intersect="infiniteHandler"></v-card>-->
    <!--    <InfiniteLoading class="order-last"  @infinite="infiniteHandler"></InfiniteLoading>-->
    <btn-plus @click="createProductDialog = true"></btn-plus>

    <v-dialog
        v-model="createProductDialog"
        transition="dialog-bottom-transition"
        fullscreen
    >
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar
              color="pink"
              class="purple--text"
          >
            Creacion de un nuevo producto
          </v-toolbar>
          <v-card-text>
            <v-row class="mt-10">
              <v-col cols=" 12">
                <file-pond
                    v-model="files"
                    name="test"
                    ref="pond"
                    label-idle="Subir foto.."
                    v-bind:allow-multiple="false"
                    accepted-file-types="image/*"
                    data-max-file-size="2MB"
                    v-bind:files="files"
                    :allowRemove="true"
                    :allowBrowse="true"
                    :allowDrop="true"
                    :allowPaste="true"
                    :allowRevert="true"
                    :checkValidity="true"
                    max-files="1"
                    :server="serverUpload"
                    :error-messages="fileErrors"
                    @change="$v.files.$touch()"
                />
                <!--                @processfile="onProcessFile"-->
                <!--                @addfile="onAddFile"-->
              </v-col>

            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                    v-model="product.name"
                    label="Nombre del producto"
                    outlined
                    rounded
                    class="inputStyle"
                    append-icon="mdi-magnify"
                    dense
                    :error-messages="nameErrors"
                    @blur="$v.product.name.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-autocomplete
                    v-model="product.products_types_reference"
                    :items="itemsProductType"
                    item-text="name"
                    item-value="id"
                    label="Tipo de prenda"
                    outlined
                    rounded
                    class="inputStyle"
                    dense
                    :error-messages="productTypeErrors"
                    @change="getSizes(), $v.product.products_types_reference.$touch()"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="6">
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
                        v-model="product.date_purchase"
                        label="Fecha de compra"
                        outlined
                        rounded
                        class="inputStyle"
                        append-icon="mdi-calendar"
                        readonly
                        dense
                        v-bind="attrs"
                        v-on="on"
                        :error-messages="datePurchaseErrors"
                        @blur="$v.product.date_purchase.$touch()"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                      v-model="product.date_purchase"
                      no-title
                      @input="isOpenDate = false"
                      locale="es-Es"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" md="6">
                <v-currency-field
                    v-model="product.purchase_price"
                    outlined
                    rounded
                    dense
                    label="Precio de compra"
                    prefix="$"
                    type="number"
                    class="inputStyle"
                    :error-messages="purchasePriceErrors"
                    @blur="$v.product.purchase_price.$touch()"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-currency-field
                    v-model="product.sale_price"
                    outlined
                    rounded
                    dense
                    label="Precio de venta"
                    prefix="$"
                    type="number"
                    class="inputStyle"
                    :error-messages="salePriceErrors"
                    @blur="$v.product.sale_price.$touch()"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-currency-field
                    v-model="product.profit"
                    outlined
                    rounded
                    dense
                    label="Ganancia"
                    readonly
                    prefix="$"
                    type="number"
                    class="inputStyle"
                />
              </v-col>
              <!--              <v-col cols="12" md="6">-->
              <!--                <v-text-field-->
              <!--                    v-model="product.stock"-->
              <!--                    outlined-->
              <!--                    rounded-->
              <!--                    dense-->
              <!--                    label="Cantidad"-->
              <!--                    type="number"-->
              <!--                    placeholder="0"-->
              <!--                    readonly-->
              <!--                    class="inputStyle"-->
              <!--                />-->
              <!--              </v-col>-->
            </v-row>
            <v-divider class="purple"></v-divider>
            <v-row class="justify-center mt-5">
              <p class="purple--text text-h3">Tallas</p>
            </v-row>
            <v-row class="mt-5">
              <v-col cols="12" md="5">
                <v-autocomplete
                    v-model="sizes.size_reference"
                    :items="itemSizes"
                    item-text="size_name"
                    item-value="id"
                    label="Tallas"
                    outlined
                    rounded
                    class="inputStyle"
                    dense
                    return-object
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="5">
                <v-currency-field
                    v-bind="options"
                    v-model="sizes.size_stock"
                    outlined
                    rounded
                    dense
                    label="Cantidad por talla"
                    type="text"
                    placeholder="0"
                    class="inputStyle"
                    :error-messages="sizeStockErrors"
                    @blur="$v.sizes.size_stock.$touch()"
                />
              </v-col>
              <v-col cols="12" md="2" class="d-flex justify-center">
                <v-btn color="purple" icon @click="guardarTallas">
                  <span>Agregar</span>
                  <v-icon>mdi-package-variant-closed-plus</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-row class="justify-center">
              <v-col cols="12" md="6">
                <v-simple-table class="rounded-xxl" style="border: 2px solid #753979">
                  <template v-slot:default>
                    <thead>
                    <tr>
                      <th class="text-center purple--text">
                        Talla
                      </th>
                      <th class="text-center purple--text">
                        Cantidad
                      </th>
                      <th class="text-center purple--text">
                        Accion
                      </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr
                        v-for="(size, index) in sizesTable"
                        :key="size.id"
                    >
                      <td class="text-center">{{ size.name }}</td>
                      <td class="text-center">{{ size.stock }}</td>
                      <td class="text-center">
                        <v-btn color="purple" icon @click="eliminarSize(index)">
                          <v-icon>mdi-delete-empty</v-icon>
                        </v-btn>
                      </td>
                    </tr>
                    </tbody>
                  </template>
                </v-simple-table>

              </v-col>
            </v-row>
            <v-row v-if="$v.sizesTable.$dirty && $v.sizesTable.$invalid">
              <v-col cols="12">
                <v-alert
                    v-if="!$v.sizesTable.sizeEmpty"
                    dense
                    outlined
                    type="error"
                >
                  {{ `Se debe agregar un registro de talla o mas` }}
                </v-alert>
              </v-col>
            </v-row>
            <v-row class="justify-center">
              <v-col cols="12" class="d-flex justify-center align-center">
                <v-sheet
                    color="purple"
                    elevation="1"
                    width="100"
                    class="d-flex justify-center align-center"
                >

                  <p class="white--text text-h2 mb-0">{{ product.stock }}</p>

                </v-sheet>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn
                text
                color="red"
                @click="closeCrateDialog"
            >
              cancelar
            </v-btn>
            <v-btn
                text
                color="purple"
                @click="addProduct"
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
import {required, requiredIf} from "vuelidate/lib/validators";
import AppLoaderFS from "@/components/AppLoaderFS.vue";

const isEmptyFile = (val, vm) => {
  return val.length > 0 && val[0].file !== {}
}
const minCero = (val) => {
  return val > 0
}
// const minCeroSizes = (val, vm) => {
//   console.log(vm.size_reference)
//   return vm.size_reference !== null && val > 0
// }
const minPriceSale = (val, vm) => {
  return val > vm.purchase_price
}
const sizeEmpty = (val) => {
  return val.length > 0
}
export default {
  name: 'ProductosController',
  components: {AppLoaderFS, SearchComponent, BtnPlus},
  data() {
    return {
      items: [],
      files: [],
      show: [],
      itemsProductType: [],
      itemSizes: [],
      sizesTable: [],
      nameProduct: "",
      productType: "",
      createProductDialog: false,
      isOpenDate: false,
      imgModal: false,
      loading: true,
      isSearch: false,
      modalImgInf: {},
      options: {
        decimalLength: 0,
        autoDecimalMode: false,
        min: 0,
        max: null,
        defaultValue: 0,
        valueAsInteger: true,
        allowNegative: false,
      },
      limit: 5,
      TotalRows: 0,
      ultimoDoc: null,
      sizes: {
        size_reference: null,
        size_stock: null
      },
      product: {
        name: null,
        products_types_reference: null,
        date_purchase: null,
        purchase_price: 0,
        sale_price: 0,
        profit: 0,
        stock: 0,
        url_img: null
      },
      serverUpload: {
        revert: async (uniqueFileId, load, error) => {
          try {
            const imgRef = this.$ref(this.$storage, this.product.url_img)
            await this.$deleteObject(imgRef)
            load()
          } catch (e) {
            error()
          }
        },
        process: (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
          try {

            const fileRef = this.$ref(this.$storage, `photo_products/${this.v4()}.${file.type.split('/')[1]}`)

            const uploadTask = this.$uploadBytesResumable(fileRef, file)


            uploadTask.on('state_changed', (snapshot) => {
                  switch (snapshot.state) {
                    case 'paused':
                      error()
                      abort()
                      break;
                    case 'running':
                      progress(true, snapshot.bytesTransferred, snapshot.totalBytes)
                      load()
                      break;
                  }

                },
                (error) => {
                  switch (error.code) {
                    case 'storage/unauthorized':

                      break;
                    case 'storage/canceled':

                      break;

                    case 'storage/unknown':

                      break;
                  }
                },
                () => {
                  // Upload completed successfully, now we can get the download URL
                  this.$getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    this.product.url_img = downloadURL
                  });
                }
            )
          } catch (e) {
            error('Archivo no cargado')
            abort()
            console.log(e)
          }
        }
      }
    }
  },
  validations: {
    files: {
      isEmptyFile
    },
    sizesTable: {
      sizeEmpty
    },
    sizes: {
      size_stock: {
        minCeroSizes: function () {
          if (this.sizes.size_reference !== null) {
            return this.sizes.size_stock > 0
          } else {
            return true
          }
        },
        required: requiredIf(function () {
          return this.sizes.size_reference !== null
        }),
      }
    },
    product: {
      name: {
        required
      },
      products_types_reference: {
        required
      },
      date_purchase: {
        required
      },
      purchase_price: {
        minCero
      },
      sale_price: {
        minCero,
        minPriceSale
      }
    }
  },
  watch: {
    product: {
      handler(val) {
        if (val.purchase_price !== 0 && val.sale_price !== 0) {
          val.profit = val.sale_price < val.purchase_price ? '0' : val.sale_price - val.purchase_price
        }
      },
      deep: true
    }
  },
  methods: {
    guardarTallas() {
      try {
        this.$v.sizes.size_stock.$touch()
        if (this.$v.sizes.size_stock.$invalid) {
          this.temporalAlert({
            show: true,
            message: "Faltan campos requeridos",
            type: "warning",
          });
          return false
        }
        if (this.sizes.size_reference && this.sizes.size_stock) {
          const data = {
            id: this.v4(),
            reference: this.sizes.size_reference.id,
            name: this.sizes.size_reference.size_name,
            stock: this.sizes.size_stock
          }

          this.sizesTable.push(data)
          this.product.stock += Number(this.sizes.size_stock)
          this.sizes = {
            size_reference: null,
            size_stock: null
          }
        } else {
          this.temporalAlert({
            show: true,
            message: "La talla y la cantidad por talla es requeridos",
            type: "warning",
          });
        }
      } catch (e) {
        this.temporalAlert({
          show: true,
          message: "Faltan campos requeridos",
          type: "warning",
        });
      }
    },
    eliminarSize(index) {
      this.product.stock -= this.sizesTable[index].stock
      this.sizesTable.splice(index, 1)
    },
    openImg(item) {
      const preview = this.$imagePreview({
        initIndex: 0,
        images: [item.url_img],
        isEnableBlurBackground: false,
        isEnableLoopToggle: true,
        initViewMode: "contain",
        containScale: 1,
        shirnkAndEnlargeDeltaRatio: 0.2,
        wheelScrollDeltaRatio: 0.2,
        isEnableImagePageIndicator: true,
        maskBackgroundColor: "rgba(0,0,0,0.6)",
        zIndex: 4000,
        isEnableDownloadImage: true
      })
      // this.modalImgInf.name = item.name
      // this.modalImgInf.url = item.url_img
      // this.imgModal = true
    },
    cleanForm() {
      this.sizesTable = []
      this.sizes = {
        size_reference: null,
        size_stock: null
      }
      this.product = {
        name: null,
        products_types_reference: null,
        date_purchase: null,
        purchase_price: 0,
        sale_price: 0,
        profit: 0,
        stock: 0,
        url_img: null
      }
      this.$v.$reset()
    },
    async pagination() {
      if (this.items.length <= this.TotalRows)
        await this.getProducts()
    },
    async getProducts() {
      try {
        this.loading = true
        let query = this.$query(this.$collection(this.$DB, 'products'))

        query = this.$query(query, this.$orderBy('name'), this.$orderBy('timestamp', 'desc'), this.$limit(this.limit))


        if (this.nameProduct) {
          query = this.$query(query, this.$where('name', '>=', this.nameProduct.toLowerCase()), this.$where('name', '<=', this.nameProduct.toLowerCase() + '\uf8ff'))
        }

        if (this.productType) {
          const id_Reference = this.$doc(this.$DB, "product_types", this.productType)
          query = this.$query(query, this.$where('products_types_reference', '==', id_Reference))
        }

        if (this.ultimoDoc) {
          query = this.$query(query, this.$startAfter(this.ultimoDoc))
        }

        const response = await this.$getDocs(query)
        await response.forEach(async (doc, index) => {
          const data = {id: doc.id, ...doc.data()}
          if (data.products_types_reference) {
            let products_types_reference = await this.$getDoc(data.products_types_reference)
            if (products_types_reference.exists()) {
              data.products_types_reference = {id: products_types_reference.id, ...products_types_reference.data()}
            }
          }
          if (data.sizes.length > 0) {
            let sizesArray = []
            data.sizes.forEach(async (element) => {
              let size = await this.$getDoc(element.size_reference)
              if (size.exists()) {
                sizesArray.push({id: size.id, stock: element.stock, ...size.data()})

              }
            })
            data.sizes = sizesArray
          }

          if (!this.items.some((p) => p.id === doc.id)) {
            this.items.push(data)
            this.show = this.items.map((e) => ({[e.id]: false}))
          }
        });
        this.ultimoDoc = response?.docs[response?.docs?.length - 1]
        setTimeout(() => {
          this.loading = false
        }, 500)
      } catch (e) {
        console.log(e)
        this.loading = false
        this.temporalAlert({
          show: true,
          message: "No se pudieron cargar los productos",
          type: "error",
        })
      }
    },
    async closeCrateDialog() {
      try {
        if (this.product.url_img) {
          const imgRef = this.$ref(this.$storage, this.product.url_img)
          await this.$deleteObject(imgRef)
          this.files = []
        }

        this.createProductDialog = false
        this.cleanForm()
      } catch (e) {
        this.temporalAlert({
          show: true,
          message: "Problemas al cerrar esta ventana",
          type: "error",
        })
      }
    },
    async deleteImgByProduct() {
      try {
        const imgRef = this.$ref(this.$storage, this.product.url_img)
        await this.$deleteObject(imgRef)

      } catch (e) {
        this.temporalAlert({
          show: true,
          message: "Error al eliminar la imagen",
          type: "error",
        })
      }
    },
    async deleteProduct(item) {
      try {
        this.loading = true
        // TODO: Pendiente de validar si el producto no tiene entregas
        this.product.url_img = item.url_img
        await this.deleteImgByProduct()
        const docRef = this.$doc(this.$DB, 'products', item.id)
        await this.$deleteDoc(docRef)
        this.temporalAlert({
          show: true,
          message: "Producto eliminado con exito",
          type: "success",
        })
        this.getProducts()
        setTimeout(() => {
          this.loading = false
        }, 500)
      } catch (e) {
        this.loading = false
        this.temporalAlert({
          show: true,
          message: "Error al eliminar producto",
          type: "error",
        })
      }


    },
    async addProduct() {
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
        const arraySizes = this.sizesTable.map((size) => {
          const objectSize = {
            size_reference: this.$doc(this.$DB, "sizes", size.reference),
            stock: size.stock
          }
          return objectSize
        })
        const data = {
          ...this.product,
          name: this.product.name.toLowerCase(),
          products_types_reference: this.$doc(this.$DB, "product_types", this.product.products_types_reference),
          sizes: arraySizes,
          timestamp: this.$timestamp.now().toDate().toISOString()
        }
        await this.$addDoc(this.$collection(this.$DB, "products"), data);
        this.temporalAlert({
          show: true,
          message: "Producto guardado",
          type: "success",
        })
        this.createProductDialog = false
        this.loading = true
        this.getProducts()
        this.countAlDocuments()
        setTimeout(() => {
          this.loading = false
        }, 2000)
      } catch (e) {
        this.closeCrateDialog()
        this.cleanForm()
        this.loading = false
        this.temporalAlert({
          show: true,
          message: "El producto no se pudo guardar",
          type: "error",
        });
      }
    },
    async searchProduct(filters) {
      this.nameProduct = filters.nameProduct
      this.productType = filters.typeProduct
      if (filters.nameProduct === "" && filters.typeProduct === "") {
        // this.items = [
        this.isSearch = false
      } else {
        this.isSearch = true
      }
      this.ultimoDoc = null
      this.items = []
      await this.getProducts()
    },
    async getSizes() {
      try {
        const id_Reference = this.$doc(this.$DB, "product_types", this.product.products_types_reference)
        const query = this.$query(this.$collection(this.$DB, 'sizes'), this.$where('product_type_reference', '==', id_Reference))
        const response = await this.$getDocs(query)
        response.forEach((doc) => {
          const data = {id: doc.id, ...doc.data()}

          this.itemSizes.push(data)
          console.log(this.itemsProductType)
        })
      } catch (e) {
        console.log(e)
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
    // async infiniteHandler() {
    //   if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 50) {
    //     await this.pagination()
    //   }
    // },
    async countAlDocuments() {
      const countResponse = await this.$getCountFromServer(this.$collection(this.$DB, 'products'))
      this.TotalRows = countResponse.data().count
    }

  },
  computed: {
    fileErrors() {
      const errors = [];
      if (!this.$v.files.$dirty) return errors;
      !this.$v.files.isEmptyFile && errors.push("Campo requerido");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.product.name.$dirty) return errors;
      !this.$v.product.name.required && errors.push("Nombre requerido");
      return errors;
    },
    productTypeErrors() {
      const errors = [];
      if (!this.$v.product.products_types_reference.$dirty) return errors;
      !this.$v.product.products_types_reference.required && errors.push("Tipo de prenda requerido");
      return errors;
    },
    datePurchaseErrors() {
      const errors = [];
      if (!this.$v.product.date_purchase.$dirty) return errors;
      !this.$v.product.date_purchase.required && errors.push("Fecha de compra requerido");
      return errors;
    },
    purchasePriceErrors() {
      const errors = [];
      if (!this.$v.product.purchase_price.$dirty) return errors;
      !this.$v.product.purchase_price.minCero && errors.push("Precio de compra requerido");
      return errors;
    },
    salePriceErrors() {
      const errors = [];
      if (!this.$v.product.sale_price.$dirty) return errors;
      !this.$v.product.sale_price.minCero && errors.push("Precio de venta requerido");
      !this.$v.product.sale_price.minPriceSale && errors.push("Precio de venta no puede ser menor al de compra");

      return errors;
    },
    sizeStockErrors() {
      const errors = [];
      if (!this.$v.sizes.size_stock.$dirty) return errors;
      !this.$v.sizes.size_stock.required && errors.push("La cantidad de tallas es requerido");
      !this.$v.sizes.size_stock.minCeroSizes && errors.push("Cantidad de tallas tiene que ser mayor a cero");

      return errors;
    }
    // marginTop() {
    //   let marginTop = {}
    //   if (this.$vuetify.breakpoint.lgAndUp) {
    //     marginTop.marginTop = '200px'
    //   } else if (this.$vuetify.breakpoint.md) {
    //     marginTop.marginTop = '250px'
    //   } else if (this.$vuetify.breakpoint.sm) {
    //     marginTop.marginTop = '250px'
    //   } else {
    //     marginTop.marginTop = '240px'
    //   }
    //
    //   return marginTop
    // }
  },
  async updated() {
    if (this.createProductDialog) {
      await this.getProductType()
    }
  },

  async created() {
    await this.countAlDocuments()
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

::v-deep .v-data-table {
  background-color: #ffb3e1 !important;
  color: #753979 !important;

  .v-data-table__wrapper {
    border-radius: 24px;

    table tbody {
      tr:hover {
        background-color: #f4c2e2 !important;
      }
    }
  }
}


</style>
