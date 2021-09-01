<template>
  <div class="play-lyric" @click="$emit('toggle-show-play-lyric', false)">
    <div class="box" ref="box">
      <ul class="wrapper" ref="wrapper">
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
    playing: Boolean,
    currentTime: Number,
    durationTime: Number,
    currentPlayList: Array,
    lyric:Array,
  },
  // data() {
  //   return {
  //     lyric: [],
  //   };
  // },
  
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
    },
  },
  methods: {
    // getLyricData() {
    //   this.axios.get("http://apis.netstart.cn/music/lyric?id=1873049720").then(
    //   // this.axios
    //   //   .get("http://apis.netstart.cn/music/lyric", {
    //   //     params: {
    //   //       id,
    //   //     },
    //   //   })
    //   //   .then(
    //       (res) => {
    //         console.log(res);
    //         var lyric = res.data.lrc.lyric;
    //         // console.log(lyric);
    //         var arr = lyric
    //           .split("\n")
    //           .filter((s) => s)
    //           .map((s) => {
    //             var text = s.replace(/^\[\d{2}:\d{2}\.\d+\]/i, "");
    //             var timeStr = s.replace(text, "").replace(/(^\[|\]$)/gi, "");
    //             // console.log(timeStr);
    //             var timeArr = timeStr.split(":").map((item) => Number(item));
    //             var time = timeArr[0] * 60 + timeArr[1];
    //             return { text, time };
    //           });
    //         // console.log(arr);
    //         this.lyric = arr;
    //       },
    //       (err) => console.log(err)
    //     );
    // },
  },
  watch: {
    currentTime() {
      // console.log(this.$refs.wrapper);
      if (this.lyric) {
          this.$refs.wrapper.style.top = -this.ulMarginTop + "px";
      }

      // this.$refs.box.scrollTop = this.ulMarginTop ;
      // console.log(this.$refs.box.scrollTop,this.$refs.box.scrollHeight,this.$refs.box.offsetHeight);
      // console.log(this.$refs.wrapper.scrollTop,this.$refs.wrapper.scrollHeight,this.$refs.wrapper.offsetHeight);
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
    left: 0;
    height: 100%;
    width: 100%;
    overflow-y: auto;
    display: flex;
     justify-content: center;
    align-content: center;
    background-color: #a4c3c7;
    background-color: #bbf3f8e5;
    .wrapper {
      position: absolute;
      top: 0;
      left: 0;
      padding: 10% 5% 10%;
      width: 100%;
      // background-color: pink;
      transform: translateY(80px);
      transition: all .5s;
      li {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        line-height: 30px;
        .text {
          width: 100%;
          transition: all .8s;
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