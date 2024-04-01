<template>
  <v-form class="form-box" @submit.prevent="formSubmit">
    <v-container height="100%">
      <div class="d-flex align-center justify-center mt-15">
        <v-row class="mt-0" no-gutters>
        
          <v-spacer />
          <v-col cols="12" md="5" lg="4" class="mt-5 d-flex justify-center">
            <v-card outlined shaped class="py-12">
              <v-card-title class="d-flex justify-center">
                <img
                  src="@/assets/images/logo.png"
                  alt="homepage"
                  width="50px"
                  class="ml-2 dark-logo"
                >
              </v-card-title>
              <v-card-text>
                <v-row no-gutters class="mt-5">
                  <v-col cols="12" class="mb-6 d-flex justify-center">
                    <span class="font-weight-bold black--text text-h4">Change Password</span>
                  </v-col>
                  <v-col cols="12" class="mt-3">
                    <v-text-field
                      v-model="form.oldPassword"
                      autocomplete="off"
                      color="black"
                      class="text-h4 px-3"
                      placeholder="*********"
                      :append-icon="show?'mdi-eye':'mdi-eye-off'"
                      :type="show?'text':'password'"
                      outlined
                      label="Old Password"
                      @click:append="show = !show"
                      required
                    />
                  </v-col>
                  <v-col cols="12" class="mt-3">
                    <v-text-field
                      v-model="form.password"
                      autocomplete="off"
                      color="black"
                      class="text-h4 px-3"
                      placeholder="*********"
                      :append-icon="show?'mdi-eye':'mdi-eye-off'"
                      :type="show?'text':'password'"
                      outlined
                      label="Enter New Password"
                      @click:append="show = !show"
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
          <v-spacer />
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
      show:false,
      form: {
        oldPassword: null,
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
