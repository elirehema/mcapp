
<template>
  <v-card v-if="group" flat>
    <v-app-bar
      fade-img-on-scroll
      scroll-threshold="500"
      color="primary"
      dark
      extended
      height="100px"
    >
      <v-app-bar-nav-icon>
        <v-icon large>
          mdi-account-group
        </v-icon>
      </v-app-bar-nav-icon>

      <v-toolbar-title class=" font-weight-bold text-h5">
        GROUP: {{ group.name }}
      </v-toolbar-title>

      <v-spacer />

      <template #extension>
        <v-tabs
          v-model="tab"
          align-with-title
          show-arrows
        >
          <v-tabs-slider color="yellow" />

          <v-tab
            v-for="item in items"
            :key="item"
          >
            {{ item }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-tabs-items v-model="tab">
     <!-- <v-tab-item>
        <tab-group-services />
      </v-tab-item>-->
      <v-tab-item>
        <tab-group-account />
      </v-tab-item>
      <v-tab-item>
        <tab-group-members :members="members" @update="_getGroupMembers($event)" />
      </v-tab-item>
      <v-tab-item>
        <tab-group-transactions />
      </v-tab-item>
      <v-tab-item>
        <tab-group-settings />
      </v-tab-item>
    </v-tabs-items>
  </v-card>

  <skeleton-table-loader v-else />
</template>
<script>
import TabGroupMembers from '@/components/tabs/tab_group_members.vue'
import TabGroupAccount from '@/components/tabs/tab_group_account.vue'
import TabGroupTransactions from '@/components/tabs/tab_group_transactions.vue'
import TabGroupServices from '@/components/tabs/tab_group_services.vue'
import TabGroupSettings from '@/components/tabs/tab_group_settings.vue'
export default {
  components: {
    'tab-group-members': TabGroupMembers,
    'tab-group-transactions': TabGroupTransactions,
    'tab-group-account': TabGroupAccount,
    'tab-group-services': TabGroupServices,
    'tab-group-settings': TabGroupSettings
  },
  data () {
    return {
      group: null,
      members: [],
      tab: null,
      editedIndex: -1,
      editedItem: {},
      defaultItem: {},
      paymentref: null,
      items: [ 'Account', 'Members', 'Transactions','Settings']
    }
  },
  head () {
    return {
      title: 'Group'
    }
  },
  computed: {
    formtitle () {
      return this.editedIndex === -1 ? 'Add new service name' : 'Edit Service Name'
    }
  },
  created () {
    this._getgroupById()
    this._getGroupMembers()
  },
  methods: {
    async _getgroupById () {
      await await this.$api
        .$get(`/groups/${this.$route.params.id}`)
        .then((response) => {
          this.group = response
        })
        .catch(() => {
        })
    },
    async _getGroupMembers () {
      await await this.$api
        .$get(`/groups/${this.$route.params.id}/members`)
        .then((response) => {
          this.members = response
        })
        .catch(() => {
        })
    },
    _closebakdialog () {
      this.bankdialog = false
    }
  }
}
</script>
