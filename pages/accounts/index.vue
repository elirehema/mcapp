<template>
  <v-data-table
    v-if="accounts"
    :headers="headers"
    :items="accounts"
    item-key="name"
    class="elevation-1"
    :footer-props="footerprops"
    :server-items-length="pages"
    @pagination="paginate"
  >
    <template #top>
      <v-toolbar flat>
        <v-toolbar-title class=" font-weight-medium">
          Accounts
        </v-toolbar-title>
        <v-spacer />
      </v-toolbar>
    </template>
    <template #item.created="{item}">
      <span>{{ item.createdDate | dateformat }}</span>
    </template>
    <template #item.status="{ item }">
      <v-chip small :color="item.status == 'ACTIVE' ? 'success':''">
        <v-avatar v-if="item.status == 'ACTIVE'" left>
          <v-icon small>
            mdi-checkbox-marked-circle
          </v-icon>
        </v-avatar>
        {{ item.status }}
      </v-chip>
    </template>
  </v-data-table>
  <skeleton-table-loader v-else />
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      accounts: null,
      pages: 0,
      headers: [
        { text: 'Name ', value: 'name' },
        { text: 'Account #', value: 'account' },
        { text: 'Status ', value: 'status' },
        { text: 'Deposits ', value: 'deposits' },
        { text: 'Dividends ', value: 'dividend' },
        { text: 'Penalty', value: 'penalty' },
        { text: 'Withdraws', value: 'withdraws' },
        { text: 'Dividends ', value: 'dividend' },
        { text: 'Social Fund', value: 'socialfund' },
        { text: 'S.F Withdraws', value: 'socialfundWithdraws' },
        { text: 'Created Date', value: 'created' }
      ]
    }
  },
  head () {
    return {
      title: 'Accounts'
    }
  },
  created () {
    this.paginate({ page: 0, itemsPerPage: 15 })
  },
  methods: {
    async paginate (it) {
      await this.$api.$get('/accounts', { params: { page: it.page, size: it.itemsPerPage, sort: 'groupid desc' } })
        .then((response) => {
          this.pages = response.totalRows
          this.page = response.currentPage
          this.accounts = response.results
        }).catch((_err) => {
        })
    }
  }

}
</script>
