<template>

  <v-row class="mt-7 mx-4 justify-center">
<!--    <v-col class="d-flex">-->
<!--      <span align-self="center" style="color: #509ed7">Filas por página</span>-->
<!--      <v-select-->
<!--          class="mx-3 mt-n5"-->
<!--          :items="[10, 25, 50]"-->
<!--          v-model="porPagina"-->
<!--          @change="updatePerPage"-->
<!--          color="blue-primary"-->
<!--      ></v-select>-->
<!--    </v-col>-->
<!--    <v-col class="d-flex justify-center align-center">-->
<!--      <p style="color: #509ed7">Total registros: {{ totalRegistros }}</p>-->
<!--    </v-col>-->
    <v-col cols="12" class="d-flex justify-center">
      <v-pagination
          v-model="pagina"
          @input="cambiarPagina"
          :length="totalPages"
          :total-visible="0"
      ></v-pagination>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "AppPagination",
  props: {
    page: {
      type: Number,
      default: 1,
    },
    totalRegistros: {
      type: Number,
      default: 0,
    },
    perPage: {
      type: Number,
      default: 25,
    },
  },

  methods: {
    cambiarPagina(event) {
      this.$emit("input", event);
    },
    // updatePerPage(event) {
    //   this.pagina = 1;
    //   this.$emit("change", event);
    // },
  },
  computed: {
    pagina: {
      get() {
        return this.page;
      },
      set(value) {
        this.$emit("update:page", value);
      },
    },
    porPagina: {
      get() {
        return this.perPage;
      },
      set(value) {
        this.$emit("update:perPage", value);
      },
    },
    totalPages() {
      return Math.ceil(this.totalRegistros / this.perPage);
    },
  },
};
</script>

<style lang="scss" scoped>
.v-select {
  max-width: 55px !important;
}

:deep(.v-select__selection--comma) {
  margin: 7px 4px 7px 0;
  min-height: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #509ed7 !important;
}

::v-deep .v-pagination__navigation{
  background-color: #753979 !important;
  i {
    color: white !important;
  }
}
</style>
