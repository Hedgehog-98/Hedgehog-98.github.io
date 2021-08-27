<template>
  <div id="hot">
    <!-- <NewSongItem @change-current-song="$emit('change-current-song',$event)"></NewSongItem> -->
    <div class="hot-bg">
      <div class="hot-bg-icon"></div>
      <div class="hot-time">更新日期: <span>08月26日</span></div>
    </div>
  </div>
</template>

<script>
// import NewSongItem from '@/components/NewSongItem.vue'
export default {
  name: "Hot",
  components: {
    // NewSongItem,
  },
};
</script>

<style lang="less" scoped>
#hot {
  .hot-bg {
    position: relative;
    display: flex;
    height: 146px;
    padding-left: 20px;
    justify-content: center;
    flex-direction: column;

    background-color: #aa5945;
    // &::after {
    //   content: " ";
    //   position: absolute;
    //   left: 0;
    //   top: 0;
    //   right: 0;
    //   bottom: 0;
    //   z-index: 1;
    //   background-color: rgba(0, 0, 0, 0.2);
    // }
    .hot-bg-icon {
      width: 142px;
      height: 67px;
      line-height: 67px;
      background: url("https://s3.music.126.net/mobile-new/img/index_icon_2x.png")
        no-repeat;
      background-size: 166px 97px;
      background-position: -24px -30px;
    }
    .hot-time {
      margin-top: 10px;
      font-size: 12px;
      color: #ffffcc;
    }
    
  }
}
</style>
