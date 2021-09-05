<template>
  <div id="hot">
    <div class="hot-bg">
      <div class="hot-bg-icon"></div>
      <div class="hot-time">
        更新日期: <span>{{ formateUpdateTime }}</span>
      </div>
    </div>
    <!-- 歌曲列表 -->
    <ul class="hot-song-list">
      <HotSongItem
        v-for="(item, index) in tracks"
        :key="item.id"
        @change-current-song="
          $emit('change-current-song', $event);
          $emit('change-current-play-list',tracks)
        "
        :item="item"
        :currentSongId="currentSongId"
        :playing="playing"
        :class="{ lt3: index < 3 }"
      >
        <span>{{ index + 1 }}</span>
      </HotSongItem>
      <!-- <NewSongItem
        v-for="(item, index) in tracks"
        :key="item.id"
        @change-current-song="
          $emit('change-current-song', $event);
          $emit('change-current-play-list', tracks);
        "
        :item="item"
        :currentSongId="currentSongId"
        :playing="playing"
        :class="{ lt3: index < 3 }"
      >
        <span>{{ index + 1 }}</span>
      </NewSongItem> -->
    </ul>
  </div>
</template>

<script>
import HotSongItem from "@/components/HotSongItem.vue";
// import NewSongItem from "@/components/NewSongItem";
export default {
  name: "Hot",
  components: {
    HotSongItem,
    // NewSongItem,
  },
  props: {
    currentSongId: {
      type: Number,
    },
    playing: Boolean,
  },
  data() {
    return {
      updateTime: null,
      tracks: [],
    };
  },

  computed: {
    formateUpdateTime() {
      var time = new Date(this.updateTime);
      var m = time.getMonth() + 1; //月要加1
      var d = time.getDate(); //日
      m = m < 10 ? `0${m}` : m;
      d = d < 10 ? `0${d}` : d;
      return m + "月" + d + "日";
    },
  },
  created() {
    // 获取数据
    this.getHotData();
  },
  methods: {
    getHotData() {
      this.axios
        .get("http://apis.netstart.cn/music/playlist/detail?id=3778678")
        .then(
          (res) => {
            console.log(res);
            this.updateTime = res.data.playlist.trackUpdateTime;
            this.tracks = res.data.playlist.tracks;
          },
          (err) => console.log(err)
        );
    },
  },
};
</script>

<style lang="less" scoped>

#hot {
  padding-top: 120px;
  height: calc(100% - 60px );
  overflow-y: auto;
  .hot-bg {
    position: relative;
    z-index: 1;
    display: flex;
    height: 146px;
    padding-left: 20px;
    justify-content: center;
    flex-direction: column;
    background-image: url(https://s3.music.126.net/mobile-new/img/hot_music_bg_2x.jpg);
    background-position: center;
    background-repeat: no-repeat no-repeat;
    &::after {
      content: " ";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
      background-color: rgba(0, 0, 0, 0.2);
    }
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
