<template>
  <div v-if="$rules.hasPermission('member.approvals')">
  <v-row v-if="datas" class="d-flex justify-space-between" no-gutters>
    <v-col cols="12">
      <v-data-table
        :headers="headers"
        :items="datas"
        item-key="name"
        class="elevation-1"
        dense
        :footer-props="footerprops"
        :server-items-length="pages"
        @pagination="paginate"
      >
       <!-- <template #top>
          <v-toolbar color="primary" flat dark>
            <v-toolbar-title class="d-flex font-weight-bold">
              Group Transactions
            </v-toolbar-title>
            <v-spacer />
          </v-toolbar>
        </template>-->
        <template #item.type="{ item }">
          <span v-if="item.transactionType"
            >{{ item.transactionType.type }}-({{
              item.transactionType.flag
            }})</span
          >
        </template>
        <template #item.destination="{ item }">
          <span v-if="item.destinationAccount != '-1'">{{
            item.destinationAccount
          }}</span>
          <span v-else class="grey--text"> Not Provided </span>
        </template>
        <template #item.logDate="{ item }">
          <span>{{ item.logDate | simpledateformat }}</span>
        </template>
        <template #item.sms="{ item }">
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <v-icon
                v-if="item.sms == '-1' || item.sms === ''"
                disabled 
                v-bind="attrs"
                color="button darken-2"
                v-on="on"
              >
                mdi-note-text-outline
              </v-icon>
              <v-icon v-else  v-bind="attrs" color="button darken-2" v-on="on">
                mdi-note-text
              </v-icon>
            </template>
            <span>{{ item.description }}</span>
          </v-tooltip>
        </template>
        <template #no-data>
          <span>No group request found ...</span>
        </template>
      
        <template #item.actions="{ item }">
          <v-icon  small>mdi-eye</v-icon>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
  <skeleton-table-loader v-else />
</div>
  <access-denied v-else/>
</template>
<script>
export default {
  data() {
    return {
      datas: null,
      pages: 0,
      headers: [
        { text: "MSISDN", value: "requestorMsisdn" },
        { text: "Request ", value: "request" },
        { text: "Status ", value: "status" },
        { text: "Description", value: "sms" },
        { text: "Transaction Date", value: "logDate" },
        { text: "Confirmed", value: "confirmDate" },
      ],
      show: false,
      editedItem: {},
    };
  },
  head() {
    return {
      title: "Requests",
    };
  },
  created() {
    this.paginate({ page: 0, itemsPerPage: this.itemsPerPage });
  },
  methods: {
    async paginate(it) {
      await this.$api
        .$get(`/members/approvals`, {
          params: {
            page: it.page,
            size: it.itemsPerPage,
            sort: "logdate desc",
            gid: this.$route.params.id
          },
        })
        .then((response) => {
          this.pages = response.totalRows == 0 ? response.currentPage:response.totalRows;
          this.page = response.currentPage;
          this.datas = response.results;
        })
        .catch((_err) => {});
    },
  },
};
</script>
