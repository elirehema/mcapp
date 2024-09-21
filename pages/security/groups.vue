<template>
  <v-row v-if="roles" class="d-flex justify-space-between" no-gutters>
    <v-col cols="12">
      <v-data-table
        :headers="headers"
        :items="roles"
        item-key="id"
        class="elevation-1"
        :search="search"
        :loading="loading"
        loading-text="Loading... Please wait"
        :footer-props="footerprops"
      >
        <template #top>
          <v-toolbar color="primary" flat dark>
            <v-toolbar-title class="text-h5 font-weight-black">
              MANAGE PORTAL USER GROUPS
            </v-toolbar-title>
            <v-spacer />
            <v-btn color="button">
              <v-icon left>mdi-plus</v-icon>
              Add new</v-btn>
          </v-toolbar>
        </template>
        <template #[`item.action`]="{ item }">
          <v-btn elevation="0" small color="button" class="text-capitalize">
            <v-icon left>mdi-eye</v-icon>
            View users</v-btn>
        </template>
      </v-data-table>
    </v-col>
  </v-row>

  <skeleton-table-loader v-else />
</template>
      <script>
export default {
  data() {
    return {
      roles: [],
      search: "",
      pages: 0,
      loading: false,

      headers: [
        { text: "NO", value: "id" },

        { text: "Role Name ", value: "name" },
        { text: "Role Description", value: "description" },
        { text: "Company", value: "company" },
        { text: "Action", value: "action" },
      ],
      show: false,
    };
  },
  head() {
    return {
      title: "User roles",
    };
  },
  created() {
    this.fetchroles();
  },

  methods: {
    async fetchroles() {
      this.loading = true;
      await this.$api
        .$get("/settings/roles")
        .then((response) => {
          this.loading = false;
          this.roles = response;
        })
        .catch((_err) => {});
    },
  },
};
</script>
      