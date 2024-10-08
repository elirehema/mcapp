import Vue from 'vue'
const mixins = {
  components: {
    'skeleton-table-loader': () => import('~/components/loaders/skeleton-table-loader.vue'),
    'skeleton-datepicker-loader': () => import('~/components/loaders/skeleton-date-picker.vue'),
    'skeleton-summary-card': () => import('~/components/loaders/skeleton-summary-card.vue'),
    'access-denied': () => import('~/components/access_denied.vue')
  },
  data () {
    return {
      delay: 3000,
      itemsPerPage: 15,
      initialPage: { page: 0, itemsPerPage: 15 },
      footerprops: {
        'items-per-page-options': [5, 10, 15, 20, 30, 40, 50, 10]
      }
    }
  },
  methods: {},
  computed: {

    msisdn () {
      return localStorage.getItem('msisdn')
    }

  }

}
Vue.mixin(mixins)
