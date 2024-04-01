export default function ({ $axios, redirect, store }, inject) {
  $axios.setHeader('Content-Type', 'application/json')
  // $axios.setToken(store.getters.accessToken, 'Bearer');

  $axios.defaults.withCredentials = true
  const api = $axios.create({
    headers: {
      common: {
        Accept: '*/*',
        'Content-Type': 'application/json'

      }
    }
  })

  api.onRequest((config) => {
    const _token = localStorage.getItem('accessToken')
    api.setHeader('Content-Type', 'application/json')

    api.setHeader('Authorization', 'Bearer ' + _token)
  })

  api.onError((error) => {
    const message = error.response.data.defaultUserMessage
    const code = parseInt(error.response && error.response.status)
  })
  /** api.onResponse(response => {
    // Vue.toasted.show('Success ', { icon: 'check-circle', type: 'success' });
  });
  **/
  api.onResponseError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 404) {
      const message = error.response.data.message
      console.log(message)
      Vue.toasted.error(`${message}`, {
        icon: 'close-circle',
        position: 'top-center',
        keepOnHover: true,
        type: 'error',
        theme: 'bubble',
        duration: 5000
      })
    }
    if (code === 401) {
      const message = error.response.data.error
      store.dispatch('_logoutsession')
      
    }
    if(code == 502){
      const message = error.response.data.message
      if (confirm(message)) {
        store.dispatch('_logoutsession')
      } else {
        store.dispatch('_logoutsession')
      }
     
    
    }
  })

  // Set baseURL to something different
  // eslint-disable-next-line no-console

  /** For UI developers with no local API **/
  /* api.setBaseURL(  process.env.baseUrl ); */

  /** For production */
  api.setBaseURL(process.env.baseUrl)
  // Inject to context as $api
  inject('api', api)
}
