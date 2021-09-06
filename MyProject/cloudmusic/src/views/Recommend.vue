<template>
  <div class="play-list" v-if="detail">
    <RecommendHead :detail="detail" class="recommend-head"></RecommendHead>

    <h3 class="title">歌曲列表</h3>
    <NewSongItem
      v-for="(item, index) in detail.tracks"
      :key="item.id"
      @change-current-song="
        $emit('change-current-song', $event);
        $emit('change-current-play-list', detail.tracks);
      "
      :item="item"
      :currentSongId="currentSongId"
      :playing="playing"
      :class="{ lt3: index < 3 }"
      :style="{ background: '#fefefe' }"
    >
      <span>{{ index + 1 }}</span>
    </NewSongItem>
  </div>
</template>

<script>
import NewSongItem from "@/components/NewSongItem";
import RecommendHead from "@/components/RecommendHead.vue";
export default {
  name: "Recommend",
  components: {
    NewSongItem,
    RecommendHead,
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
            // console.log(this.detail);
          },
          (err) => {
            console.log(err);
          }
        );
    },
  },
  watch: {
    $route(to) {
      // 变化 就重新请求
      this.detail = this.getPlayListData(to.query.id);
    },
  },
};
</script>

<style lang="less" scoped>
// .play-list {
//   // padding-top: 185px;
// }
// .recommend-head{
//   position: fixed;
//   top: 0px;
//   left: 0;
// }
// 列表内容标题
h3.title {
  // margin-top: 120px;
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