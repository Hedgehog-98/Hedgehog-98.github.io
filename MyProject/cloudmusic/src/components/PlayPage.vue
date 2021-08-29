<template>
  <section class="play-page">
    <button @click="$emit('toggle-show-play-page',false)">play-page</button>
  </section>
</template>

<script>
export default {
  name: "PlayPage",
};
</script>

<style lang="less" scoped>
 .play-page {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    background-color: rgba(255, 0, 0, 0.5);
  }
</style>>
