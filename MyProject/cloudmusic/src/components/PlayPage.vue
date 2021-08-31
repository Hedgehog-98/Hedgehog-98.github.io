<template>
  <section class="play-page">
    <div
      class="mask"
      :style="{
        backgroundImage: `url(${
          currentSong.song ? currentSong.picUrl : currentSong.al.picUrl
        }?imageView=1&type=webp&thumbnail=246x0)`,
      }"
    ></div>
    <button @click="$emit('toggle-show-play-page', false)">play-page</button>

    <!-- 播放主体  -->
    <section class="music-box" v-if="!showPlayLyric">
      <!-- 指针Pointer -->
      <img
        src="https://s3.music.126.net/mobile-new/img/needle-ab.png"
        alt="指针"
        class="pointer"
        :class="{ paused: !playing }"
      />
      <section class="record" :class="{ playing: playing }">
        <!-- 唱片disc -->
        <img
          src="https://s3.music.126.net/mobile-new/img/disc.png"
          class="disc"
        />
        <!-- 缩略图 -->
        <!-- <img
          :src="
            currentSong.song ? currentSong.picUrl : currentSong.al.picUrl
          "
          alt="缩略图"
          class="thumb"
          @click="$emit('toggle-play-state')"
        /> -->
        <img
          :style="{
            backgroundImage: `url(${
              currentSong.song ? currentSong.picUrl : currentSong.al.picUrl
            }?imageView=1&type=webp&thumbnail=246x0)`,
          }"
          class="thumb"
          @click="showPlayLyric = true"
        />
      </section>
    </section>
    <!-- <section class="play-lyric"></section> -->
    <Lyric
      v-else
      @toggle-show-play-lyric="showPlayLyric = $event"
      :currentSong="currentSong"
      :playing="playing"
      :currentTime="currentTime"
      :durationTime="durationTime"
      :currentPlayList="currentPlayList"
      :lyric="lyric"
    >
    </Lyric>
    <!-- 控件 -->
    <section class="controls">
      <span class="mode" @click="$emit('toggle-play-mode')">模</span>
      <span class="prev" @click="$emit('prev-song')">上</span>
      <span class="play" @click="$emit('toggle-play-state')">播</span>
      <span class="next" @click="$emit('next-song')"> 下</span>
      <span class="list" @click.stop="$emit('toggle-show-play-list', true)"
        >列</span
      >
    </section>
  </section>
</template>

<script>
import Lyric from "@/components/Lyric.vue";
export default {
  name: "PlayPage",
  props: {
    currentSong: Object,
    playing: Boolean,
    currentTime: Number,
    durationTime: Number,
    currentPlayList: Array,
  },
  data() {
    return {
      showPlayLyric: false,
      lyric: [],
    };
  },
  components: {
    Lyric,
  },
  created() {
    // 获取歌词
    // this.getLyricData();
  },
  methods:{
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
  watch:{
    currentTime(){
      this.getLyricData(this.currentSong.id);
    }
  }

};
</script>

<style lang="less" scoped>
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.pos-ab() {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
}
.play-page {
  transition: all 0.8s;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  overflow: hidden;
  background-color: #666;
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    filter: blur(30px) brightness(0.8);
    z-index: -1;
    transform: scale(1.5);
    overflow: hidden;
    background-position: center center;
    background-size: cover;
  }
  .music-box {
    position: relative;
    padding-top: 20vw;
    .pointer {
      position: absolute;
      top: 0;
      left: 46%;
      height: 36vw;
      z-index: 9;
      transform: rotate(-3deg);
      transform-origin: 15px 15px;
      transition: all 0.5s;
      &.paused {
        transform: rotate(-30deg);
      }
    }
    .record {
      position: relative;
      width: 80vw;
      height: 80vw;
      margin: 0 auto;
      animation: rotate 5s linear infinite;
      animation-play-state: paused;
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        &.thumb {
          transform: scale(0.6);
        }
      }
      &.playing {
        animation-play-state: running;
      }
    }
  }
  .controls {
    padding: 20%;
    display: flex;
    justify-content: space-around;
    color: #fff;
  }
  .play-lyric {
    position: relative;
    padding-top: 20vw;
    // width: 100%;
    // height: 60vh;
    background-color: rgba(255, 0, 0, 0.5);
  }
}
</style>>
