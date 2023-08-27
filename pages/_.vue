<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" class="d-flex align-center justify-center" justify="center" no-gutters>
      <v-col cols="12">
        <v-card class="elevation-12 d-flex align-center" outlined elevation="0" color="grey lighten-3" :height="screen">
          <v-container class="fill-height " fluid>
            <v-row no-gutters>
              <v-col cols="12" class="d-flex justify-center align-center text-h1 gradient font-weight-bold primary--text">
                Page not found
              </v-col>
              <v-col cols="12" class="d-flex justify-center align-center  font-weight-bold accent--text pt-4">
                Sorry, then page you were looking for is not found
              </v-col>
              <v-col class="d-flex justify-center align-center mt-5" cols="12">
                <NuxtLink to="/">
                  Home page
                </NuxtLink>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="js">
export default {
  computed: {
    screen () {
      return window.screen.height - 200
    }
  }
}
</script>
