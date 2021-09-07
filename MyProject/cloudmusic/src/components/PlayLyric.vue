<template>
  <div class="play-lyric" @click="$emit('toggle-show-play-lyric', false)">
    <div class="box" ref="box">
      <!--  -->
      <ul class="wrapper" ref="wrapper" :style="{marginTop :-scrollH + 'px'}">
        <li v-for="(item, index) in parseLyric" :key="index" ref="li">
          <!-- <span class="text">{{ item.text }}</span> -->
          <span
            class="text"
            :class="{
              active: currentLyricIndex === index,
            }"
            >{{ item.text }}</span
          >
        </li>
      </ul>
    </div>
  </div>
  <!-- <div class="play-lyric" @click="$emit('toggle-show-play-lyric', false)">
    <div class="box" ref="box">
      <ul class="wrapper" ref="wrapper" v-if="lyric.length">
        <li v-for="(item, index) in lyric" :key="index" ref="li" class="li">
          <span
            class="text"
           
            :class="{
              active: currentLyricIndex === index
              
            }"
            >{{ item.text }}</span
          >
        </li>
      </ul>
      <div v-else class="cunyinyue">纯音乐</div>
    </div>
  </div> -->
</template>

<script>
export default {
  name: "PlayLyric",
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
      lisHeight:[],
      scrollH:0,
    };
  },
  computed: {
    // 解析歌词数据
    parseLyric() {
      if (this.lyric.length != 0) {
        return this.lyric
          .split("\n")
          .filter((s) => s)
          .map((s) => {
            var text = s.replace(/^\[\d{2}:\d{2}\.\d{0,3}\]/i, "");
            var timeStr = s.replace(text, "").replace(/(^\[|\]$)/g, "");
            var timeArr = timeStr.split(":").map((item) => Number(item));
            var time = timeArr[0] * 60 + timeArr[1];
            return { text, time };
          });
      } else {
        return [];
      }
    },
    // 获取当前歌词下标
    currentLyricIndex() {
      var i = this.parseLyric.findIndex((item) => item.time > this.currentTime);
      var currentLyricIndex = i !== -1 ? i - 1 : this.parseLyric.length - 1;
      return currentLyricIndex;
    },
  },
  watch: {
    // 监听id变化
    currentSongId(id) {
     // 置空后高度为0 marginTop也为零
      this.lyric = [];
      // this.$refs.wrapper.style.transition ="all 0s";
      this.getPlayLyricData(id);
    },
    // 监听parseLyric的变化
    parseLyric() {
      //  确保dom更新
      this.$nextTick(() => {
        // 获取所有li dom元素
        var lis = this.$refs.wrapper.querySelectorAll("li");
        // 获取到所有li 的高度
        this.lisHeight = [...lis].map((item) => item.offsetHeight);
      });
    },
    // 监听当前歌词下标变化
    currentLyricIndex(index){
      var lyricHeight = this.lisHeight.slice(0,index).reduce(function(total,item){
        return total + item;
      },0);
      // 首尾不滚动，大于.box的一半才滚动
      lyricHeight = lyricHeight > 200 ? lyricHeight -this.$refs.box.offsetHeight/2 : 0;
      lyricHeight = lyricHeight > 200 && lyricHeight > this.$refs.wrapper.offsetHeight - this.$refs.box.offsetHeight ? this.$refs.wrapper.offsetHeight - this.$refs.box.offsetHeight : lyricHeight;
      // console.log(lyricHeight);
      // 防止播完后回滚问题
      if(lyricHeight >= this.$refs.wrapper.offsetHeight){
        this.$refs.wrapper.style.transition ="all 0s";
      }else{
        this.$refs.wrapper.style.transition ="all 0.5s";
      }
      this.scrollH = lyricHeight;
      
    }
  },
  created() {
    this.getPlayLyricData(this.currentSongId);
  },
  methods: {
    //获取歌词
    getPlayLyricData(id) {
      // "http://apis.netstart.cn/music/lyric"
      this.axios
        .get("http://apis.netstart.cn/music/lyric", {
          params: { id },
        })
        .then(
          (res) => {
            this.lyric = res.data.lrc.lyric;
          },
          (err) => console.log(err)
        );
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
  // padding: 20vh 0 0;
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
    border-radius: 15px;
    overflow-y: auto;
      background-color: skyblue;
    .wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      // height: 100%;
      padding: 0 10px;
      // transform: translateY(150px);
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
          // color: #111;
          color: #fff;
          &.active {
            color: #b9300e;
            font-size: 20px;
          }
        }
      }
    }
    .cunyinyue {
      font-size: 18px;
      align-self: center;
      color: #fff;
    }
  }
}
</style>