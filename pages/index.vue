<template>

        <v-img
  lazy-src="https://picsum.photos/id/11/10/6"
  max-height="1000"
  max-width="100%"
  src="https://digital.vodacom.co.tz/tube-api/api/v1/videos/643d42442e0d7434b8bdb286/image"
></v-img>
     
</template>

<script>
const gradients = [
  ['#222'],
  ['#42b3f4'],
  ['red', 'orange', 'yellow'],
  ['purple', 'violet'],
  ['#00c6ff', '#F0F', '#FF0'],
  ['#f72047', '#ffd200', '#1feaea']
]
export default {
  name: 'IndexPage',
  data () {
    return {
      width: 2,
      radius: 10,
      padding: 8,
      lineCap: 'round',
      gradient: gradients[5],
      value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
      gradientDirection: 'top',
      gradients,
      fill: false,
      type: 'trend',
      autoLineWidth: false
    }
  },
  head () {
    return {
      title: 'Home'
    }
  }
}
</script>
