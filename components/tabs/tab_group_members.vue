<template>
    <div v-if="$rules.hasPermission('member.read')">
  <v-data-table
    v-if="members"
    :headers="headers"
    :items="members"
    dense
    sort-by="calories"
    class="elevation-1"
    @click:row="rowclick"
  >
   <!--<template #top>
      <v-toolbar
        flat
        dense
        color="primary"
        dark
      >
        <v-toolbar-title class="font-weight-bold">
          Group Members
        </v-toolbar-title>
        <v-spacer />
      </v-toolbar>
    </template>-->
    <template #item.message="{ item }">
      <v-tooltip left color="primary" class="pa-3" min-width="50%" max-width="80%">
        <template #activator="{ on, attrs }">
          <v-icon
            color="blue"
            dark
            v-bind="attrs"
            v-on="on"
          >
            mdi-message-badge
          </v-icon>
        </template>
        <span class="font-weight-bold">{{ item.sms }}</span>
      </v-tooltip>
    </template>
    <template #no-data>
      <p>No data</p>
    </template>
    <template #item.name="{item}">
      <span>{{ item.name.split(" ")[0] + " "+ item.familyName.split(" ")[0] }}</span>
    </template>
    <template #item.created="{item}">
      <span>{{ item.createdDate | simpledateformat }}</span>
    </template>
    <template #item.status="{ item }">
      <!--<v-chip dark x-small class="py-3" :color="item.status == 'ACTIVE' ? 'green':'success'">
        <v-avatar v-if="item.status == 'ACTIVE'" left>
          <v-icon color="white" small>
            mdi-check-circle-outline
          </v-icon>
        </v-avatar>
        {{ item.status }}
      </v-chip>-->
      <v-icon v-if="item.status == 'ACTIVE'" color="green" small>
            mdi-check-circle-outline
          </v-icon>
    </template>
    <template #item.actions="{item}">
      <v-icon color="grey" small>mdi-eye</v-icon>
    </template>
  </v-data-table>
  <skeleton-table-loader v-else />
</div>
  <access-denied v-else/>
</template>
<script>
export default {
  props: {
    members: {
      type: Array,
      default: null
    }
  },
  data: () => ({
    headers: [

      { text: 'Name', value: 'name' },
      { text: 'Msisdn ', value: 'msisdn' },
      { text: 'Role', value: 'role' },
      { text: 'Status ', value: 'status' },
      { text: 'Deposits ', value: 'deposits' },
      { text: 'Repayment', value: 'repayment' },
      { text: 'Penalty Paid', value: 'penaltyPaid' },
      { text: 'Withdraws', value: 'withdraws' },
      //{ text: 'Dividends ', value: 'dividend' },
      { text: 'Date', value: 'created' },
      { text: '', value: 'actions' }
    ]
  }),
  methods:{
    rowclick (v) {
      this.show = true
      this.$router.push(`/groups/${this.$route.params.id}/${v.msisdn}`)
      // console.log(v)
    }
  }
}
</script>
