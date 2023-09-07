<template>
  <v-form class="form-box" @submit.prevent="formSubmit">
    <v-container height="100%">
      <v-row class="mt-0">
        <v-col cols="12" sm="12" md="2">
          <img
            src="@/assets/images/logo.png"
            alt="homepage"
            width="160"
            class="ml-2 dark-logo"
          >
        </v-col>
      </v-row>

      <div class="d-flex align-center justify-center mt-15">
        <v-row class="mt-0" no-gutters>
          <v-col cols="12" md="5" class="d-flex justify-center align-center">
            <v-list color="transparent">
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title
                    class="text-sm-h4 text-md-h3 text-lg-h2 primary--text text-sm-center text-md-left"
                  >
                    Ngazi Technologies
                  </v-list-item-title>
                  <v-list-item-subtitle
                    class="mt-10 text-sm-h5 text-md-h4 text-lg-h4 black--text text-sm-center text-md-left"
                  >
                    Lorem Ipsum dolor sit de amet cons
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
          <v-spacer />
          <v-col cols="12" md="5" lg="4" class="mt-5 d-flex justify-center">
            <v-card class="py-12">
              <v-card-title class="d-flex justify-center">
                <img
                  src="@/assets/images/logo.png"
                  alt="homepage"
                  width="150px"
                  class="ml-2 dark-logo"
                >
              </v-card-title>
              <v-card-text>
                <v-row no-gutters class="mt-5">
                  <v-col cols="12" class="mb-3 d-flex justify-center">
                    <span class="font-weight-bold black--text text-h4">Change Password</span>
                  </v-col>
                  <v-col cols="12" class="mt-3">
                    <v-text-field
                      v-model="form.password"
                      autocomplete="off"
                      color="black"
                      class="text-h4 px-3"
                      placeholder="*********"
                      type="password"
                      outlined
                      label="Enter New Password"
                      required
                    />
                  </v-col>
                  <v-col cols="12" class="mt-5 d-flex justify-center">
                    <v-btn block type="submit" color="button" dark>
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
          </v-col>
        </v-row>
      </div>
    </v-container>
  </v-form>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  layout: 'login',
  data () {
    return {
      form: {
        userId: this.$store.getters.userId,
        password: null
      }
    }
  },
  head () {
    return {
      title: 'Change Password'
    }
  },
  computed: {
    ...mapGetters(['processing'])
  },
  methods: {
    ...mapActions(['login']),

    formSubmit () {
      this.$store.dispatch('_changepassword', this.form)
    }
  }
}
</script>
