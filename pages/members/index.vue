<template>
  <v-data-table
    v-if="members"
    :headers="headers"
    :items="members"
    item-key="createdDate"
    class="elevation-1"
    :loading="loading"
    loading-text="Loading... Please wait"
    :footer-props="footerprops"
    :server-items-length="pages"
    @click:row="rowclick"
    @pagination="paginate"
  >
    <template #top>
      <v-toolbar dark color="primary" flat>
        <v-toolbar-title class=" font-weight-black text-h4">
          Group Members
        </v-toolbar-title>
        <v-spacer />
        <v-text-field
          prepend-inner-icon="mdi-magnify"
          label="Search member by name, MSISDN"
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
          @input="filterfromdatabase"
        />
      </v-toolbar>
    </template>
    <template #item.created="{item}">
      <span>{{ item.createdDate | dateformat }}</span>
    </template>
    <template #item.name="{item}">
      <span>{{ item.name.split(" ")[0] + " "+ item.familyName.split(" ")[0] }}</span>
    </template>
    <template #item.status="{ item }">
      <v-chip dark :color="item.status == 'ACTIVE' ? 'green':'success'">
        <v-avatar v-if="item.status == 'ACTIVE'" left>
          <v-icon>mdi-checkbox-marked-circle</v-icon>
        </v-avatar>
        {{ item.status.toLowerCase() }}
      </v-chip>
    </template>
  </v-data-table>
  <skeleton-table-loader v-else />
</template>
<script>
export default {
  data () {
    return {
      members: null,
      pages: 0,
      loading: false,
      headers: [
        { text: 'Name ', value: 'name' },
        { text: 'MSISDN ', value: 'msisdn' },
        { text: 'Role', value: 'role' },
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
      title: 'Members'
    }
  },
  created () {
    this.paginate({ page: 0, itemsPerPage: 15 })
  },
  methods: {
    rowclick (v) {
      this.show = true
      this.$router.push(`/members/${v.msisdn}`)
      // console.log(v)
    },
    async filterfromdatabase (value) {
      this.loading = true
      await this.$api.$get('/members/search', { params: { page: 0, size: 5, sort: 'name asc', search: value } })
        .then((response) => {
          this.loading = false
          /// this.pages = response.totalRows
          this.page = response.currentPage
          this.members = response.results
        }).catch((_err) => {
        })
    },
    async paginate (it) {
      await this.$api.$get('/members', { params: { page: it.page, size: it.itemsPerPage, sort: 'name desc' } })
        .then((response) => {
          this.pages = response.totalRows
          this.page = response.currentPage
          this.members = response.results
        }).catch((_err) => {
        })
    }
  }

}
</script>
