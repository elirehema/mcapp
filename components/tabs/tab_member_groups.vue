<template>
  <v-data-table
    v-if="groups"
    :headers="headers"
    :items="groups"
    item-key="name"
    class="elevation-1"
    @click:row="rowclick"
  >
    <template #top>
      <v-toolbar
        color="primary"
        flat
        dark
      >
        <v-toolbar-title class=" font-weight-bold">
          {{ member.name }} {{ member.familyName }} Groups
        </v-toolbar-title>
        <v-spacer />
      </v-toolbar>
    </template>
    <template #item.created="{item}">
      <span>{{ item.createdDate | dateformat }}</span>
    </template>
    <template #item.status="{ item }">
      <v-chip dark class="font-weight-bold" :color="item.status == 'ACTIVE' ? 'green':'success'">
        <v-avatar v-if="item.status == 'ACTIVE'" left>
          <v-icon small>
            mdi-checkbox-marked-circle
          </v-icon>
        </v-avatar>
        {{ item.status.toLowerCase() }}
      </v-chip>
    </template>
    <template #no-data>
      <span>No group found ...</span>
    </template>
  </v-data-table>
  <skeleton-table-loader v-else />
</template>
<script>
export default {

  props: {
    groups: {
      type: Array,
      default: null
    },
    member: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pages: 0,
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Group Type ', value: 'groupType' },
        { text: 'Location', value: 'location' },
        { text: 'Members', value: 'members' },
        { text: 'Status ', value: 'status' },
        { text: 'Created Date', value: 'created' }
      ],
      show: false,
      editedItem: {}
    }
  },
  methods: {
    rowclick (v) {
      this.$router.push(`/groups/${v.id}/${this.$route.params.id}`)
    }
  }
}
</script>
