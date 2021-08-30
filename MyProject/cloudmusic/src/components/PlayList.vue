<template>
  <section class="play-list">
    <!-- 遮罩 淡入-->
    <div
      class="mask animate__animated animate__fadeIn"
      @click.stop="$emit('toggle-show-play-list',false)"
    ></div>
    <!-- 播放列表轮播卡片 及animate上滑动画 -->
    <div class="swiper">
      <div class="card animate__animated animate__slideInUp">
        <ul class="list">
          <NewSongItem
            v-for="(item, index) in currentPlayList"
            :key="item.id"
            :item="item"
            :currentSongId="currentSong.id"
            :playing="playing"
            @change-current-song="$emit('change-current-song', $event)"
            :class="{ lt3: index < 3 }"
          >
            <span>{{ (index + 1).toString().padStart(2, "0") }}</span>
          </NewSongItem>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import NewSongItem from "@/components/NewSongItem.vue";
export default {
  name: "PlayList",
  props: {
    currentSong: Object,
    playing: Boolean,
    currentPlayList: Array,
  },
  components: {
    NewSongItem,
  },
};
</script>

<style lang="less" scoped>
.play-list {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1999;
    height: 100vh;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .swiper {
    width: 100%;
    height: 60vh;
    position: absolute;
    left: 0;
    bottom: 10px;
    z-index: 1999;
    padding: 0 10px;
    .card {
      // background-color: rgba(255, 0 ,0 ,.5);
      background-color: #fefeff;
      width: 100%;
      height: 100%;
      padding: 15px 10px 15px 0;
      border-radius: 15px;
      ul.list {
        height: 100%;
        overflow: auto;
        // 滚动条宽高和背景 宽高是横竖滚动条的尺寸
        &::-webkit-scrollbar {
          width: 5px;
          height: 15px;
          background-color: #ccc;
        }
        // 滚动条轨道，内阴影和圆角
        &::-webkit-scrollbar-track {
          border-radius: 3px;
          // -webkit-box-shadow:inset 0 0  0 3px  rgb(14, 14, 197);
          // background-color: skyblue;
          background: linear-gradient(pink, skyblue, lightgreen);
        }
        // 定义滑块 内阴影和圆角
        &::-webkit-scrollbar-thumb {
          border-radius: 2px;
          // -webkit-box-shadow:inset 0 0  0 3px  rgb(14, 197, 54);
          // background-color: pink;
          // background: linear-gradient(pink,skyblue);
          background-color: tomato;
        }
      }
    }
  }
}
</style>>
