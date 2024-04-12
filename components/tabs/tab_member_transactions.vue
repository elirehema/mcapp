<template>
  <v-row
    v-if="transactions"
    class="d-flex justify-space-between"
    no-gutters
  >
    <v-col cols="12">
      <v-data-table
        :headers="headers"
        :items="transactions"
        item-key="name"
        class="elevation-1"
        :footer-props="footerprops"
        :server-items-length="pages"
        @click:row="rowclick"
        @pagination="paginate"
      >
        <template #top>
          <v-toolbar
            color="primary"
            flat
            dark
          >
            <v-toolbar-title class="font-weight-bold ">
               <strong>{{member.name }} {{member.familyName}} </strong>Transactions
            </v-toolbar-title>
            <v-spacer />
          </v-toolbar>
        </template>
        <template #item.type="{item}">
          <span v-if="item.transactionType">{{ item.transactionType.type }}-({{ item.transactionType.flag }})</span>
        </template>
        <template #item.destination="{item}">
          <span v-if="item.destinationAccount != '-1'">{{ item.destinationAccount }}</span>
          <span v-else class="grey--text"> Not Provided </span>
        </template>
        <template #item.sms="{ item }">
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <v-icon
                v-if="item.sms == '-1' || item.sms === ''"
                disabled
                v-bind="attrs"
                color="button darken-2"
                v-on="on"
              >
                mdi-message-badge-outline
              </v-icon>
              <v-icon
                v-else
                v-bind="attrs"
                color="button darken-2"
                v-on="on"
              >
                mdi-message-badge
              </v-icon>
            </template>
            <span>{{ item.sms }}</span>
          </v-tooltip>
        </template>
        <template #no-data>
          <span>No transaction found ...</span>
        </template>
      </v-data-table>
    </v-col>
  </v-row>

  <skeleton-table-loader v-else />
</template>
<script>
export default {
  props: {
    member: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      transactions: null,
      pages: 0,
      headers: [
        { text: 'MSISDN', value: 'msisdn' },
        { text: 'Group ', value: 'group.name' },
        { text: 'Source ', value: 'sourceAccount' },
        { text: 'Destination', value: 'destination' },
        { text: 'Amount', value: 'amount' },
        { text: 'Receipt ', value: 'receipt' },
        { text: 'Transaction Type ', value: 'type' },
        { text: 'SMS', value: 'sms' },
        { text: 'Transaction Date', value: 'transactionDate' }


      ],
      show: false,
      editedItem: {}
    }
  },
  head () {
    return {
      title: 'transactions'
    }
  },
  created () {
    this.paginate({ page: 0, itemsPerPage: 15 })
  },
  methods: {
    rowclick (v) {
      this.show = true
      this.$router.push(`/transactions/${v.id}`)
      // console.log(v)
    },

    async paginate (it) {
      await this.$api.$get(`/members/${this.$route.params.id}/transactions`, { params: { page: it.page, size: it.itemsPerPage, sort: 'transid desc' } })
        .then((response) => {
          this.pages = response.totalRows
          this.page = response.currentPage
          this.transactions = response.results
        }).catch((_err) => {
        })
    }
  }

}
</script>
