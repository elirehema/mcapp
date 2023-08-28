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
        :loading="loading"
        loading-text="Loading... Please wait"
        :footer-props="footerprops"
        :server-items-length="pages"
        :items-per-page="15"
        @click:row="rowclick"
        @pagination="paginate"
      >
        <template #top>
          <v-toolbar
            color=""
            flat
          >
            <v-toolbar-title class=" font-weight-medium">
              Group Transactions
            </v-toolbar-title>
            <v-spacer />
            <v-autocomplete
              v-model="model"
              :items="items"
              :loading="isLoading"
              :search-input.sync="search"
              prepend-inner-icon="mdi-magnify"
              chips
              filled
              clearable
              hide-details
              hide-selected
              item-text="name"
              item-value="id"
              label="Filter by group name"
              class="search mr-5"
              dense
              outlined
              offset-y
              min-width="auto"
              absolute
              autocomplete="off"
            >
              <template #no-data>
                <v-list-item>
                  <v-list-item-title> No group found </v-list-item-title>
                </v-list-item>
              </template>
              <template #selection="{ attr, on, item, selected }">
                <v-chip
                  v-bind="attr"
                  :input-value="selected"
                  color="blue-grey"
                  class="white--text"
                  v-on="on"
                >
                  <v-icon left>
                    mdi-meter-electric
                  </v-icon>
                  <span v-text="item.name" />
                </v-chip>
              </template>
              <template #item="{ item }">
                <v-list-item-avatar
                  color="primary" dark
                  class="text-sm font-weight-light white--text"
                >
                  <v-icon color="white">mdi-account-group</v-icon>
                </v-list-item-avatar>
                <v-list-item-content dense @click="updateReportQuery(item)">
                  <v-list-item-title
                    class="text-sm"
                    v-text="item.name"
                  />
                  <v-list-item-subtitle>
                    {{ item.type.type }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </template>
            </v-autocomplete>
          </v-toolbar>
        </template>
        <template #item.type="{item}">
          <span v-if="item.transactionType != null">{{ item.transactionType.type }}</span>
          <span v-else class="grey--text"> Not Provided </span>
        </template>
        <template #item.destination="{item}">
          <span v-if="item.destinationAccount != '-1'">{{ item.destinationAccount }}</span>
          <span v-else class="grey--text"> Not Provided </span>
        </template>
        <template #item.receipt="{item}">
          <span v-if="item.receipt != '-1'">{{ item.receipt }}</span>
          <span v-else class="grey--text"> No Receipt </span>
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
        <template #item.member="{ item }">
        <nuxt-link v-if="item.member != null" :to="`/members/${item.memberId}`">
            <span>{{ item.member.name }} {{ item.member.familyName == '-1' ? '':item.member.familyName }}</span>
        </nuxt-link>
        <span v-else>No found</span>
        </template>
        <template #item.group="{ item }">
        <nuxt-link :to="`/groups/${item.groupId}`">
            <span>{{ item.groupId }} </span>
        </nuxt-link>
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
  data () {
    return {
      transactions: null,
      isLoading: false,
      loading: false,
      pages: 0,
      search: null,
      model: null,
      items: [],
      headers: [
        { text: 'Source ', value: 'sourceAccount' },
        { text: 'Destination', value: 'destination' },
        { text: 'Amount', value: 'amount' },
        { text: 'Member', value: 'member' },
        { text: 'Group ID', value: 'group' },
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
      title: 'Transactions'
    }
  },
  watch: {
    search (val) {
      // if(this.items.length >0) return
      this.isLoading = true
      this.$api
        .$get('/groups/search', { params: { search: val, page: 0, sort: 'groupid desc' } })
        .then((response) => {
          this.items = response.results
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => (this.isLoading = false))
    }
  },
  created () {
    this.paginate({ page: 0, itemsPerPage: 15 })
  },
  methods: {
    rowclick (v) {
      this.show = true
      this.$router.push(`/transactions/${v.id}`)
    },
    updateReportQuery(val){
        this.paginate({ page: 0, itemsPerPage: 15, gid: val.id })
    },

    async paginate (it) {
      this.loading = true
      await this.$api.$get('/transactions', { params: { page: it.page, size: it.itemsPerPage, gid: it.gid, sort: 'transid desc' } })
        .then((response) => {
          this.loading = false;
          this.pages = response.totalRows
          this.page = response.currentPage
          this.transactions = response.results
        }).catch((_err) => {
        })
    }
  }

}
</script>
