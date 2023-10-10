<template>
  <v-navigation-drawer
      floating
      :value="sideBar"
      fixed
      app
      @input="setSideBar($event)"
      style="border-radius: 0px 15px 15px 0px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);"
      class="side__backgdound"
  >
    <template v-slot:prepend>
      <div class="pa-5">
        <v-app-bar-nav-icon color="black" @click.stop="setSideBar(!sideBar)"></v-app-bar-nav-icon>
      </div>
    </template>

    <v-list dense nav>
      <div class="px-3 img__logo__innovacion">
        <img color="black" src="../assets/img/Layer_2.png" alt="logo del innovacion"/>
      </div>
      <div class="pt-8 menu__aside">
        <span v-for="(item, i) in menu"
              :key="i">
        <v-list-group  class="list-icon-color" v-if="item.childrens && item.childrens.length">
          <template v-slot:activator>
            <v-list-item-title>
              {{ item.nombre | capitalize }}
            </v-list-item-title>
          </template>
          <template #prependIcon>
            <v-icon>{{ item.icono }}</v-icon>
          </template>

            <span v-for="(child, j) in item.childrens"
                  :key="j">
          <v-list-group no-action sub-group class="list-icon-color" v-if="child.childrens && child.childrens.length">
                  <template v-slot:activator>
                    <v-list-item-title>
                      {{ child.nombre | capitalize }}
                    </v-list-item-title>
                  </template>
                  <template #prependIcon>
                    <v-icon>{{ child.icono }}</v-icon>
                  </template>
                  <template #appendIcon>
                   <v-icon>mdi-menu-down</v-icon>
                </template>
                    <div>
                      <v-list-item v-for="(sub_child, x) in child.childrens" :key="x"
                                   :href="item.uri + child.uri + sub_child.uri">
                        <v-list-item-icon>
                          <v-icon>{{ sub_child.icono }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>
                          <span>{{ sub_child.nombre | capitalize }}</span>
                        </v-list-item-title>

                      </v-list-item>
                    </div>
              </v-list-group>
               <v-list-item v-else
                            :href="item.uri + child.uri"
                            active-class=" blueMinsal--text">
                  <v-tooltip right :disabled="!sideBar" color="blueMinsal">
                    <template v-slot:activator="{ on, attrs }">
                      <v-list-item-icon v-bind="attrs" v-on="on">
                        <v-icon>{{ child.icono }}</v-icon>
                      </v-list-item-icon>
                    </template>
                    <span>{{ child.nombre | capitalize }}</span>
                  </v-tooltip>

                <v-list-item-title>
                  {{ child.nombre | capitalize }}
                </v-list-item-title>
                </v-list-item>
            </span>

      </v-list-group>
        <v-list-item v-else
                     :href="item.uri + child.uri"
                     active-class=" blueMinsal--text">
          <v-tooltip right :disabled="!sideBar" color="blueMinsal">
            <template v-slot:activator="{ on, attrs }">
              <v-list-item-icon v-bind="attrs" v-on="on">
                <v-icon>{{ item.icono }}</v-icon>
              </v-list-item-icon>
            </template>
            <span>{{ item.nombre | capitalize }}</span>
          </v-tooltip>

        <v-list-item-title>
          {{ item.nombre | capitalize }}
        </v-list-item-title>
        </v-list-item>
      </span>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
  name: "AppAsideBar",
  props: {
    menu: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },

  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  methods: {
    ...mapMutations("utils", ["setSideBar"]),

  },
  computed: {
    ...mapState("utils", ["sideBar"]),
  },
};
</script>

<style scoped>
.side__backgdound {
  /* background-image: url('../assets/img/bg-menu.svg');
  background-repeat: no-repeat;*/
  background-size: cover;
  background-position: bottom center;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}

.img__logo__innovacion img {
  width: 100%;
  object-fit: cover;
}

.menu__aside * {
  color: black !important;
}

.list-icon-color ::v-deep .v-list-item .v-list-item__icon:last-child .v-icon,
.list-icon-color ::v-deep .v-list-item .v-list-item__icon:last-child .v-icon:active {
  color: black;
}

::v-deep .v-list-item__title, .v-list-item__subtitle{
  white-space: inherit !important;
  overflow: initial;
}
</style>

