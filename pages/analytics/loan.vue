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
              Member Loan Repayments
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

              <v-col cols="12" sm="12" md="3" class="ml-2">
                <v-text-field
                  prepend-inner-icon="mdi-dialpad"
                  label="Member Msisdn"
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
                <v-btn color="button" @click.stop="paginate({ page: 0, itemsPerPage: 15 })">
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
        
        <template #item.total="{ item }">
          <span>{{ parseFloat(item.firstWeek)+parseFloat(item.secondWeek)+parseFloat(item.thirdWeek)+parseFloat(item.fourthWeek)+parseFloat(item.fifthWeek)  }}</span>
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
        { text: "Names", value: "member.name" },

        { text: "Phone Number", value: "msisdn" },
        { text: "Group", value: "group.name" },
        { text: "Month ", value: "month" },
        { text: "Week 1", value: "firstWeek" },

        { text: "Week 2", value: "secondWeek" },
        { text: "Week 3 ", value: "thirdWeek" },
        { text: "Week 4", value: "fourthWeek" },
        { text: "Week 5", value: "fifthWeek" },
        { text: "Total", value: "total" },
      ],
      show: false,
      editedItem: {
        msisdn: '',
      },
    };
  },
  head() {
    return {
      title: "Member Loan Repayments",
    };
  },
  created() {},

  methods: {
    async paginate(it) {
      this.loading = true;
      await this.$api
        .$post("analytics/loanrepayment", this.editedItem, {params: { page: it.page, size: it.itemsPerPage, sort: "month desc" },
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
      