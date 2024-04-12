<template>
  <v-data-table
    v-if="loans"
    :headers="headers"
    :items="loans"
    item-key="name"
    class="elevation-1"
    :footer-props="footerprops"
    :server-items-length="pages"
    @pagination="paginate"
  >
    <template #top>
      <v-toolbar color="primary" dense dark flat>
        <v-toolbar-title class="font-weight-mediumm text-uppercase">
          {{ member.name }} {{ member.familyName }} Loans in Group
          <strong>{{ group.name }}</strong>
        </v-toolbar-title>
        <v-spacer />
      </v-toolbar>
    </template>
    <template #item.created="{ item }">
      <span>{{ item.transactionDate | dateformat }}</span>
    </template>
    <template #item.status="{ item }">
      <v-chip small color="warning">{{ item.loanStatus }}</v-chip>
    </template>
    <template #no-data>
      <span>No loan found ...</span>
    </template>
    <template #item.type="{ item }">
      <span>{{ item.loanType.type }}-({{ item.loanType.flag }})</span>
    </template>
  </v-data-table>
  <skeleton-table-loader v-else />
</template>
<script>
export default {
  props: {
    group: {
      type: Object,
      default: null,
    },
    member: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      loans: null,
      pages: 0,
      headers: [
        { text: "MSISDN", value: "msisdn" },
        { text: "Loan Amount", value: "loanAmount" },
        { text: "Loan Balance", value: "loanBalance" },
        { text: "Interest ", value: "interest" },
        { text: "Loan Type ", value: "type" },
        { text: "Loan Status ", value: "status" },
        { text: "Loan Date", value: "loanDate" },
        { text: "Last Repayment Date", value: "lastRepaymentDate" },
        { text: "Due Date", value: "loanDueDate" },
        { text: "", value: "actions" },
      ],
      show: false,
      editedItem: {},
    };
  },
  head() {
    return {
      title: "Loans",
    };
  },
  created() {
    this.paginate({ page: 0, itemsPerPage: 15 });
  },
  methods: {
    rowclick(v) {
      this.show = true;
      this.$router.push(`/transactions/${v.id}`);
      // console.log(v)
    },

    async paginate(it) {
      await this.$api
        .$get("/members/loans", {
          params: {
            page: it.page,
            size: it.itemsPerPage,
            sort: "loan_request_id asc",
            msisdn: this.$route.params.memberid,
            gid: this.$route.params.id,
          },
        })
        .then((response) => {
          this.pages = response.totalRows;
          this.page = response.currentPage;
          this.loans = response.results;
        })
        .catch((_err) => {});
    },
  },
};
</script>
