<template>
  <v-row
    v-if="types"
    class="d-flex justify-space-between"
    no-gutters
  >
    <v-col cols="12">
      <v-data-table
        :headers="headers"
        :items="types"
        dense
        item-key="transactionTypeId"
        class="elevation-0"
        :items-per-page="15"
        @click:row="rowclick()"
      >
        <template #top>
          <v-toolbar
            color="primary"
            flat
            dark
          >
            <v-toolbar-title class="font-weight-bold">
              Group Services
            </v-toolbar-title>
            <v-spacer />
          </v-toolbar>
        </template>

        <template #no-data>
          <span>No service found ...</span>
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
      types: null,
      pages: 0,
      headers: [
        { text: 'Type', value: 'type' },
        { text: 'Flag ', value: 'flag' }

      ]
    }
  },
  head () {
    return {
      title: 'Transactions'
    }
  },
  created () {
    this.paginate()
  },
  methods: {
    rowclick (v) {
      this.show = true
      this.$router.push(`/transactions/${v.id}`)
      // console.log(v)
    },
    async paginate () {
      await this.$api.$get('/transactions/types')
        .then((response) => {
          this.types = response
        }).catch((_err) => {
        })
    }

  }

}
</script>
