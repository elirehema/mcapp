
<template>
  <v-card v-if="member" flat>
    <v-app-bar
      fade-img-on-scroll
      scroll-threshold="500"
      color="primary"
      dark
    >
        <v-toolbar-title class=" font-weight-black text-h4">
        MEMBER: {{ member.name }} {{ member.familyName }}
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

    <!--<v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item"
      >
        <v-card flat>
          <v-card-text />
        </v-card>
      </v-tab-item>
    </v-tabs-items>-->
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <tab-member-groups :groups="groups" :member="member" />
      </v-tab-item>
      <v-tab-item>
        <tab-member-transactions :member="member" />
      </v-tab-item>
    </v-tabs-items>
  </v-card>

  <skeleton-table-loader v-else />
</template>
<script>
import TabMemberGroups from '@/components/tabs/tab_member_groups.vue'
import TabMemberTransactions from '@/components/tabs/tab_member_transactions.vue'
export default {
  components: {
    'tab-member-groups': TabMemberGroups,
    'tab-member-transactions': TabMemberTransactions
  },
  data () {
    return {
      member: null,
      groups: null,
      tab: null,
      editedIndex: -1,
      editedItem: {},
      defaultItem: {},
      paymentref: null,
      items: ['Groups', 'Transactions']
    }
  },
  head () {
    return {
      title: 'Member'
    }
  },
  computed: {
    formtitle () {
      return this.editedIndex === -1 ? 'Add new service name' : 'Edit Service Name'
    }
  },
  created () {
    this._getgMemberById()
    this._getMemberGroups()
  },
  methods: {
    async _getgMemberById () {
      await await this.$api
        .$get(`/members/${this.$route.params.id}`)
        .then((response) => {
          this.member = response
        })
        .catch(() => {
        })
    },
    async _getMemberGroups () {
      await await this.$api
        .$get(`/members/${this.$route.params.id}/groups`)
        .then((response) => {
          this.groups = response == null ? [] : response
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
