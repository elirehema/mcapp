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
          :footer-props="footerprops"
          :server-items-length="pages"
          @pagination="paginate"
        >
          <template #top>
            <v-toolbar color="primary" flat dark>
              <v-toolbar-title class="text-h5 font-weight-black">
                MEMBER LOAN TRANSACTIONS
              </v-toolbar-title>
              <v-spacer />
              <v-row no-gutters>
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
                
                <v-col cols="12" sm="12" md="3" class="ml-2">
                  <v-text-field
                    prepend-inner-icon="mdi-phone"
                    label="MSISDN"
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
                    v-model="editedItem.msisdn"
                  />
                </v-col>
                
                <v-col cols="12" sm="12" md="2" class="ml-2">
                  <v-btn color="button" :disabled="!editedItem.msisdn" @click.stop="paginate({ page: 0, itemsPerPage: 15 })">
                    <v-icon left>mdi-magnify</v-icon>
                    Query Result</v-btn>
                </v-col>
              </v-row>
            </v-toolbar>
          </template>
          <template #item.transactionDate="{ item }">
            <span>{{ item.transactionDate | simpledateformat }}</span>
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
        transactions: [],
        search: "",
        pages: 0,
        loading: false,
        startDateMenu: null,
        rules: {
          required: (v) => !!v || "Field is required",
        },
        headers: [
        { text: 'Loan ID', value: 'id' },
        
        { text: 'Group Name ', value: 'group.name' },
        { text: 'Name', value: 'member.name' },
        { text: 'MSISDN', value: 'msisdn' },
        { text: 'Date', value: 'transactionDate' },
        { text: 'Loan Amount', value: 'loanAmount' },
        { text: 'Amount To Be Paid ', value: 'amoun' },
        { text: 'Interest', value: 'interest' },
        { text: 'Balance', value: 'loanBalance' },
        ],
        show: false,
        editedItem: {
          msisdn: null,
        },
      };
    },
    head() {
      return {
        title: "Groups",
      };
    },
    created () {
  },
   
    methods: {
      async paginate(it) {
        this.loading = true;
      
        await this.$api
          .$post("/queries/memberloantrxn", this.editedItem,{ params: { page: it.page, size: it.itemsPerPage, sort: 'transaction_date desc' } } )
          .then((response) => {
            this.loading = false;
            this.pages = response.totalRows
            this.page = response.currentPage
            this.transactions = response.results;
          })
          .catch((_err) => {});
      },
    },
  };
  </script>
    