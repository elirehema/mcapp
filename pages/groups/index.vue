<template>
  <v-row
    v-if="groups"
    class="d-flex justify-space-between"
    no-gutters
  >
    <v-col cols="12">
      <v-data-table
        :headers="headers"
        :items="groups"
        item-key="id"
        class="elevation-1"
        :loading="loading"
        loading-text="Loading... Please wait"
        :items-per-page="itemsPerPage"
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
            <v-toolbar-title class="text-h4 font-weight-black">
              Groups
            </v-toolbar-title>
            <v-spacer />
            <v-text-field
            v-model="search"
              prepend-inner-icon="mdi-magnify"
              label="Search group by name, id"
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
              @click:clear="paginate(initialPage)"
        
        />
        <v-btn @click="filterfromdatabase(initialPage)">
          <v-icon left>mdi-filter-variant</v-icon>
          Query result</v-btn>
          </v-toolbar>
        </template>
        <template #item.created="{item}">
          <span>{{ item.createdDate | dateformat }}</span>
        </template>
        <template #item.id="{item}">
          <v-chip small color="bg lighten-2" class="white--text">
            {{ item.id }}
          </v-chip>
        </template>
        <template #item.status="{ item }">
          <v-chip dark :color="item.status == 'ACTIVE' ? 'green':'success'">
            <v-avatar v-if="item.status == 'ACTIVE'" left>
              <v-icon>mdi-checkbox-marked-circle</v-icon>
            </v-avatar>
            {{ item.status.toLowerCase() }}
          </v-chip>
        </template>
        <template #no-data>
          <span>No organization found ...</span>
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
      groups: null,
      search: null,
      pages: 0,
      loading: false,
      headers: [
        { text: 'Group Name', value: 'name' },
        
        { text: 'Group ID', value: 'id' },
        { text: 'Group Type ', value: 'type.type' },
        { text: 'Location', value: 'location' },
        { text: 'Members', value: 'members' },
        { text: 'Status ', value: 'status' },
        { text: 'Created Date', value: 'created' }
        
      ],
      show: false,
      editedItem: {}
    }
  },
  head () {
    return {
      title: 'Groups'
    }
  },
  created () {
    this.paginate({ page: 0, itemsPerPage: 15 })
  },
  methods: {
    rowclick (v) {
      this.show = true
      this.$router.push(`/groups/${v.id}`)
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
      await this.$api.$get('/groups/search', { params: { page: it.page, size: it.itemsPerPage, sort: 'groupid desc', search: this.search } })
        .then((response) => {
          this.loading = false
          this.pages = response.totalRows
          this.page = response.currentPage
          this.groups = response.results
        }).catch((_err) => {
        })
    },

    async paginate (it) {
      await this.$api.$get('/groups', { params: { page: it.page, size: it.itemsPerPage, sort: 'groupid desc' } })
        .then((response) => {
          this.pages = response.totalRows
          this.page = response.currentPage
          this.groups = response.results
        }).catch((_err) => {
        })
    }
  }

}
</script>
