<template>
  <v-row v-if="logs" class="d-flex justify-space-between" no-gutters>
    <v-col cols="12">
      <v-data-table
        :headers="headers"
        :items="logs"
        item-key="id"
        class="elevation-1"
        :search="search"
        :loading="loading"
        loading-text="Loading... Please wait"
        :footer-props="footerprops"
      >
        <template #top>
          <v-toolbar color="primary" flat dark>
            <v-toolbar-title class="text-h5 font-weight-black">
              AUDIT TRIAL DETAILS
            </v-toolbar-title>
            <v-spacer />
            <v-row no-gutters class="d-flex justify-end">
              <v-col cols="12" sm="12" md="3">
                <v-text-field
                  prepend-inner-icon="mdi-magnify"
                  label="Enter search text ..."
                  single-line
                  hide-details
                  outlined
                  filled
                  height="40"
                  dense
                  class="search mr-2"
                  clearable
                  autocomplete="off"
                  light
                  background-color="white"
                  v-model="search"
                />
              </v-col>
             
              <v-col cols="12" sm="12" md="3" class="ml-2">
                <v-select
                  v-model="editedItem.code"
                  :items="actions"
                  :item-text="'name'"
                  :item-value="'code'"
                  label="Select Audit Event"
                  name="editedItem.code"
                  :rules="[rules.required]"
                  background-color="white"
                  light class="text-caption"
                  single-line
                  hide-details
                  filled
                  dense
                />
              </v-col>
              <v-col cols="12" sm="12" md="3" class="ml-2">
                <v-menu
                  ref="startDateMenu"
                  v-model="startDateMenu"
                  :close-on-content-click="false"
                  :return-value.sync="dates"
                  transition="scale-y-reverse-transition"
                  offset-y 
                  nudge-right
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dates"
                      range
                      hint="Select Report Date Range"
                      prepend-inner-icon="mdi-calendar-month"
                      readonly class="text-caption"
                      background-color="white"
                      hide-details
                      dense
                      solo
                      light
                      chips
                      small-chips
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="dates" range no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn small color="warning" @click="startDateMenu = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      small
                      color="green"
                      @click="$refs.startDateMenu.save(dates)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="12" sm="12" md="2" class="ml-2">
                <v-btn color="button" @click.stop="filterResults()">
                  <v-icon left>mdi-magnify</v-icon>
                  Query Result</v-btn
                >
              </v-col>
            </v-row>
          </v-toolbar>
        </template>
        <template #item.date="{ item }">
          <span>{{ item.date | simpledateformat }}</span>
        </template>
      </v-data-table>
    </v-col>
  </v-row>

  <skeleton-table-loader v-else />
</template>
  <script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      logs: [],
      search: "",
      pages: 0,
      loading: false,
      startDateMenu: null,
      rules: {
        required: (v) => !!v || "Field is required",
      },
      dates: [
        new Date(new Date().valueOf() - 1000 * 60 * 60 * 24)
          .toISOString()
          .substring(0, 10),
        new Date(new Date()).toISOString().substring(0, 10),
      ],
      headers: [
        { text: "Login Name", value: "username" },
        { text: "Audit Date ", value: "date" },
        { text: "IP Address", value: "ipAddress" },
        { text: "Function Access", value: "functionName" },
        { text: "Operation Status", value: "status" },

        { text: "Comment Details ", value: "comment" },
      ],
      show: false,
      editedItem: {
        transactionType: "",
      },
    };
  },
  head() {
    return {
      title: "Groups",
    };
  },
  created() {
    //this.paginate();
    this.$store.dispatch("_fetchauditevents");
  },
  computed: {
    ...mapGetters({
      actions: "auditevents",
    }),
  },
  methods: {
    async filterResults() {
      this.loading = true;
      var query = {
        code: this.editedItem.code,
        startDate: this.dates[0],
        endDate: this.dates[1],
      };
      await this.$api
        .$post("/settings/auditlogs", query)
        .then((response) => {
          this.loading = false;
          this.logs = response;
        })
        .catch((_err) => {});
    },
  },
};
</script>
  