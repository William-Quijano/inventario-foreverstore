<template>
  <v-row class="justify-center align-center">
    <v-col cols="12" class="d-flex justify-center align-center">
      <v-card height="95vh" class="d-flex justify-center align-center" elevation="0">
        <v-card-text class="mb-16" >
          <v-row class="justify-center align-center">
            <v-col cols="12" class="d-flex justify-center align-center">
              <v-img max-width="300px" max-height="100px"  src="../assets/img/FS_loader.jpeg"></v-img>
            </v-col>
          </v-row>
          <v-row class="justify-center align-center">
            <v-col cols="12" class="d-flex justify-center align-center">
              <v-progress-linear
                  color="purple"
                  indeterminate
                  rounded
                  height="10"
              ></v-progress-linear>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {}
</script>
