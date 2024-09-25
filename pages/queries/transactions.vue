<template>
   <div v-if="$rules.hasPermission('query.membertrxn')">
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
      >
        <template #top>
          <v-toolbar color="primary" flat dark>
            <v-toolbar-title class="text-h5 font-weight-black">
              Transaction Query: Member TRANSACTIONS DETAILS
            </v-toolbar-title>
            <v-spacer />
            <v-row no-gutters  class="d-flex justify-end">
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
              <v-col cols="12" sm="12" md="3" class="ml-2">
                <v-text-field
                  prepend-inner-icon="mdi-phone"
                  label="MSISDN OR RECEIPT"
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
                  v-model="editedItem.phoneOrReceiptNo"
                />
              </v-col>

              <v-col cols="12" sm="12" md="2" class="ml-2">
                <v-btn color="button" @click.stop="filterResults()">
                  <v-icon left>mdi-filter-variant</v-icon>
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
      dates: [
        new Date(new Date().valueOf() - 1000 * 60 * 60 * 24)
          .toISOString()
          .substring(0, 10),
        new Date(new Date()).toISOString().substring(0, 10),
      ],
      headers: [
        { text: "TRXN ID", value: "id" },

        { text: "Receipt ", value: "receipt" },
        { text: "Date", value: "transactionDate" },
        { text: "Source ", value: "sourceAccount" },
        { text: "Destination", value: "destinationAccount" },

        { text: "Amount", value: "amount" },
        { text: "Type ", value: "transactionType.type" },
        { text: "Group Name", value: "group.name" },
      ],
      show: false,
      editedItem: {
        phoneOrReceiptNo: "",
      },
    };
  },
  head() {
    return {
      title: "Groups",
    };
  },
  created() {},

  methods: {
    async filterResults() {
      this.loading = true;
      var query = {
        msisdn: this.editedItem.phoneOrReceiptNo,
        receipt: this.editedItem.phoneOrReceiptNo,
        startDate: this.dates[0],
        endDate: this.dates[1],
      };
      await this.$api
        .$post("/queries/membertrx", query)
        .then((response) => {
          this.loading = false;
          this.transactions = response;
        })
        .catch((_err) => {});
    },
  },
};
</script>
    