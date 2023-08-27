<template>
  <div>
    <v-toolbar flat>
      <v-toolbar-title class=" font-weight-medium">
        Member Loans Query
      </v-toolbar-title>
      <v-spacer />
      <div class="d-flex justify-end">
        <v-text-field
          v-model="msisdn"
          append-icon="mdi-magnify"
          label="Enter member MSISDN"
          single-line
          hide-details
          outlined
          filled
          height="40"
          dense
          class="search mr-2"
        />
        <v-btn
          color="primary"
          class="px-8 py-4"
          @click="paginate"
        >
          <v-icon left>
            mdi-magnify
          </v-icon>Query
        </v-btn>
      </div>
    </v-toolbar>
    <v-data-table
      v-if="loans"
      :headers="headers"
      :items="loans"
      item-key="id"
      class="elevation-1"
      :footer-props="footerprops"
      :server-items-length="pages"
      @pagination="paginate"
    >
      <template #item.created="{item}">
        <span>{{ item.transactionDate | dateformat }}</span>
      </template>
      <template #item.status="{ item }">
        <v-chip small color="warning">
          {{ item.loanStatus }}
        </v-chip>
      </template>
      <template #no-data>
        <span>No loan found ...</span>
      </template>
      <template #item.loanAmount="{ item }">
        {{ item.loanAmount | currency }}
      </template>
      <template #item.loanBalance="{ item }">
        {{ item.loanBalance | currency }}
      </template>
      <template #item.type="{item}">
        <span>{{ item.loanType.type }}-({{ item.loanType.flag }})</span>
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loans: [],
      pages: 0,
      msisdn: '',
      headers: [
        { text: 'Loan ID', value: 'id' },
        { text: 'MSISDN', value: 'msisdn' },
        { text: 'Group Name', value: 'group.name' },
        { text: 'Loan Amount', value: 'loanAmount' },
        { text: 'Loan Balance', value: 'loanBalance' },
        { text: 'Loan Type ', value: 'type' },
        { text: 'Loan Status ', value: 'status' },
        { text: 'Loan Date', value: 'loanDate' },
        { text: 'Last Repayment Date', value: 'lastRepaymentDate' },
        { text: 'Due Date', value: 'loanDueDate' }

      ],
      show: false,
      editedItem: {}
    }
  },
  head () {
    return {
      title: 'Loans'
    }
  },
  created () {
    this.paginate({ page: 0, itemsPerPage: 10 })
  },
  methods: {
    rowclick (v) {
      this.show = true
      this.$router.push(`/transactions/${v.id}`)
      // console.log(v)
    },

    async paginate (it) {
      await this.$api.$get('/members/loans', { params: { page: it.page, size: it.itemsPerPage, sort: 'loan_date desc', msisdn: this.msisdn } })
        .then((response) => {
          this.pages = response.totalRows
          this.page = response.currentPage
          this.loans = response.results
        }).catch((_err) => {
        })
    }
  }

}
</script>
