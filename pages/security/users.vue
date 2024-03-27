<template>
  <v-data-table
    v-if="users"
    :headers="headers"
    :items="users"
    item-key="id"
    class="elevation-1"
    :loading="loading"
    loading-text="Loading... Please wait"
    :footer-props="footerprops"
    :server-items-length="pages"
    :items-per-page="15"
    @pagination="paginate"
  >
    <template #top>
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title class="text-h5 font-weight-black">
          PORTAL USERS MANAGEMENT
        </v-toolbar-title>
        <v-spacer />
        <v-text-field
          prepend-inner-icon="mdi-magnify"
          label="Search member by name, MSISDN"
          single-line
          hide-details
          outlined
          filled light
          height="40"
          dense solo
          class="search mr-2"
          clearable
          autocomplete="off"
          @input="filterfromdatabase"
        />
      </v-toolbar>
    </template>
    <template #[`item.created`]="{item}">
      <span>{{ item.createdAt | dateformat }}</span>
    </template>
    <template #[`item.name`]="{item}">
      <span>{{ item.firstName }} {{ item.lastName }}</span>
    </template>
    <template #[`item.status`]="{ item }">
      <v-icon v-if="item.status == 1" color="blue">
        mdi-checkbox-marked-circle
      </v-icon>
      <v-icon v-else color="red">
        mdi-close-circle
      </v-icon>
    </template>
  </v-data-table>
  <skeleton-table-loader v-else />
</template>
<script>
export default {
  data () {
    return {
      users: null,
      pages: 1,
      loading: false,
      headers: [
      { text: 'Full Name ', value: 'name' },
        { text: 'Username ', value: 'username' },
        { text: 'Email Address ', value: 'email' },
        { text: 'Phone No. ', value: 'phone' },
        { text: 'Status ', value: 'status' },
        { text: 'Created At', value: 'created' }
      ]
    }
  },
  head () {
    return {
      title: 'Users'
    }
  },
  created () {
    this.paginate({ page: 0, itemsPerPage: 15 })
  },
  methods: {
    async filterfromdatabase (value) {
      this.loading = true
      await this.$api.$get('/users/search', { params: { page: 0, size: 15, sort: 'username asc', search: value } })
        .then((response) => {
          this.loading = false
          //this.pages = response.totalRows
          this.page = response.currentPage
          this.users = response.results
        }).catch((_err) => {
        })
    },
    async paginate (it) {
      await this.$api.$get('/users', { params: { page: it.page, size: it.itemsPerPage, sort: 'username asc' } })
        .then((response) => {
          this.pages = response.totalRows
          this.page = response.currentPage
          this.users = response.results
        }).catch((_err) => {
        })
    }
  }

}
</script>
