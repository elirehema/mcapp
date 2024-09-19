<template>
    <v-row
      v-if="settings"
      class="d-flex justify-space-between"
      no-gutters
    >
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="settings"
          item-key="name"
          dense
          :items-per-page="20"
           :hide-default-footer="true"
          class="elevation-1"
         
        >
          <template #top>
            <v-toolbar
              color="primary"
              flat
              dark
            >
              <v-toolbar-title class="d-flex font-weight-bold">
                Group settings
              </v-toolbar-title>
              <v-spacer />
            </v-toolbar>
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
        settings: null,
        pages: 0,
        headers: [
          { text: 'Setting', value: 'title' },
          { text: 'Value ', value: 'value' },
  
        ],
        show: false,
        editedItem: {}
      }
    },
    head () {
      return {
        title: 'Settings'
      }
    },
    created () {
      this.paginate()
    },
    methods: {
      async paginate () {
        await this.$api.$get(`/groups/${this.$route.params.id}/settings`,)
          .then((response) => {
            this.settings = response
          }).catch((_err) => {
          })
      }
    }
  
  }
  </script>
  