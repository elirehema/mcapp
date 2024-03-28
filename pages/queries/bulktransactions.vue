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
          @pagination="paginate"
        >
          <template #top>
            <v-toolbar color="primary" flat dark>
              <v-toolbar-title class="text-h5 font-weight-black">
                Query Transactions
              </v-toolbar-title>
              <v-spacer />
              <v-row no-gutters>
               
                <v-col cols="12" sm="12" md="5" class="ml-2">
                  <v-menu
                    ref="startDateMenu"
                    v-model="startDateMenu"
                    :close-on-content-click="false"
                    :return-value.sync="dates"
                    transition="scale-y-reverse-transition"
                    offset-y
                    nudge-right
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="dates"
                        range
                        hint="Select Report Date Range"
                        prepend-inner-icon="mdi-calendar-month"
                        readonly
                        background-color="white"
                        hide-details
                        dense
                        solo
                        light
                        chips
                        small-chips
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="dates" range no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn small color="warning" @click="menu = false">
                        Cancel
                      </v-btn>
                      <v-btn
                        small
                        color="green"
                        @click="$refs.startDateMenu.save(dates)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
                
  
                <v-col cols="12" sm="12" md="2" class="ml-2">
                  <v-btn color="button" @click.stop="paginate()">
                    <v-icon left>mdi-magnify</v-icon>
                    Query Result</v-btn
                  >
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
        dates: [
          new Date(new Date().valueOf() - 1000 * 60 * 60 * 24)
            .toISOString()
            .substring(0, 10),
          new Date(new Date()).toISOString().substring(0, 10),
        ],
        headers: [
          { text: "Date", value: "transactionDate" },
  
          { text: "Receipt ", value: "receipt" },
          { text: "Date", value: "transactionDate" },
          { text: "Source ", value: "sourceAccount" },
          { text: "Destination", value: "destinationAccount" },
  
          { text: "Amount", value: "amount" },
          { text: "Type ", value: "transactionType.type" },
          { text: "Group Name", value: "group.name" },
        ],
        show: false,
        
      };
    },
    head() {
      return {
        title: "Groups",
      };
    },
    created() {},
  
    methods: {
      async paginate() {
        this.loading = true;
        var query = {
          startDate: this.dates[0],
          endDate: this.dates[1],
        };
        await this.$api
          .$post("/queries/bulktransactions", query, {params:{sort: 'transate asc'}})
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
      