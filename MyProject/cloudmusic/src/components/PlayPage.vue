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
    <button @click="$emit('toggle-show-play-page', false)" class="back-btn"></button>

    <!-- 主体内容 -->
    <section class="center-content">
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
          <img
            :style="{
              backgroundImage: `url(${
                currentSong.song ? currentSong.picUrl : currentSong.al.picUrl
              }?imageView=1&type=webp&thumbnail=246x0)`,
            }"
            class="thumb"
            @click="showPlayLyric = true"
          />
          <img v-if="!playing" src="../assets/imgs/播放-big.png" alt="" class="play-btn" @click="$emit('toggle-play-state')" >
          
        </section>
      </section>
      <!-- <section class="play-lyric"></section> -->
      <Lyric
        v-else
        @toggle-show-play-lyric="showPlayLyric = $event"
        :currentSong="currentSong"
        :currentSongId="currentSongId"
        :playing="playing"
        :currentTime="currentTime"
        :durationTime="durationTime"
        :currentPlayList="currentPlayList"
      >
      </Lyric>
    </section>

    <!-- 进度条 -->
    <section class="progress">
      <input
        type="range"
        :max="durationTime"
        step="0.5"
        v-model="value"
        @change="progressChange"
        @input="progressInput"
      />
      <span
        class="handle-ipt"
        :style="{ width: (value / durationTime) * 100 + '%' }"
      ></span>
    </section>

    <!-- 控件 -->
    <section class="controls">
      <div class="box">
        <span class="mode" @click="$emit('toggle-play-mode')"></span>
        <span class="prev" @click="$emit('prev-song')"></span>
        <!-- 图标可以用字体图标 -->
        <span class="box" @click="$emit('toggle-play-state')">
          <img src="../assets/imgs/播放1.png" v-if="!playing" alt="" />
          <img src="../assets/imgs/暂停.png" v-else alt="" />
        </span>
        <span class="next" @click="$emit('next-song')"> </span>
        <span
          class="list"
          @click.stop="$emit('toggle-show-play-list', true)"
        ></span>
      </div>
    </section>
  </section>
</template>

<script>
import Lyric from "@/components/Lyric.vue";
export default {
  name: "PlayPage",
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
      showPlayLyric: false,
      value: this.currentTime,
      inputing: false,
    };
  },
  components: {
    Lyric,
  },
  watch: {
    currentTime(n) {
      if (!this.inputing) {
        this.value = n;
      }
    },
  },
  methods: {
    // 拖动的时候不改变value的值，把事件传给App
    progressChange(event) {
      this.inputing = false;
      // console.log(event.target.value);
      this.$emit("current-time-change", event.target.value);
    },
    progressInput() {
      this.inputing = true;
    },
  },
};
</script>

<style lang="less" scoped>
// -------公共样式--------------
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
.control-span {
  background-position: center center;
  background-size: contain;
}
// ----------------------------
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
  .back-btn{
    width: 40px;
    height: 32px;
    outline: none;
    border: none;
    display: block;
    background-image: url('../assets/imgs/左箭头.png');
    background-repeat: no-repeat;
    background-color: rgb(202, 188, 188);
    border-radius: 0 10px 10px 0;
  }
  .center-content {
    height: 60vh;
    margin: 4vh 0 10vh;
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
        width: 70vw;
        height: 70vw;
        margin: 5px auto 0;
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
          &.play-btn{
            position: absolute;
            top: 50%;
            left: 50%;
            width: 48px;
            height: 48px;
            margin-top: -24px;
            margin-left: -24px;
          }
        }
        &.playing {
          animation-play-state: running;
        }
      }
    }
  }

  .progress {
    position: relative;
    width: 88vw;
    height: 4px;
    // margin: 15% auto 5%;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 10px;
    input {
      position: absolute;
      top: 0px;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
    .handle-ipt {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      background: orangered;
      border-radius: inherit;
      &::after {
        content: "";
        position: absolute;
        top: 0px;
        right: 0;
        display: block;
        width: 8px;
        height: 8px;
        margin-right: -5px;
        margin-top: -2px;
        background-color: orange;
        border-radius: 50%;
      }
    }
  }
  .controls {
    padding: 10% 8%;
    div.box {
      display: flex;
      justify-content: space-around;
      color: #fff;
      background:linear-gradient(45deg,rgb(75, 63, 63),rgb(211, 202, 202));
      border-radius: 25px;
      span {
        display: inline-block;
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        // border: 1px solid #f00;
        &.mode {
          background-image: url("../assets/imgs/播放列表.png");
          .control-span();
        }
        &.prev {
          background-image: url("../assets/imgs/上一首.png");
          .control-span();
        }

        // 播放暂停
        &.box {
          .control-span();
          display: flex;
          justify-content: space-between;
          align-items: center;
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        &.next {
          background-image: url("../assets/imgs/下一首.png");
          .control-span();
        }
        &.list {
          background-image: url("../assets/imgs/播放列表1.png");
          .control-span();
        }
      }
    }
  }
  .play-lyric {
    position: relative;
    padding-top: 20vw;
    // width: 100%;
    height: 60vh;
    z-index: 0;
    // background-color: rgba(0,0,0,.3);
    // background-color: #fefeff96;
    // border-radius: 45% 45% 5% 5%;
  }
}
</style>>
