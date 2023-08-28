<template>
  <v-app dark>
    <v-navigation-drawer
      :clipped="false"
      permanent
      color="primary"
      app
      height="100%"
      style="max-height: 97.6%;"
    >
      <v-list>
        <v-list-item v-if="miniVariant" class="px-2">
          <v-list-item-avatar color="whitish">
            <v-img :src="miniUrl" class="vuetify-logo" />
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item v-else link>
          <v-img
            lazy-src="https://myvodacom.vodacom.co.tz/assets/myvodacom/downloadFile/VD-1650X450_VICOBA%201.webp"
            max-height="70"
            max-width="200"
            src="https://elirehema.github.io/mcapp/mkoba.png"
          />
        </v-list-item>
      </v-list>

      <v-divider />
      <v-list shaped nav>
        <v-list-item
          v-for="child in menus"
          :key="child.title"
          :to="child.to"
          link
          color="white"
          class="pl-4"
        >
          <v-list-item-icon>
            <v-icon color="white">
              {{ 'mdi-'+ child.icon }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <span class="font-weight-medium white--text">{{ child.title }}</span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list shaped class="mt-0 pt-0 ml-2" dark>
        <v-list-group
          v-for="item in menuitems"
          :key="item.title"
          v-model="item.active"
          :prepend-icon="`mdi-${item.icon}`"
          active-class="white--text"
          append-icon="mdi-chevron-down"
          no-action
          color="white"
        >
          <template #activator>
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium ">
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in item.menus"
            :key="child.to"
            :to="child.to"
            color="white"
            class="pl-9"
            active-class="white--text"
          >
            <v-list-item-icon>
              <v-icon>{{ "mdi-" + child.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle class="font-weight-normal text-body-2" v-html="child.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
      <template #append>
        <div v-if="false" class="pa-2">
          <v-btn block rounded color="warning" @click="$store.dispatch('_logoutsession')">
            <v-icon left>
              mdi-logout-variant
            </v-icon>
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      color="primary"
      flat
    >
      <v-spacer />
      <v-btn fab small class="mr-1" icon>
        <v-icon color="white">
          mdi-help-circle-outline
        </v-icon>
      </v-btn>
      <v-btn fab small class="mr-5" icon>
        <v-icon color="white">
          mdi-bell-badge-outline
        </v-icon>
      </v-btn>
      <v-badge
        bordered
        bottom
        color="success"
        dot
        offset-x="10"
        offset-y="10"
      >
        <v-avatar size="40">
          <v-img src="https://whatsondisneyplus.com/wp-content/uploads/2021/12/merida-avatar-wodp.png" />
        </v-avatar>
      </v-badge>
    </v-app-bar>

    <v-main>
      <v-container class="ma-2" height="100%" fluid>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <footer-component />
    </v-footer>
  </v-app>
</template>

<script>
import FooterComponent from '~/components/footer-component.vue'
export default {
  name: 'DefaultLayout',
  components: {
    'footer-component': FooterComponent
  },
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      messages: 8,
      adv: 7,
      notifications: 1,
      menus: [
        {
          title: 'Home',
          icon: 'home-outline',
          to: '/'
        },
        {
          title: 'Groups',
          icon: 'account-group-outline',
          to: '/groups'
        },
        {
          title: 'Members',
          icon: 'account-group-outline',
          to: '/members'
        },
        {
          title: 'Reports',
          icon: 'file-chart',
          to: '/transactions'
        }
      ],
      menuitems: [
        {
          title: 'Queries',
          icon: 'database-search',
          menus: [
            {
              title: 'Subscribers',
              icon: 'circle-medium',
              to: '/queries/subscribers'
            },
            {
              title: 'Group',
              icon: 'circle-medium',
              to: '/groups'
            },
            {
              title: 'Transactions',
              icon: 'circle-medium',
              to: '/transactions'
            },
            {
              title: 'Group Request',
              icon: 'circle-medium',
              to: '/qr/grequest'
            },
            {
              title: 'Bulk Transactions',
              icon: 'circle-medium',
              to: '/qr/bulktransactions'
            },
            {
              title: 'Loan Transactions',
              icon: 'circle-medium',
              to: '/member/loans'
            },
            {
              title: 'Group Settings',
              icon: 'circle-medium',
              to: '/qr/grsettings'
            },
            {
              title: 'Group Statment',
              icon: 'circle-medium',
              to: '/qr/bgrstatment'
            },
            {
              title: 'Group Loan Statment',
              icon: 'circle-medium',
              to: '/qr/grloanstatment'
            }
          ]
        },
        {
          title: 'Reports',
          icon: 'file-chart',
          menus: [
            {
              title: 'Group',
              icon: 'circle-medium',
              to: '/report/group'
            },
            {
              title: 'Transactions',
              icon: 'circle-medium',
              to: '/report/transactions'
            },
            {
              title: 'Summary',
              icon: 'circle-medium',
              to: '/report/summary'
            },
            {
              title: 'Trainers Tracker',
              icon: 'circle-medium',
              to: '/report/ttracker'
            },
            {
              title: 'Trainers Summary Report',
              icon: 'circle-medium',
              to: '/report/tsummary'
            },
            {
              title: 'Staff Report',
              icon: 'circle-medium',
              to: '/report/staff'
            },
            {
              title: 'Group with Trainer',
              icon: 'circle-medium',
              to: '/report/grtrainers'
            },
            {
              title: 'Group Weekly report',
              icon: 'circle-medium',
              to: '/report/grweekly'
            },
            {
              title: 'Mkoba Perfomance Summry Report',
              icon: 'circle-medium',
              to: '/report/mkoba'
            }
          ]
        },
        {
          title: 'Security',
          icon: 'shield-lock',
          menus: [
            {
              title: 'Users Management',
              icon: 'circle-medium',
              to: '/users'
            },
            {
              title: 'Groups Management',
              icon: 'circle-medium',
              to: '/management/groups'
            },
            {
              title: 'Audit Trial',
              icon: 'circle-medium',
              to: '/audittrial'
            },
            {
              title: 'Change Your Password',
              icon: 'circle-medium',
              to: '/password'
            },
            {
              title: 'Admin Password Change',
              icon: 'circle-medium',
              to: '/adminpassword'
            },
            {
              title: 'Security Policies',
              icon: 'circle-medium',
              to: '/policies'
            },
            {
              title: 'Trainers Management',
              icon: 'circle-medium',
              to: '/management/trainers'
            }
          ]
        },
        {
          title: 'Settings',
          icon: 'cog',
          menus: [
            {
              title: 'User Functions',
              icon: 'circle-medium',
              to: '/settings/users'
            },
            {
              title: 'User Roles',
              icon: 'circle-medium',
              to: '/settings/roles'
            },
            {
              title: 'Access Control',
              icon: 'circle-medium',
              to: '/settings/access'
            }
          ]
        },
        {
          title: 'Analytics',
          icon: 'google-analytics',
          menus: [
            {
              title: 'Loan repayments',
              icon: 'circle-medium',
              to: '/anlytics/loan'
            },
            {
              title: 'Social Loan repayments',
              icon: 'circle-medium',
              to: '/anlytics/socialloan'
            },
            {
              title: 'Loan Transactions',
              icon: 'circle-medium',
              to: '/anlytics/loantransactions'
            },
            {
              title: 'Failed Transactions',
              icon: 'circle-medium',
              to: '/anlytics/failedtransactions'
            },
            {
              title: 'Group Shares',
              icon: 'circle-medium',
              to: '/anlytics/groupshares'
            },
            {
              title: 'Failed Group Creations',
              icon: 'circle-medium',
              to: '/anlytics/failedgroup'
            },
            {
              title: 'Notifications',
              icon: 'circle-medium',
              to: '/anlytics/notifications'
            },
            {
              title: 'Portal Token',
              icon: 'circle-medium',
              to: '/anlytics/tokens'
            },
          ]
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
      url: 'logo.png',
      miniUrl: 'logo.png'
    }
  },
  created () {
    localStorage.setItem('msisdn', '255754710521')
  }
}
</script>
