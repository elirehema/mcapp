<template>
  <v-app dark>
    <v-navigation-drawer
    v-model="drawer"
      :clipped="false"
      permanent
      color="primary"
      dark
      app
      height="100%"
      :mini-variant.sync="mini"
      style="max-height: 96.8%;"
    >
      
        <v-list-item :class="mini ? 'px-2':''" link>
          <v-list-item-avatar color="whitish">
            <v-img :src="miniUrl" class="vuetify-logo" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              Mkoba
            </v-list-item-title>
            <v-list-item-subtitle>Mkoba Platform</v-list-item-subtitle>
          </v-list-item-content>
          <v-btn icon @click.stop="mini = !mini">
            <v-icon v-if="!mini">mdi-arrow-left-thin</v-icon>
            <v-icon v-else>mdi-arrow-right-thin</v-icon>
          </v-btn>
        </v-list-item>
      

      <v-divider />
      <v-list  nav>
        <v-list-item
          v-for="child in menus"
          :key="child.title"
          :to="child.to"
          link 
          color="success"
          :class="mini ? 'ml-0':'pl-4'"
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
      <v-list  :class=" mini ? 'mt-0 pt-0 ml-0': 'mt-0 pt-0 ml-2'" dark>
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
            link
            color="success" dense
            class="px-9 mr-2"
            active-class="white--text"
          >
            <v-list-item-icon>
              <v-icon>{{ "mdi-" + child.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle class="font-weight-normal" v-html="child.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
      <template #append>
        <div class="py-2 mx-3">
          <v-btn block outlined color="button" @click="$store.dispatch('_logoutsession')">
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
      drawer: true,
      mini: false,
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
              to: '/queries/groups'
            },
            {
              title: 'Transactions',
              icon: 'circle-medium',
              to: '/queries/transactions'
            },
            {
              title: 'Group Request',
              icon: 'circle-medium',
              to: '/qr/grequest'
            },
            {
              title: 'Bulk Transactions',
              icon: 'circle-medium',
              to: '/queries/bulktransactions'
            },
            {
              title: 'Loan Transactions',
              icon: 'circle-medium',
              to: '/queries/loans'
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
              to: '/reports/groups'
            },
            {
              title: 'Transactions',
              icon: 'circle-medium',
              to: '/reports/transactions'
            },
            {
              title: 'Revenue',
              icon: 'circle-medium',
            },
            {
              title: 'Summary',
              icon: 'circle-medium',
              to: '/reports/summary'
            },
            {
              title: 'Trainers Tracker',
              icon: 'circle-medium',
              to: '/reports/ttracker'
            },
            {
              title: 'Trainers Summary Report',
              icon: 'circle-medium',
              to: '/reports/tsummary'
            },
            {
              title: 'Staff Report',
              icon: 'circle-medium',
              to: '/reports/staff'
            },
            {
              title: 'Group with Trainer',
              icon: 'circle-medium',
              to: '/reports/grtrainers'
            },
            {
              title: 'Group Weekly report',
              icon: 'circle-medium',
              to: '/reports/grweekly'
            },
            {
              title: 'Mkoba Perfomance Summry Report',
              icon: 'circle-medium',
              to: '/reports/mkoba'
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
              to: '/security/users'
            },
            {
              title: 'Groups Management',
              icon: 'circle-medium',
              to: '/security/groups'
            },
            {
              title: 'Audit Trial',
              icon: 'circle-medium',
              to: '/security/audittrial'
            },
            {
              title: 'Change Your Password',
              icon: 'circle-medium',
              to: '/security/password'
            },
            {
              title: 'Admin Password Change',
              icon: 'circle-medium',
              to: '/security/adminpassword'
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
              to: '/settings/functions'
            },
            {
              title: 'User Roles',
              icon: 'circle-medium',
              to: '/settings/roles'
            },
            {
              title: 'Access Control',
              icon: 'circle-medium',
              to: '/settings/systemroles'
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
              to: '/analytics/loan'
            },
            {
              title: 'Social Loan repayments',
              icon: 'circle-medium',
              to: '/analytics/socialloan'
            },
            {
              title: 'Loan Transactions',
              icon: 'circle-medium',
              to: '/analytics/loantransactions'
            },
            {
              title: 'Failed Transactions',
              icon: 'circle-medium',
              to: '/analytics/failedtransactions'
            },
            {
              title: 'Group Shares',
              icon: 'circle-medium',
              to: '/analytics/groupshares'
            },
            {
              title: 'Failed Group Creations',
              icon: 'circle-medium',
              to: '/analytics/retries'
            },
            {
              title: 'Notifications',
              icon: 'circle-medium',
              to: '/analytics/notifications'
            },
            {
              title: 'Portal Token',
              icon: 'circle-medium',
              to: '/analytics/tokens'
            }
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
