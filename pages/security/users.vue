<template>
   <div v-if="$rules.hasPermission('user.read')">
  <v-data-table
    v-if="users"
    :headers="headers"
    :items="users"
    item-key="id" dense
    class="elevation-1"
    :loading="loading"
    loading-text="Loading... Please wait"
    :footer-props="footerprops"
    :server-items-length="pages"
    :items-per-page="15"
    @pagination="paginate"
  >
    <template #top>
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title class="text-h5 font-weight-black">
          PORTAL USERS MANAGEMENT
        </v-toolbar-title>
        <v-spacer />
        <v-text-field
          prepend-inner-icon="mdi-magnify"
          label="Search member by name, MSISDN"
          single-line
          hide-details
          outlined
          filled
          light
          height="40"
          dense
          solo
          class="search mr-2"
          clearable
          autocomplete="off"
          @input="filterfromdatabase"
        />
      </v-toolbar>
      <v-dialog v-model="dialog" persistent max-width="450">
        <v-card>
          <v-card-title class="text-h5"> Reset user password ? </v-card-title>
          <v-card-text class="pa-4">
            Reset user password. This will reset user to default password and
            will be requested to change password on login. Do you wish to
            proceed ?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="warning darken-1" small @click="dialog = false">
              No, Cancel
            </v-btn>
            <v-btn
              color="green darken-1"
              small
              @click="resetUserPassword(item)"
            >
              Yes Proceed
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <template #[`item.created`]="{ item }">
      <v-menu offset-y>
      <template v-slot:activator="{ attrs, on }">
        <v-btn x-small color="grey"
          class="blue--text ma-0 text-capitalize"
          v-bind="attrs" elevation="0"
          v-on="on">
          Change Role
        </v-btn>
      </template>

      <v-list>
        <v-list-item @click="changeUserRole(item.id,role.id)"
          v-for="role in roles"
          :key="role.id" dense
          link
        >
          <v-list-item-title>{{ role.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    </template>
    <template #[`item.name`]="{ item }">
      <span>{{ item.firstName }} {{ item.lastName }}</span>
    </template>
    <template #[`item.status`]="{ item }">
      <v-icon small v-if="item.status == 1" color="blue">
        mdi-checkbox-marked-circle
      </v-icon>
      <v-icon small v-else color="red"> mdi-close-circle </v-icon>
    </template>
    <template #[`item.role`]="{ item }">
      <v-chip outlined x-small v-if="item.role !== undefined" color="button darken-2" dark>
        {{ item.role.name }}
      </v-chip>
      <span small v-else class="grey--text"> Not assigned </span>
    </template>
    <template #[`item.actions`]="{ item }" v-if="$rules.hasPermission('user.update')">
      <v-tooltip  v-if="$rules.hasPermission('user.activate')" bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark icon @click="activateOrDiactivateUser(item)" v-bind="attrs" v-on="on">
            <v-icon v-if="item.status === 0" color="button">mdi-toggle-switch-off</v-icon>
            <v-icon v-else color="red">mdi-toggle-switch</v-icon>
          </v-btn>
        </template>
        <span> {{ item.status === 0 ? "Activate":"De-Activate" }} user account {{ item.firstName }} {{ item.lastName }}</span>
      </v-tooltip>
      <v-tooltip  v-if="$rules.hasPermission('user.pwdreset')" bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-if="item.status === 1 && !item.changePassword"
        color="primary"
        dark
        icon small
        @click="select(item)"
        v-bind="attrs"
        v-on="on">
        <v-icon small color="warning">mdi-shield-sync</v-icon>
      </v-btn>
      </template>
      <span>Reset this {{ item.firstName }} {{ item.lastName }} to default password</span>
      </v-tooltip>
    </template>
  </v-data-table>
  <skeleton-table-loader v-else />
</div>
<access-denied v-else/>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      users: null,
      pages: 1,
      loading: false,
      dialog: false,
      selected: null,
      headers: [
        { text: "Full Name ", value: "name" },
        { text: "Username ", value: "username" },
        { text: "Email Address ", value: "email" },
        { text: "Phone No. ", value: "phone" },
        { text: "Status ", value: "status" },
        { text: "Role", value: "role" },
        { text: "", value: "created" },
        { text: "Actions", value: "actions" },
      ],
    };
  },
  head() {
    return {
      title: "Users",
    };
  },
  created() {
    this.paginate({ page: 0, itemsPerPage: this.itemsPerPage });
    this.$store.dispatch("_fetchroles");
  },
  computed: {
      ...mapGetters({
        roles: "roles"
      }),
    },
  methods: {
    select(it) {
      this.dialog = !this.dialog;
      this.selected = it;
    },
    async filterfromdatabase(value) {
      this.loading = true;
      await this.$api
        .$get("/users/search", {
          params: { page: 0, size: 15, sort: "first_name asc", search: value },
        })
        .then((response) => {
          this.loading = false;
          //this.pages = response.totalRows
          this.page = response.currentPage;
          this.users = response.results;
        })
        .catch((_err) => {});
    },
    async paginate(it) {
      this.loading = true;
      await this.$api
        .$get("/users", {
          params: {
            page: it.page,
            size: it.itemsPerPage,
            sort: "first_name asc",
          },
        })
        .then((response) => {
          this.pages = response.totalRows;
          this.page = response.currentPage;
          this.users = response.results;
          this.loading = false;
          this.dialog = false;
        })
        .catch((_err) => {});
    },
    async activateOrDiactivateUser(it) {
      this.loading = true;
      console.log("*************************")
      console.log("STATUS: "+it.status )
      console.log(" IS ACTIVE: "+(parseInt(it.status) === 0))
      await this.$api
        .$put(`/users/${it.id}/${it.status === 0 ? "activate" : "deactivate"}`)
        .then((_response) => {
          setTimeout(() => {
            this.paginate({ page: 0, itemsPerPage: this.itemsPerPage });
          }, 5000);
        })
        .catch((_err) => {});
    },
    async resetUserPassword() {
      this.loading = true;
      await this.$api
        .$put(`/users/${this.selected.id}/password`)
        .then((_response) => {
          setTimeout(() => {
            this.paginate({ page: 0, itemsPerPage: this.itemsPerPage });
          }, 5000);
        })
        .catch((_err) => {});
    },
    async changeUserRole(userId, roleId) {
      this.loading = true;
      await this.$api
        .$post(`/users/role`,{roleId: roleId, userId: userId})
        .then((_response) => {
          setTimeout(() => {
            this.paginate({ page: 0, itemsPerPage: this.itemsPerPage });
          }, 5000);
        })
        .catch((_err) => {});
    },
  },
};
</script>
