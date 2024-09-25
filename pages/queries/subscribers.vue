<template>
   <div v-if="$rules.hasPermission('member.groups')">
  <v-data-table
    v-if="accounts"
    :headers="headers"
    :items="accounts"
    item-key="name"
    class="elevation-1"
    :items-per-page="itemsPerPage"
  >
    <template #top>
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title class="text-h5 font-weight-bold">
          Member Query
        </v-toolbar-title>
        <v-spacer />
        <div class="d-flex align-center justify-end">
          <v-text-field
            v-model="msisdn"
            append-icon="mdi-magnify"
            label="Enter member MSISDN"
            single-line
            hide-details
            outlined
            filled
            height="40"
            color="white"
            dense
            class="search mr-2"
            light
            background-color="white"
          />
          <v-btn
            color="button"
            class=""
            large
            @click="paginate"
          >
            <v-icon left>
              mdi-magnify
            </v-icon>Search Member
          </v-btn>
        </div>
      </v-toolbar>
    </template>
    <template #[`item.index`]="{ index }">
      {{ index + 1 }}
    </template>
    <template #[`item.deposits`]="{ item }">
      {{ item.deposits | currency }}
    </template>
    <template #[`item.created`]="{item}">
      <span>{{ item.createdDate | dateformat }}</span>
    </template>
    <template #[`item.lastname`]="{ item }">
      {{ item.familyName == '-1'?'': item.familyName }}
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
      accounts: [],
      pages: 0,
      msisdn: '',
      headers: [
        { text: 'No ', value: 'index' },
        { text: 'MSISDN', value: 'msisdn' },
        { text: 'Group Name ', value: 'group.name' },
        { text: 'Member Role ', value: 'role' },
        { text: 'Member Deposits ', value: 'deposits' },
        { text: 'First Name', value: 'name' },
        { text: 'Last Name', value: 'lastname' },
        { text: 'Group Status ', value: 'group.status' },
        { text: 'Group Type', value: 'group.type.type' },
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
    this.paginate()
  },
  methods: {
    async paginate () {
      await this.$api.$get('/members/groups', { params: { msisdn: this.msisdn } })
        .then((response) => {
          this.accounts = response
        }).catch((_err) => {
        })
    }
  }

}
</script>
