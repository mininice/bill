<template>
  <div>
    <vipx-map
      api-key="24dfbe19fd6f3a6d387ee25a8cba4990"
      placeholder="输入您的地址"
    />
  </div>
</template>

<script>
  import VipxMap from '@components/base/vipx-map/index.vue';

  export default {
    components: {
      VipxMap
    }
  }
</script>
