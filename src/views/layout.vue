<template>
  <v-app>
    <app-loader v-if="loader"></app-loader>

    <!--    <app-header></app-header>-->
    <!--    <app-aside-bar :menu="menu"></app-aside-bar>-->
    <v-system-bar
        height="30"
    ></v-system-bar>
    <v-main>
      <div>
        <router-view :key="$route.fullPath"/>

      </div>
      <app-bottom-navigation></app-bottom-navigation>
    </v-main>

  </v-app>
</template>

<script>
import {mapMutations, mapState} from "vuex";
import AppBottomNavigation from "@/components/AppBottomNavigation.vue";

export default {
  name: "layout",
  components: {AppBottomNavigation},

  methods: {
    ...mapMutations(["setUserInfo"]),
  },
  computed: {
    ...mapState({
      userInfo: "userInfo",
      token: "token",
    }),
    ...mapState("utils", ["loader", "menu"]),
  },
  async created() {
    // const userToken = this.token || localStorage.getItem('token');
    // if (userToken) {
    //   const userDecode = jwtDecode(userToken);
    //   this.setUserInfo(userDecode);
    // } else {
    //   // this.$router.push("/login").catch((e) => {});
    // }
  },
};
</script>

<style scoped>
</style>
