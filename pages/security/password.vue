<template>
  <v-card flat tile>
    <v-toolbar color="primary" flat dark>
      <v-toolbar-title class="text-h5 font-weight-black">
        <v-icon color="button" left>mdi-shield-refresh</v-icon>
        CHANGE YOUR PASSWORD
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text>
      <v-row no-gutters>
        <v-col cols="12" md="3" sm="12"/>
        <v-col cols="12" md="6" sm="12">
          <v-row no-gutters class="px-3">
            <v-col cols="12" sm="12" class="mt-3">
              <v-text-field
                v-model="editedItem.currentPassword"
                hint="Current Password"
                prepend-inner-icon="mdi-lock"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                placeholder="Current Password"
                @click:append="show = !show"
                maxlength="15"
                counter
                :type="show ? 'text' : 'password'"
                filled
                dense outlined
                persistent-hint
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12"  class="mt-3">
              <v-text-field
                v-model="editedItem.newPassword"
                hint="New Password"
                prepend-inner-icon="mdi-lock"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                placeholder="New Password"
                @click:append="show = !show"
                maxlength="15"
                counter
                :type="show ? 'text' : 'password'"
                filled
                dense outlined
                persistent-hint
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" class="mt-3">
              <v-text-field
                v-model="editedItem.repeatPassword"
                hint="Confirm New Password"
                prepend-inner-icon="mdi-lock"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                placeholder="Confirm New Password"
                @click:append="show = !show"
                maxlength="15"
                counter
                :type="show ? 'text' : 'password'"
                filled
                dense outlined
                persistent-hint
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="3" sm="12" />
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="button darken-2" @click="changeOwnPassword()">
        <v-icon small left>mdi-shield-refresh</v-icon>CHange pAssword</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
  <script>
export default {
  data: () => ({
    show: false,
    editedItem: {
      currentPassword: "",
      newPassword: "",
      repeatPassword: "",
    },
    search: null,
  }),
  methods:{
    async changeOwnPassword(){
      await this.$api
        .$put("/users/password", {password: this.editedItem.newPassword, oldPassword: this.editedItem.currentPassword})
        .then((response) => {
          this.$store.dispatch('_logoutsession')
        })
        .catch((_err) => {});
    },
    }
};
</script>