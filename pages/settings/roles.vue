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
                PORTAL SYSTEM USERS ROLES
              </v-toolbar-title>
              <v-spacer />
              <v-row no-gutters>
              </v-row>
            </v-toolbar>
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
      this.fetchroles()
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
      