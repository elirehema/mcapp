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
    
      <v-list  :class=" mini ? 'mt-0 pt-0 ml-0': 'mt-0 pt-0 ml-2'" dark>
        <template v-for="item in menus">
          <template v-if="item.subs">
          <v-list-group 
          :key="item.title"
          v-model="item.active"
          active-class="white--text"
          append-icon="mdi-chevron-down"
          no-action
          color="white"
        >
          <template #activator>
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium ">
                <v-icon left>{{ `mdi-${item.icon}` }}</v-icon>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item 
            v-for="sub in item.submenus"
            :key="sub.to"
            :to="sub.to"
            link
            color="success" dense
            class="pl-5 mr-2"
            active-class="white--text"
             v-if="$rules.hasPermission(sub.p)"
          >
            <v-list-item-content>
              <v-list-item-title class="font-weight-normal">
                <v-icon left>{{ "mdi-" + sub.icon }}</v-icon>
                {{ sub.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        </template>
          <template v-else>
          <v-list-item 
          :key="item.title"
          :to="item.to"
          link dense
          color="success"
          v-if="$rules.hasPermission(item.p)"
          :class="mini ? 'ml-0':'pl-4'"
        >
          <v-list-item-content>
            <v-list-item-title class="font-weight-medium">
              <v-icon left color="white">
              {{ 'mdi-'+ item.icon }}
            </v-icon>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
          </v-list-item>
          </template>
       
        
        </template>
        
      </v-list>
      <template #append>
        <div class="py-2 mx-3">
          <v-btn block small color="button" @click="$store.dispatch('_logoutsession')">
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
          subs: false,
          p: 'all',
          to: '/'
        },
        {
          title: 'Groups',
          icon: 'account-group-outline',
          subs: false,
          p: 'group.read',
          to: '/groups'
        },
        {
          title: 'Members',
          icon: 'account-group-outline',
          subs: false,
          p: 'member.read',
          to: '/members'
        },
        /** 
        {
          title: 'Reports',
          icon: 'file-chart',
          subs: false,
          to: '/transactions'
        },
        **/
        {
          title: 'Queries',
          icon: 'database-search',
          subs: true,
          submenus: [
            {
              title: 'Subscribers',
              icon: 'circle-medium',
              to: '/queries/subscribers',
              p :'member.read'
            },
            {
              title: 'Groups',
              icon: 'circle-medium',
              to: '/queries/groups',
              p: 'group.read'
            },
            {
              title: 'Transactions',
              icon: 'circle-medium',
              to: '/queries/transactions',
              p: 'query.membertrxn'
            },
            {
              title: 'Group Request',
              icon: 'circle-medium',
              to: '/qr/grequest',
              p: 'all'
            },
            {
              title: 'Bulk Transactions',
              icon: 'circle-medium',
              to: '/queries/bulktransactions',
              p:'queries.bulktrxn'
            },
            {
              title: 'Loan Transactions',
              icon: 'circle-medium',
              to: '/queries/loans',
              p: 'query.loantrxn'
            },
            {
              title: 'Group Settings',
              icon: 'circle-medium',
              to: '/qr/grsettings',
              p: 'hidden'
            },
            {
              title: 'Group Statment',
              icon: 'circle-medium',
              to: '/qr/bgrstatment',
              p: 'hidden'
            },
            {
              title: 'Group Loan Statment',
              icon: 'circle-medium',
              to: '/qr/grloanstatment',
              p: 'hidden'
            }
          ]
        },
        {
          title: 'Reports',
          icon: 'file-chart',
          subs: true,
          submenus: [
            {
              title: 'Group',
              icon: 'circle-medium',
              to: '/reports/groups',
              p: 'all'
            },
            {
              title: 'Transactions',
              icon: 'circle-medium',
              to: '/reports/transactions',
              p: 'report.grouptrxn'
            },
            {
              title: 'Revenue',
              icon: 'circle-medium',
              p: 'all'
            },
            {
              title: 'Summary',
              icon: 'circle-medium',
              to: '/reports/summary',
              p: 'report.general'
            },
            {
              title: 'Trainers Tracker',
              icon: 'circle-medium',
              to: '/reports/ttracker',
              p: 'report.general'
            },
            {
              title: 'Trainers Summary Report',
              icon: 'circle-medium',
              to: '/reports/tsummary',
              p: 'report.general'
            },
            {
              title: 'Staff Report',
              icon: 'circle-medium',
              to: '/reports/staff',
              p: 'report.general'
            },
            {
              title: 'Group with Trainer',
              icon: 'circle-medium',
              to: '/reports/grtrainers',
              p: 'report.general'
            },
            {
              title: 'Group Weekly report',
              icon: 'circle-medium',
              to: '/reports/grweekly',
              p: 'report.general'
            },
            {
              title: 'Mkoba Perfomance Summry Report',
              icon: 'circle-medium',
              to: '/reports/mkoba',
              p: 'report.general'
            }
          ]
        },
        {
          title: 'Security',
          icon: 'shield-lock',
          subs: true,
          submenus: [
            {
              title: 'Users Management',
              icon: 'circle-medium',
              to: '/security/users',
              p: 'user.read'
            },
            {
              title: 'Groups Management',
              icon: 'circle-medium',
              to: '/security/groups',
              p: 'all'
            },
            {
              title: 'Audit Trial',
              icon: 'circle-medium',
              to: '/security/audittrial',
              p: 'auditlog.read'
            },
            {
              title: 'Change Password',
              icon: 'circle-medium',
              to: '/security/password',
              p: 'all'
            },
            /**
            {
              title: 'Admin Password Change',
              icon: 'circle-medium',
              to: '/security/adminpassword',
              p: 'user.pwdchange'
            },
            **/
            {
              title: 'Security Policies',
              icon: 'circle-medium',
              to: '/policies',
              p: 'hidden'
            },
            {
              title: 'Trainers Management',
              icon: 'circle-medium',
              to: '/management/trainers',
              p: 'all.all'
            }
          ]
        },
        {
          title: 'Settings',
          icon: 'cog',
          subs: true,
          submenus: [
            {
              title: 'User Functions',
              icon: 'circle-medium',
              to: '/settings/functions',
              p: 'all'
            },
            {
              title: 'User Roles',
              icon: 'circle-medium',
              to: '/settings/roles',
              p: 'role.read'
            },
            {
              title: 'Access Control',
              icon: 'circle-medium',
              to: '/settings/systemroles',
              p: 'role.read'
            },
            {
              title: 'Permissions',
              icon: 'circle-medium',
              to: '/settings/permissions',
              p: 'permission.read'
            },
          ]
        },
        {
          title: 'Analytics',
          icon: 'google-analytics',
          subs: true,
          submenus: [
            {
              title: 'Loan repayments',
              icon: 'circle-medium',
              to: '/analytics/loan',
              p: 'all'
            },
            {
              title: 'Social Loan repayments',
              icon: 'circle-medium',
              to: '/analytics/socialloan',
              p: 'all'
            },
            {
              title: 'Loan Transactions',
              icon: 'circle-medium',
              to: '/analytics/loantransactions',
              p: 'all'
            },
            {
              title: 'Failed Transactions',
              icon: 'circle-medium',
              to: '/analytics/failedtransactions',
              p: 'all'
            },
            {
              title: 'Group Shares',
              icon: 'circle-medium',
              to: '/analytics/groupshares',
              p: 'all'
            },
            {
              title: 'Failed Group Creations',
              icon: 'circle-medium',
              to: '/analytics/retries',
              p: 'all'
            },
            {
              title: 'Notifications',
              icon: 'circle-medium',
              to: '/analytics/notifications',
              p: 'all'
            },
            {
              title: 'Portal Token',
              icon: 'circle-medium',
              to: '/analytics/tokens',
              p: 'all'
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
