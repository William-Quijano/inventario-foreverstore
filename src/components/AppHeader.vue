<template>
  <v-app-bar app :elevation="0" color="#1C1E4D" dense class="pt-5 rounded-b-lg"
  style="padding-bottom: 13em" rounded>
    <v-app-bar-nav-icon class="white--text" v-if="!sideBar" @click.stop="setSideBar(!sideBar)"></v-app-bar-nav-icon>
    <v-row style="margin-left: 8em">
      <v-col class="col-8">
        <div class="white--text" style="margin-top: 10em">
          <p>Hola</p>
          <p class="text-h4">
            Adminstrativo
          </p>
          <p>Administrador de RRHH</p>
        </div>
<!--        <v-text-field label="¿Que deseas buscar?"  dense
                      color="white" outlined dark/>-->
      </v-col>
      <v-col class="col-4" style="margin-top: 7em;">
        <div style="margin-left: 8em;" class="text-right mr-12">
          <v-avatar color="#1C1E4D" size="5em"  class="elevation-3" style="">
            <v-icon size="4em" color="white">
              mdi-account
            </v-icon>
          </v-avatar>
        </div>
<!--
        <v-menu offset-y transition="scroll-y-transition" rounded="lg">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on"  elevation="0" class="btn__hover">
              <div class="d-flex flex-column jus mr-3">
                <h5 class="primary&#45;&#45;text">{{ userInfo?.user?.email }}</h5>
                <h6 class="text-left icon__color">Adminstrativo</h6>
              </div>
              <div class="flex justify-center align-center">
                <v-avatar size="35" class="mr-2">
                  <img src="../assets/img/icon_people.png" alt="icon people" />
                </v-avatar>
                <v-icon class="icon__color">mdi-menu-down</v-icon>
              </div>
            </v-btn>
          </template>
          <v-list dense nav>
            <v-list-item :to="{name:'profile'}" class="my-0">
              <v-list-item-icon>
                <v-icon size="20">mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Perfil</v-list-item-title>
            </v-list-item>
            &lt;!&ndash; <v-list-item :to="{name:'security'}" class="my-0">
              <v-list-item-icon>
                <v-icon size="20">mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Seguridad</v-list-item-title>
            </v-list-item> &ndash;&gt;
            <v-list-item @click="cerrarSession()" class="my-0">
              <v-list-item-icon>
                <v-icon size="20">mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Cerrar sesión</v-list-item-title>
            </v-list-item>
            &lt;!&ndash; <v-list-item class="my-0">
              <v-list-item-icon>
                <v-switch
                    v-model="$vuetify.theme.dark"
                    class="my-0"
                    hint="This toggles the global state of the Vuetify theme"
                    dense
                ></v-switch>
              </v-list-item-icon>
              <v-list-item-title>Tema Oscuro</v-list-item-title>
            </v-list-item> &ndash;&gt;
          </v-list>
        </v-menu>
-->
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
  name: "AppHeader",
  methods: {
    ...mapMutations("utils", ["setSideBar", "setMenu"]),
    ...mapMutations(["setToken"]),
    async cerrarSession() {
      this.setMenu([]);
      this.setToken(null);
      await this.services.auth.logout()
      localStorage.clear();
      this.$router.push({name: 'login'}).catch((e) => {
      });
    },
  },
  computed: {
    ...mapState(["userInfo"]),
    ...mapState("utils", {
      sideBar: "sideBar",
    }),
  },
};
</script>

<style scoped lang="scss">
.btn__hover {
  &:hover {
    background-color: #f4f7fd !important;
  }
}
.icon__color {
  color: #697182 !important;
}
</style>
