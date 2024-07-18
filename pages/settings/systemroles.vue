<template>
    <v-data-table
      v-if="roles && $rules.hasPermission('role.read')"
      :headers="headers"
      :items="roles"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar color="primary" flat>
          <v-toolbar-title class="text-h5 font-weight-bold white--text"
            >Roles</v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="650px">
            <template
              v-if="$rules.hasPermission('roles.create')"
              v-slot:activator="{ on, attrs }"
            >
              <v-btn color="button" dark class="mb-2" v-bind="attrs" v-on="on">
                <v-icon left> mdi-plus </v-icon>
                Add new Role
              </v-btn>
            </template>
            <v-card>
              <v-toolbar color="table" flat dark>
                <v-toolbar-title class="text-h4 white--text"
                  ><span class="text-h5">{{ formTitle }}</span></v-toolbar-title
                >
  
                <v-spacer></v-spacer>
              </v-toolbar>
  
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Role Name"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
  
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="permissiondialog" max-width="650px">
            <v-card>
              <v-toolbar color="table" flat dark>
                <v-toolbar-title class="text-h4 white--text"
                  ><span class="text-h5">Add Permissions</span></v-toolbar-title
                >
  
                <v-spacer></v-spacer>
              </v-toolbar>
  
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12">
                      <v-select
                        multiple
                        chips
                        v-model="perms"
                        :items="permissions"
                        :item-text="'name'"
                        :item-value="'id'"
                        label="Select Permission"
                        v-on:focus="$store.dispatch('_fetchpermissions')"
                        :rules="[rules.required]"
                        persistent-hint
                        small-chips
                      >
                        <template #selection="{ item }">
                          <v-chip label outlined class="text--primary text-darken-2" close-icon="mdi-trash-can" close @click:close="removepermission(item)" >{{
                            item.name
                          }}</v-chip>
                        </template>
                      </v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
  
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
                <v-btn color="blue darken-1" text @click="addpermission">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.updatedAt="{ item }">
        <span>{{ item.updatedAt | dateformat }}</span>
      </template>
  
      <template v-slot:item.createdAt="{ item }">
        <span>{{ item.createdAt | dateformat }}</span>
      </template>
      <template
        v-slot:item.actions="{ item }"
        v-if="$rules.hasPermission('role.update')"
      >
        <v-icon class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-btn
        v-if="$rules.hasPermission('role.addpermission')"
          color="blue"
          dark
          class="text-capitalize"
          x-small
          @click="addPermissions(item)"
        >
          Add Permissions
        </v-btn>
  
        <v-btn
          color="gold"
          class="text-capitalize"
          x-small
          v-if="!item.active && $rules.hasPermission('role.activate')"
          @click="activateRole(item, true)"
        >
          activate
        </v-btn>
        <v-btn
          color="warning"
          class="text-capitalize"
          x-small
          v-else
          @click="activateRole(item, false)"
        >
          De-activate
        </v-btn>
      </template>
  
      <template v-slot:item.status="{ item }">
        <v-icon v-if="item.active" color="blue"> mdi-check-decagram</v-icon>
        <v-icon v-else color="black darken-1"> mdi-close-circle</v-icon>
      </template>
    </v-data-table>
    <skeleton-table-loader v-else />
  </template>
  <script>
  import { mapGetters } from "vuex";
  export default {
    data() {
      return {
        dialog: false,
        permissiondialog: false,
        editedIndex: -1,
        search: null,
        editedItem: {
          name: "",
  
          permissions: 44444444444,
        },
        perms: [],
        defaultItem: {
          name: "",
          permissions: [],
        },
  
        rules: {
          required: (value) => !!value || "Field Required",
        },
        headers: [
         
          { text: "Role Name", value: "name" },
          { text: "Active", value: "status" },
          { text: "Created On", value: "createdAt" },
  
          { text: "Updated On", value: "updatedAt" },
          { text: "Actions", value: "actions", sortable: false },
        ],
      };
    },
    created() {
      this.$store.dispatch("_fetchroles");
    },
  
    computed: {
      ...mapGetters({
        roles: "roles",
        permissions: "permissions",
      }),
      formTitle() {
        return this.editedIndex === -1 ? "Add new role" : "Edit role";
      },
    },
    methods: {
      editItem(item) {
        this.editedIndex = this.roles.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialog = true;
      },
  
      activateRole(item, valid) {
        this.$store.dispatch("_activaterole", {
          roleId: item.id,
          action: valid ? "activate" : "deactivate",
        });
      },
      async addPermissions(item) {
        await this.$axios
          .$get(`/roles/${item.id}`)
          .then((response) => {
            console.log(response);
            this.perms = response.ids;
            this.editedItem.permissions = response.ids;
            this.permissiondialog = true;
            this.editedItem = Object.assign({}, item);
          })
          .catch((err) => {});
      },
  
      close() {
        this.dialog = false;
        this.permissiondialog = false;
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        });
      },
  
      addpermission() {
        this.$store.dispatch("_addpermissions", {
          id: this.editedItem.id,
          data: this.perms,
        });
        this.close();
      },
      removepermission(item){
        console.log(item)
        this.$store.dispatch("_removepermission", {
          id: this.editedItem.id,
          data: item.id,
        });
        this.perms.splice(this.perms.indexOf(item.id), 1)
      },
  
      save() {
        if (this.editedIndex > -1) {
          this.$store.dispatch("_updaterole", {
            name: this.editedItem.name,
            id: this.editedItem.id,
          });
        } else {
          this.$store.dispatch("_createrole", { name: this.editedItem.name });
        }
        this.close();
      },
    },
  };
  </script>