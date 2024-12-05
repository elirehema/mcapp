<template>
  <div v-if="$rules.hasPermission('queries.loantrxn')">
    <v-row v-if="transactions" class="d-flex justify-space-between" no-gutters>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="transactions"
          item-key="id"
          class="elevation-1"
          :loading="loading"
          loading-text="Loading... Please wait"
          :items-per-page="itemsPerPage"
          :footer-props="footerprops"
          :server-items-length="pages"
          @pagination="paginate"
        >
          <template #top>
            <v-toolbar color="primary" flat dark>
              <v-toolbar-title class="text-h5 font-weight-black">
                Member loan transactions
              </v-toolbar-title>
              <v-spacer />
              <v-row no-gutters class="d-flex justify-end">
                <v-col cols="12" sm="12" md="5" class="ml-2">
                  <v-text-field
                    prepend-inner-icon="mdi-dialpad"
                    label="MSISDN"
                    single-line
                    hide-details
                    outlined
                    filled
                    height="40"
                    dense
                    clearable
                    autocomplete="off"
                    light
                    @click:clear="clearsearch()"
                    background-color="white"
                    v-model="editedItem.msisdn"
                  />
                </v-col>
                
                <v-col cols="12" sm="12" md="2" class="ml-2 mr-8">
                  <v-btn color="button" :disabled="!editedItem.msisdn" @click.stop="paginate(defaultPage)">
                    <v-icon left>mdi-filter-variant</v-icon>
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
  </div>
  <access-denied v-else/>
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
        defaultPage: { page: 1, itemsPerPage: 15 },
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
      clearsearch(){
        this.editedItem.msisdn = null;
        this.paginate(this.defaultPage)
      },
      async paginate(it) {
        console.log(it)
        this.loading = true;
        await this.$api
          .$post("/queries/memberloantrxn", this.editedItem,{ params: { page: it.page, size: it.itemsPerPage, sort: 'transaction_id desc' } } )
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
    