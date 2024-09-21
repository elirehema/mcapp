<template>
  <div v-if="$rules.hasPermission('permission.read')">
    <v-data-table
      v-if="permissions"
      :headers="headers"
      :items="permissions"
      sort-by="calories"
      dense
      items-per-page="15"
      class="elevation-1"
      
    >
      <template v-slot:top>
        <v-toolbar color="primary" flat>
          <v-toolbar-title class="text-h5 font-weight-bold white--text">Pemissions</v-toolbar-title>
        </v-toolbar>
      </template>
    </v-data-table>
    <skeleton-table-loader v-else />
    </div>
    <access-denied v-else/>
  </template>
<script>
import { mapGetters } from 'vuex';
export default {
    data(){
        return{
            headers: [
        { text: "Permission Name", value: "name" },
        { text: "Entity", value: "entity" },
        { text: "Actions", value: "action", sortable: false },
      ],
        }
    },
    created(){
        this.$store.dispatch('_fetchpermissions')
    },
    methods:{

    },
    computed:{
        ...mapGetters({
            permissions:'permissions'
        })
    }
}
</script>