<template>
  <h2 class="home-title">
    <slot></slot>
  </h2>
</template>

<script>
export default {
  name: 'HomeTitle',
  
}
</script>

<style scoped lang="less">
.home-title{
  font-size: 17px;
  line-height: 1;
  margin:  14px 0  ;
  padding: 0 0 0 9px;
  border-left: 2px solid #D33A31;
}
</style>
