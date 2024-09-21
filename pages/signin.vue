<template>
    <v-container >
      <v-row v-if="false" class="mt-0">
        <v-col cols="12" sm="12" md="2">
          <img
            src="@/assets/images/logo.png"
            alt="homepage"
            width="100"
            class="ml-2 dark-logo"
          >
        </v-col>
      </v-row>

      <div class="d-flex align-center justify-center">
        <v-row class="mt-0" no-gutters>
          <v-col cols="12" md="5" class="d-flex justify-center align-center ">
            <v-list color="transparent">
              <v-list-item  three-line>
                <v-list-item-content>
                  <v-list-item-title class="text-sm-h4 text-md-h3 text-lg-h2 primary--text text-xs-center font-weight-black text-md-left">
                    MKOBA DASHBOARD
                  </v-list-item-title>
                  <v-list-item-subtitle class="mt-10 text-sm-h5 text-md-h6 text-lg-h5 text-sm-center text-md-left">
                    Mkoba administrator dashboard 
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
          <v-spacer />
          <v-col cols="12" md="5" lg="4" class="mt-5 d-flex justify-center">
            <v-form class="form-box" @submit.prevent="formSubmit">
            <v-card class="py-12" rounded >
              <v-card-title class="d-flex justify-center">
                <img
                  src="@/assets/images/tcb_logo.png"
                  alt="homepage"
                  width="180px"
                  class="ml-2 dark-logo"
                >
              </v-card-title>
              <v-card-text>
                <v-row no-gutters class="mt-5">
                  <v-col cols="12" class=" mt-3">
                    <v-text-field
                      v-model="form.username"
                      color="black"
                      class="text-h4 px-3 form-input"
                      outlined
                      placeholder="e.g username"
                      label="Username"
                      required
                    />
                  </v-col>
                  <v-col cols="12" class=" mt-3">
                    <v-text-field
                      v-model="form.password"
                      autocomplete="off"
                      color="black"
                      class="text-h4 px-3"
                      placeholder="*********"
                      type="password"
                      outlined
                      label="Enter Password"
                      required
                    />
                  </v-col>
                  <v-col cols="12" class=" mt-5 d-flex justify-center">
                    <v-btn block type="submit" color="primary" dark>
                      Continue
                      <v-icon right>
                        mdi-arrow-right-bold
                      </v-icon>
                    </v-btn>
                  </v-col>
                  <v-col cols="12" />
                </v-row>
              </v-card-text>
            </v-card>
            </v-form>
          </v-col>
        </v-row>
      </div>
    </v-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  layout: 'login',
  data () {
    return {
      form: {
        username: null,
        password: null
      },

      title: 'Market Grid : Login'
    }
  },
  head () {
    return {
      title: 'Login Page'
    }
  },
  computed: {
    ...mapGetters(['processing'])

  },

  created () {
    // check if user logged in othewise send them packing

    if (this.isAuthenticated) {
      this.$router.replace('/')
    }
  },
  methods: {
    ...mapActions(['login']),

    formSubmit () {
      this.$store.dispatch('_authenticate', this.form)
    }
  }

}
</script>
