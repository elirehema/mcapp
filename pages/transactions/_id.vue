<template>
  <v-card v-if="transaction">
    <v-app-bar
      fade-img-on-scroll
      elevation="0"
      color="primary"
      dark
    >
      <v-toolbar-title class="text-h5 font-weight-bold">
        Transaction: {{ transaction.id }}
      </v-toolbar-title>
    </v-app-bar>

    <v-simple-table>
      <template #default>
        <tbody>
          <tr>
            <td>Transaction ID</td>
            <td>{{ transaction.id }}</td>
          </tr>
          <tr>
            <td>Receipt ID</td>
            <td>{{ sanitize(transaction.receipt) }}</td>
          </tr>
          <tr>
            <td>Group ID</td>
            <td>
            <nuxt-link :to="`/groups/${transaction.groupId}`">{{ transaction.groupId }}</nuxt-link>
            </td>
          </tr>
          <tr>
            <td>Transaction Date</td>
            <td>{{ transaction.transactionDate }}</td>
          </tr>
          <tr>
            <td>Source</td>
            <td>{{ transaction.sourceAccount }}</td>
          </tr>
          <tr>
            <td>Destination</td>
            <td>{{ transaction.destinationAccount }}</td>
          </tr>
          <tr>
            <td>Transaction Amount</td>
            <td>{{ transaction.amount }}</td>
          </tr>
          <tr>
            <td>Transaction Type</td>
            <td>{{ transaction.transactionType.type }}</td>
          </tr>
          <tr>
            <td>Transaction Type Flag</td>
            <td>{{ transaction.transactionType.flag }}</td>
          </tr>
          <tr>
            <td>Source Balance Before (S.B.B)</td>
            <td>{{ sanitize(transaction.sourceBalanceBefore) }}</td>
          </tr>
          <tr>
            <td>Source Balance After (S.B.A)</td>
            <td>{{ sanitize(transaction.sourceBalanceAfter) }}</td>
          </tr>
          <tr>
            <td>Destination Balance Before (D.B.B)</td>
            <td>{{ sanitize(transaction.destinationBalanceBefore) }}</td>
          </tr>
          <tr>
            <td>Destination Balance After (D.B.A)</td>
            <td>{{ sanitize(transaction.destinationBalanceAfter) }}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>{{ transaction.status }}</td>
          </tr>
          <tr>
            <td>Descriptions</td>
            <td>{{ transaction.description }}</td>
          </tr>
          <tr>
            <td>S.M.S</td>
            <td>{{ sanitize(transaction.sms) }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
  <skeleton-table-loader v-else />
</template>
<script>
export default {
  data () {
    return {
      transaction: null
    }
  },
  created () {
    this._getTransactionById()
  },
  methods: {
    async _getTransactionById () {
      await await this.$api
        .$get(`/transactions/${this.$route.params.id}`)
        .then((response) => {
          this.transaction = response
        })
        .catch(() => {
        })
    },
    sanitize (val) {
      return val === '-1' ? 'Not provided' : val
    }
  }
}
</script>
