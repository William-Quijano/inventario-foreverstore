<template>
  <v-fab-transition>
    <v-btn
        color="pink"
        dark
        right
        fixed
        bottom
        fab
        @click="$emit('click')"
    >
      <v-icon color="purple">mdi-plus</v-icon>
    </v-btn>
  </v-fab-transition>
</template>
<script >
export default {

}
</script>
