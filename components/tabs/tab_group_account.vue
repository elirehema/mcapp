<template>
  <v-row v-if="account">
    <!---<v-col cols="12">
      <v-toolbar flat dense color="primary" dark>
        <v-toolbar-title class="font-weight-bold"> Group Members </v-toolbar-title>
        <v-spacer />
      </v-toolbar>
    </v-col>-->
    <v-col cols="8" class="ma-5">
      <v-card  max-width="90%">
        <v-simple-table dense>
          <template #default>
            <tbody>
              <tr>
                <td class="font-weight-bold">Group Name</td>
                <td class="button--text text--darken-3">
                  {{ account.name }}
                </td>
              </tr>
              <tr>
                <td class="font-weight-bold">Group ID</td>
                <td class="button--text text--darken-3">
                  {{ account.groupId }}
                </td>
              </tr>
              <tr>
                <td class="font-weight-bold">Account ID</td>
                <td class="button--text text--darken-3">
                  {{ account.account }}
                </td>
              </tr>
              <tr>
                <td class="font-weight-bold">Status</td>
                <td class="button--text text--darken-3">
                  {{ account.status }}
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
      <v-card class="my-5" max-width="90%">
        <v-simple-table>
          <template #default>
            <tbody>
              <tr>
                <td class="font-weight-bold">Balance</td>
                <td class="button--text text-h6 text--darken-3">
                  {{ account.balance | currency}}
                </td>
              </tr>
              <tr>
                <td class="font-weight-bold">Deposits</td>
                <td class="button--text text-h6 text--darken-3">
                  {{ account.deposits | currency}}
                </td>
              </tr>
              <tr>
                <td class="font-weight-bold">Withdraws</td>
                <td class="button--text text-h6 text--darken-3">
                  {{ account.withdraws | currency}}
                </td>
              </tr>
              <tr>
                <td class="font-weight-bold">Penalties</td>
                <td class="button--text text-h6 text--darken-3">
                  {{ account.penalty | currency}}
                </td>
              </tr>
              <tr>
                <td class="font-weight-bold">Penalty Paid</td>
                <td class="button--text text-h6 text--darken-3">
                  {{ account.penaltyPaid | currency }}
                </td>
              </tr>
              <tr>
                <td class="font-weight-bold">Social Funds</td>
                <td class="button--text text-h6 text--darken-3">
                  {{ account.socialfund | currency}}
                </td>
              </tr>
              <tr>
                <td class="font-weight-bold">Social Funds Withdraws</td>
                <td class="button--text text-h6 text--darken-3">
                  {{ account.socialfundWithdraws | currency }}
                </td>
              </tr>
              <tr>
                <td class="font-weight-bold">Bonus</td>
                <td class="button--text text-h6 text--darken-3">
                  {{ account.bonus | currency}}
                </td>
              </tr>
              <tr>
                <td class="font-weight-bold">Dividends</td>
                <td class="button--text text-h6 text--darken-3">
                  {{ account.dividend |currency}}
                </td>
              </tr>

              <tr>
                <td class="font-weight-bold">Created date</td>
                <td class="button--text text--darken-3">
                  {{ account.createdDate | dateformat }}
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-col>
  </v-row>
  <skeleton-table-loader v-else />
</template>
<script>
export default {
  data() {
    return {
      account: null,
    };
  },
  created() {
    this.viewgroupaccount();
  },
  methods: {
    async viewgroupaccount() {
      await this.$api
        .$get(`/accounts/${this.$route.params.id}`)
        .then((response) => {
          this.account = response;
        })
        .catch((_err) => {});
    },
  },
};
</script>
