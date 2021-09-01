<template>
  <!-- <div
    v-if="currentSong.song"
    class="play-bar"
    
    :class="{ playing: playing }"
  >
    <img
      :src="`${currentSong.picUrl}?imageView=1&type=webp&thumbnail=60x0`"
      alt=""
    />
    <div class="title">
      <h3>{{ currentSong.name }}</h3>
      <span>{{ currentSong.song.artists[0].name }}</span>
    </div>
    <div class="progress" @click="$emit('toggle-play-state')">
      <canvas height="40" width="40" ref="canvas"></canvas>
      <div class="icon" :class="[playing ? 'pause' : 'play']"></div>
    </div>
    <button class="list-btn">列表</button>
  </div>
  <div
    v-else
    class="play-bar"
   
    :class="{ playing: playing }"
  >
    <img
      :src="`${currentSong.al.picUrl}?imageView=1&type=webp&thumbnail=60x0`"
      alt=""
    />
    <div class="title">
      <h3>{{ currentSong.name }}</h3>
      <span>{{ currentSong.ar[0].name }}</span>
    </div>

    <div class="progress"  @click="$emit('toggle-play-state')">
      <canvas height="40" width="40" ref="canvas"></canvas>
       <div class="icon" :class="[playing ? 'pause' : 'play']"></div>
    </div>
    <button class="list-btn">列表</button>
  </div> -->
  <!-- <div class="play-bar"> -->
    <section class="bar" :class="{ playing: playing }"  @click="$emit('toggle-show-play-page',true)">
      <img
        :src="`${
          currentSong.song ? currentSong.picUrl : currentSong.al.picUrl
        }?imageView=1&type=webp&thumbnail=60x0`"
        alt=""
      />
      <div class="title">
        <h3>{{ currentSong.name }}</h3>
        <span>{{
          currentSong.song
            ? currentSong.song.artists[0].name
            : currentSong.ar[0].name
        }}</span>
      </div>
      <div class="progress" @click.stop="$emit('toggle-play-state')">
        <canvas height="40" width="40" ref="canvas"></canvas>
        <div class="icon" :class="[playing ? 'pause' : 'play']"></div>
      </div>
      <!-- 列表 -->
      <div class="list-btn " @click.stop="$emit('toggle-show-play-list',true)">
        <!-- <img src="../assets/imgs/播放列表.png" alt=""> -->
      </div>
    </section>
  <!-- </div> -->
</template>

<script>

export default {
  name: "PlayBar",
  props: {
    currentSong: Object,
    playing: Boolean,
    currentTime: Number,
    durationTime: Number,
    currentPlayList: Array,
  },
  computed: {
    // 计算进度条百分比
    progressPersent() {
      return this.currentTime / this.durationTime;
    },
  },
  watch: {
    progressPersent(n) {
      // 画环形进度条
      let context = this.$refs.canvas.getContext("2d");
      // 清除画布
      context.clearRect(0, 0, 40, 40);

      context.beginPath(); //开始路径要在画弧线之前
      context.arc(
        20,
        20,
        18,
        (Math.PI / 180) * (0 - 90),
        (Math.PI / 180) * (360 * n - 90)
      );
      context.lineWidth = 3;
      context.strokeStyle = "#d43c33";
      context.stroke();

      context.beginPath(); //开始路径要在画弧线之前
      // 画弧线
      context.arc(
        20,
        20,
        18,
        (Math.PI / 180) * (360 * n - 90),
        (Math.PI / 180) * (360 - 90)
      );
      context.lineWidth = 3;
      context.strokeStyle = "#ccc";
      // 描边
      context.stroke();
    },
  },
};
</script>

<style lang="less" scoped>
// 动画时间
.animate__animated {
  animation-duration: 0.3s;
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
// .play-bar {
  .bar {
    position: relative;
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    padding: 0 15px;
    // background-color: skyblue;
    // background-color: rgba(0, 0, 0, 0.5);
    background-color: #eee;
    box-shadow: 0 -1px 2px 0 rgb(201, 56, 56);
    // margin-bottom: 10px;
    img {
      width: 40px;
      height: 40px;
      margin: 5px 0;
      border-radius: 50%;
      animation: rotate 3s linear infinite;
      animation-play-state: paused;
      transition: All 0.3s;
    }
    .title {
      flex: 1;
      margin: 0 15px;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      h3 {
        display: inline-block;
        font-size: 14px;
        font-weight: normal;
        color: #282828;
        &::after {
          content: "-";
          margin: 0 3px;
        }
      }
      span {
        font-size: 12px;
        color: #333;
      }
    }
    &.playing {
      img {
        animation-play-state: running;
        box-shadow: 0 0 3px 1px #f00;
        // filter: brightness(120%);
      }
    }
    .list-btn {
      border: 3px solid #ccc;
      margin: 0 5px;
      width: 40px;
      height: 40px;
      // border-radius: 50%;
      
    }

    // 环形进度条
    .progress {
      position: relative;
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      canvas {
        position: absolute;
        top: 0;
        left: 0;
        // z-index: -1;
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
      .icon {
        width: 15px;
        height: 15px;
        &.play {
          margin-left: 8px;
          border-top: 8px solid transparent;
          border-left: 12px solid #000;
          border-bottom: 8px solid transparent;
        }
        &.pause {
          // background-color: red;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          &::before,
          &::after {
            content: "";
            display: block;
            width: 20%;
            height: 80%;
            background-color: #000;
          }
        }
      }
    }
  }
  
 
// }
</style>