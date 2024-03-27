<template>
    <v-row v-if="functions" class="d-flex justify-space-between" no-gutters>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="functions"
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
                PORTAL SYSTEM USERS FUNCTIONS
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
        functions: [],
        search: "",
        pages: 0,
        loading: false,
       
        headers: [
          { text: "NO", value: "id" },
  
          { text: "Function Name ", value: "name" },
          { text: "Function Description", value: "description" },
         
        ],
        show: false,
        
      };
    },
    head() {
      return {
        title: "User Functions",
      };
    },
    created() {
      this.fetchfunctions()
    },
  
    methods: {
      async fetchfunctions() {
        this.loading = true;
        await this.$api
          .$get("/settings/functions")
          .then((response) => {
            this.loading = false;
            this.functions = response;
          })
          .catch((_err) => {});
      },
    },
  };
  </script>
      