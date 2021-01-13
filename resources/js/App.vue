<template>
  <div id="app">
    <component :is="layout">
      <!-- <notifications group="foo" /> -->
      <router-view></router-view>
    </component>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    layout() {
      const layout = this.$route.meta.layout
      return layout + '-layout'
    }
  },
}
</script>