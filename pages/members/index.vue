<template>
  <div v-if="$rules.hasPermission('member.read')">
  <v-data-table
    v-if="members"
    :headers="headers"
    :items="members"
    item-key="createdDate"
    class="elevation-1"
    :loading="loading" dense
    loading-text="Loading... Please wait"
    :items-per-page="itemsPerPage"
    :footer-props="footerprops"
    :server-items-length="pages"
    @click:row="rowclick"
    @pagination="handlePagination"
  >
    <template #top>
      <v-toolbar dark color="primary" flat>
        <v-toolbar-title class=" font-weight-black text-h4">
          Group Members
        </v-toolbar-title>
        <v-spacer />
        <v-text-field
        v-model="search"
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
          @click:clear="paginate(initialPage)"
          background-color="white"
        />
        <v-btn color="button" @click="search != null ? filterfromdatabase(initialPage):null">
          <v-icon left>mdi-filter-variant</v-icon>
          Query result</v-btn>
      </v-toolbar>
    </template>
    <template #item.created="{item}">
      <span>{{ item.createdDate | dateformat }}</span>
    </template>
    <template #item.name="{item}">
      <span>{{ item.name.split(" ")[0] + " "+ item.familyName.split(" ")[0] }}</span>
    </template>
    <template #item.status="{ item }">
      <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <div  v-bind="attrs" v-on="on">
          <v-icon v-if="item.status == 'ACTIVE'" color="green">mdi-check-circle-outline</v-icon>
          <v-icon v-else color="grey" >mdi-account-off</v-icon>
        </div>
          
          </template>
          <span>Status: {{ item.status }}</span>
          </v-tooltip>
    </template>
  </v-data-table>
  <skeleton-table-loader v-else />
</div>
  <access-denied v-else/>
</template>
<script>
export default {
  data () {
    return {
      members: null,
      pages: 0,
      search: null,
      loading: false,
      
      headers: [
        { text: 'Name ', value: 'name' },
        { text: 'MSISDN ', value: 'id' },
        { text: 'Group', value: 'group.name' },
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
    this.paginate(this.initialPage)
  },
  methods: {
    rowclick (v) {
      this.show = true
      this.$router.push(`/members/${v.id}`)
      // console.log(v)
    },
    handlePagination(it){
      if (this.search === null){
        this.paginate(it)
      }else{
        this.filterfromdatabase(it)
      }

    },
    async filterfromdatabase (it) {
      this.loading = true
      await this.$api.$get('/members/search', { params: { page: it.page, size: it.itemsPerPage, sort: 'name asc', search: this.search } })
        .then((response) => {
          this.loading = false
          this.members = response.results
          this.pages = response.totalRows
          this.page = response.currentPage
         
        }).catch((_err) => {
        })
    },
    async paginate (it) {
      await this.$api.$get('/members', { params: { page: it.page, size: it.itemsPerPage, sort: 'name desc' } })
        .then((response) => {
          this.members = response.results
          this.pages = response.totalRows
          this.page = response.currentPage
        }).catch((_err) => {
        })
    }
  }

}
</script>
