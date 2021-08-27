<template>
  <div class="play-list">
    <!-- 头部区域 -->
    <!-- <PlayListHead :detail="detail">
   </PlayListHead> -->
    <!-- 列表部分 -->
    <!-- <div id="play-list-content" > -->
    <!-- <div class="play-list-content" v-if="detail">
      <h3 class="title">歌曲列表</h3>
      <ul class="content">
        <li v-for="item in detail.tracks" :key="item.id" class="item">
          <div class="left">1</div>
          <div class="song-info">
            <div class="song-name">{{ item.name }}</div>
            <div class="song-msg"></div>
          </div>
          <div class="right">图标</div>
        </li>
      </ul>
    </div> -->
    <h3 class="title">歌曲列表</h3>
    <NewSongItem
      v-for="(item, index) in detail.tracks"
      :key="item.id"
      @change-current-song="$emit('change-current-song', $event)
      $emit('change-current-play-list',detail.tracks)"
      :item="item"
      :currentSongId="currentSongId"
      :playing="playing"
      :class="{lt3 : index < 3}"
    >
      <span>{{ index + 1 }}</span>
    </NewSongItem>
  </div>
</template>

<script>
import NewSongItem from "@/components/NewSongItem";
// import PlayListHead from "@/components/PlayListHead";
export default {
  name: "PlayList",
  components: {
    NewSongItem,
    // PlayListHead,
  },
  props: {
    currentSongId: {
      type: Number,
    },
    playing: Boolean,
  },
  data() {
    return {
      //   detail: null,
      detail: [],
    };
  },
  created() {
    // 获取播放列表数据
    this.getPlayListData(this.$route.query.id);
  },
  computed: {
    CalcDesc() {
      let text = this.detail.description;

      return text.split("\n").slice(0, 3);
    },
  },
  methods: {
    getPlayListData(id) {
      this.axios
        // .get("http://apis.netstart.cn/music/playlist/detail?id=" + "6892176976")
        .get("http://apis.netstart.cn/music/playlist/detail", {
          params: {
            id,
          },
        })
        .then(
          (res) => {
            // console.log(res);
            this.detail = res.data.playlist;
            console.log(this.detail);
          },
          (err) => {
            console.log(err);
          }
        );
    },
  },
};
</script>

<style lang="less" scoped>
// 列表内容标题
h3.title {
  height: 23px;
  line-height: 23px;
  text-align-last: left;
  padding: 0 10px;
  font-size: 12px;
  font-weight: 400;
  color: #666;
  background-color: #eeeff0;
}

// 列表内容
// .play-list-content {
//   .title {
//     height: 23px;
//     line-height: 23px;
//     text-align-last: left;
//     padding: 0 10px;
//     font-size: 12px;
//     font-weight: 400;
//     color: #666;
//     background-color: #eeeff0;
//   }
//   ul.content {
//     list-style: none;

//     li.item {
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       height: 54px;
//       .left,
//       .right {
//         width: 42px;
//       }
//       .song-info {
//         flex: 1;
//         display: flex;
//         flex-wrap: wrap;
//         .song-name {
//           font-size: 17px;
//         }
//       }
//     }
//   }
// }
</style>