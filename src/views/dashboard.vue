<template>
  <v-container class="pa-0 pa-sm-2 justify-center d-flex" fill-height fluid>
    <v-flex xs12 sm11 md10 lg9>a
      <!-- COMENTADO PARA MAQUETACION-->
        <v-card rounded="lg">
        <v-card-title class="mb-3">Administración</v-card-title>
        <v-card-text>sadasdasdasdas
        </v-card-text>
      </v-card><!-- -->
    </v-flex>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "dashboard",
  data: () => ({
    items: [
      {
        nombre: "Usuarios",
        acciones: [
          {
            nombre: "Agregar Nuevo",
            icono: "mdi-plus-circle",
            path: "/users/create",
          },
          { nombre: "Listar", icono: "mdi-view-list", path: "/users/list" },
        ],
      },
      {
        nombre: "Roles",
        acciones: [
          {
            nombre: "Agregar Nuevo",
            icono: "mdi-plus-circle",
            path: "/roles/create",
          },
          { nombre: "Listar", icono: "mdi-view-list", path: "/roles/list" },
        ],
      },
      {
        nombre: "Perfiles",
        acciones: [
          {
            nombre: "Agregar Nuevo",
            icono: "mdi-plus-circle",
            path: "/profiles/create",
          },
          { nombre: "Listar", icono: "mdi-view-list", path: "/profiles/list" },
        ],
      },
      {
        nombre: "Rutas",
        acciones: [
          {
            nombre: "Agregar Nuevo",
            icono: "mdi-plus-circle",
            path: "/paths/create",
          },
          { nombre: "Listar", icono: "mdi-view-list", path: "/paths/list" },
        ],
      },
    ],
  }),
  created() {},
};
</script>
