<template>
  <div class="play-lyric" @click="$emit('toggle-show-play-lyric', false)">
    <div class="box" ref="box">
      <ul class="wrapper" ref="wrapper" v-show="lyric.length">
        <li v-for="(item, index) in lyric" :key="index" ref="li" class="li">
          <span class="text" :class="{ active: currentLyricIndex === index }">{{
            item.text
          }}</span>
          <!-- <span>{{currentLyricIndex}}{{index}}</span> -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Lyric",
  props: {
    currentSong: Object,
    currentSongId: Number,
    playing: Boolean,
    currentTime: Number,
    durationTime: Number,
    currentPlayList: Array,
  },
  data() {
    return {
      lyric: [],
    };
  },

  computed: {
    // 查找当前的播放的下标
    currentLyricIndex() {
      var i = this.lyric.findIndex((item) => item.time > this.currentTime);
      var currentLyricIndex = i !== -1 ? i - 1 : this.lyric.length - 1;
      // console.log(this.lyric[currentLyricIndex].text);
      // return this.lyric[currentLyricIndex].text;
      return currentLyricIndex;
    },

    // 计算滚动的距离
    ulMarginTop() {
      var mt = [...document.querySelectorAll("ul .li")]
        .slice(0, this.currentLyricIndex)
        .reduce((total, item) => {
          return total + item.offsetHeight;
        }, 0);
      // console.log(mt);
      return mt;
      // 开始和结束不滚动，到中间才开始滚动 判断margin是否大于盒子的高度 400
      // mt = mt > 200 ? mt - 200 : 0 ;
      // mt = mt < this.$refs.box.offsetHeight - 200 ? this.$refs.box.offsetHeight - 200 : mt;
      // return mt;
    },
  },
  created() {
    // 获取歌词
    this.getLyricData(this.currentSong.id);
  },
  methods: {
    getLyricData(id) {
      // this.axios.get("http://apis.netstart.cn/music/lyric?id=1873049720").then(
      this.axios
        .get("http://apis.netstart.cn/music/lyric", {
          params: {
            id,
          },
        })
        .then(
          (res) => {
            // console.log(res);
            var lyric = res.data.lrc.lyric;
            // console.log(lyric);
            var arr = lyric
              .split("\n")
              .filter((s) => s)
              .map((s) => {
                var text = s.replace(/^\[\d{2}:\d{2}\.\d+\]/i, "");
                var timeStr = s.replace(text, "").replace(/(^\[|\]$)/gi, "");
                // console.log(timeStr);
                var timeArr = timeStr.split(":").map((item) => Number(item));
                var time = timeArr[0] * 60 + timeArr[1];
                return { text, time };
              });
            // console.log(arr);
            this.lyric = arr;
          },
          (err) => console.log(err)
        );
    },
  },
  watch: {
    currentSongId(n) {
      // 置空后高度为0 marginTop也为零
      this.lyric = [];
      this.getLyricData(n);
    },
    currentTime() {
      // console.log(111);
      this.$nextTick(() => {
        if (this.$refs.wrapper) {
          // this.$refs.wrapper.style.marginTop = -this.ulMarginTop + "px";
          this.$refs.wrapper.style.top = -this.ulMarginTop + "px";
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.play-lyric {
  position: absolute;
  top: 20px;
  left: 0;
  height: 60vh;
  width: 100%;
  padding: 20vh 0 0;
  overflow: hidden;
  z-index: -1;
  .box {
    position: absolute;
    top: 0;
    left: 50%;
    height: 100%;
    width: 90%;
    margin-left: -45%;
    display: flex;
    justify-content: center;
    align-content: center;
    background-color: #bbf3f8e5;
    background: rgba(0, 0, 0, 0);
    background-color: #fefeff96;
    border-radius: 15px 0  0 15px;
    overflow-y: auto;
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
    .wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding: 0 10px;
      transform: translateY(150px);
      transition: all 0.5s;
      li {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        line-height: 1.8;
        .text {
          width: 100%;
          transition: all 0.3s;
          color: #111;
          &.active {
            color: #b9300e;
            font-size: 20px;
          }
        }
      }
    }
  }
}
</style>