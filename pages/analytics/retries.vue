<template>
    <v-row v-if="transactions" class="d-flex justify-space-between" no-gutters>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="transactions"
          item-key="id"
          class="elevation-1"
          :search="search"
          :loading="loading"
          loading-text="Loading... Please wait"
          :items-per-page="itemsPerPage"
          :footer-props="footerprops"
          :server-items-length="pages"
          @click:row="rowclick"
          @pagination="paginate"
        >
          <template #top>
            <v-toolbar color="primary" flat dark>
              <v-toolbar-title class="text-h5 font-weight-black">
                Group Creation(s) for retry
              </v-toolbar-title>
              <v-spacer />
              <v-row no-gutters class="d-flex justify-end">
                <v-col cols="12" sm="12" md="3">
                  <v-text-field
                    prepend-inner-icon="mdi-magnify"
                    label="Enter search text ..."
                    single-line
                    hide-details
                    outlined
                    filled
                    height="40"
                    dense
                    class="search mr-2"
                    clearable
                    autocomplete="off"
                    light
                    background-color="white"
                    v-model="search"
                  />
                </v-col>
              </v-row>
            </v-toolbar>
          </template>
          <template #item.date="{ item }">
            <span>{{ item.date | simpledateformat }}</span>
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
        transactions: null,
        search: "",
        pages: 0,
        loading: false,
        
  
        headers: [
          //{ text: "Session ID ", value: "sessionid" },
          { text: "First Name", value: "firstName" },
          { text: 'Msisdn', value: 'msisdn' },
          { text: "Request", value: "request" },
          { text: "Receipt ", value: "receipt" },
          { text: "Date", value: "date" },
          { text: "Action", value: "action" },
        ],
        show: false,
        editedItem: {
          msisdn: "",
        },
      };
    },
    head() {
      return {
        title: "Failed Transactions",
      };
    },
    created() {
      this.paginate({ page: 0, itemsPerPage: 15 });
    },
  
    methods: {
      async paginate(it) {
        this.loading = true;
        await this.$api
          .$get("analytics/retries", {
            params: {
              page: it.page,
              size: it.itemsPerPage,
              sort: "logdate desc",
            },
          })
          .then((response) => {
            this.loading = false;
            this.pages = response.totalRows;
            this.page = response.currentPage;
            this.transactions = response.results;
          })
          .catch((_err) => {});
      },
    },
  };
  </script>
          