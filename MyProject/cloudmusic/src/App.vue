<template>
  <div id="app">
    <Header v-if="$route.meta.isShowNavBar" class="header"></Header>
    <ul id="nav" v-if="$route.meta.isShowNavBar">
      <li><router-link to="/">推荐音乐</router-link></li>
      <li><router-link to="/hot">热歌榜</router-link></li>
      <li><router-link to="/search">搜索</router-link></li>
      <!-- <router-link to="/playList">playList</router-link>  -->
    </ul>
    <!-- 路由加动画过渡效果 out-in旧的先走走完再到新的
    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__slideInRight"
      leave-active-class="animate__animated animate__slideOutLeft"
      mode="out-in"
    >
      <router-view
        @change-current-song="changeCurrentSong"
        @change-current-play-list="changeCurrentPlayList"
        :currentSongId="currentSong ? currentSong.id : null"
        :playing="playing"
      />
    </transition> -->
    <section class="routes-trasition">
      <transition
        name="custom-classes-transition"
        enter-active-class="animate__animated animate__zoomIn"
        leave-active-class="animate__animated animate__fadeOut"
      >
        <keep-alive>
          <router-view
            @change-current-song="changeCurrentSong"
            @change-current-play-list="changeCurrentPlayList"
            :currentSongId="currentSong ? currentSong.id : null"
            :playing="playing"
            class="router-view"
          />
        </keep-alive>
      </transition>
    </section>
    <!-- 加了动画就不设高度或者display:none，没加动画要设高度 -->
    <audio
      :src="currentSongUrl"
      controls="controls"
      style="margin-bottom: 50px"
      autoplay
      ref="audio"
      @playing="playing = true"
      @pause="playing = false"
      @timeupdate="timeUpdate"
      @durationchange="durationChange"
      class="audio"
    ></audio>

    <Play
      v-if="currentSong"
      :currentSong="currentSong"
      :currentPlayList="currentPlayList"
      @toggle-play-state="togglePlayState"
      :playing="playing"
      :currentTime="currentTime"
      :durationTime="durationTime"
      @change-current-song="changeCurrentSong"
      @prev-song="prevSong"
      @next-song="nextSong"
      @toggle-play-mode="togglePlayMode"
    ></Play>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import Play from "@/components/Play.vue";
export default {
  data() {
    return {
      currentSong: null,
      playing: false,
      currentTime: 0,
      durationTime: 0,
      currentPlayList: [],
    };
  },
  components: {
    Header,
    Play,
  },
  watch: {
    currentTime(n) {
      // console.log(n ,'-------',this.durationTime);
      if (n === this.durationTime) {
        console.log(this.currentSong.id);
        this.nextSong(); //播放下一首歌
        console.log(this.currentSong.id);
      }
    },
  },
  computed: {
    currentSongUrl() {
      if (this.currentSong) {
        return `https://music.163.com/song/media/outer/url?id=${this.currentSong.id}.mp3`;
      } else {
        return null;
      }
    },
  },
  methods: {
    changeCurrentSong(song) {
      // console.log(song);
      this.currentSong = song;
      // console.log(11);
    },
    // 改变当前歌曲的播放列表
    changeCurrentPlayList(currentList) {
      this.currentPlayList = currentList;
    },
    togglePlayState() {
      if (this.playing) {
        // 暂停
        this.$refs.audio.pause();
      } else {
        // 播放
        this.$refs.audio.play();
      }
    },
    // 上一首
    prevSong() {
      // console.log("上");
      var index = this.currentPlayList.findIndex((item) => {
        return item.id === this.currentSong.id;
      });
      // console.log(index);
      index--;
      // 判断边界
      index = index <= 0 ? this.currentPlayList.length - 1 : index;
      // console.log(index);
      this.changeCurrentSong(this.currentPlayList[index]);
    },
    // 下一首
    nextSong() {
      // console.log("下一首");
      var index = this.currentPlayList.findIndex((item) => {
        return this.currentSong.id === item.id;
      });
      // console.log(index);
      index++;
      // 判断边界
      index = index >= this.currentPlayList.length - 1 ? 0 : index;
      // console.log(index);
      this.changeCurrentSong(this.currentPlayList[index]);
    },
    // 播放模式
    togglePlayMode() {},

    // audio音频事件
    timeUpdate(event) {
      // 获取音频当前时间
      // console.log(event.target.currentTime);
      this.currentTime = event.target.currentTime;
    },
    durationChange(event) {
      // 获取音频的总时间
      // console.log(event.target.duration);
      this.durationTime = event.target.duration;
    },
  },
};
</script>

<style lang="less" scope>
* {
  box-sizing: border-box;
}

// #app{
//   width: 100vw;
//   height: 100vh;
// }
.header {
  position: fixed;
  top: 0px;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 80px;
}
#nav {
  position: fixed;
  top: 80px;
  left: 0;
  z-index: 999;
  width: 100%;
  // margin-top: 80px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  height: 40px;
  // border-bottom: 1px solid #ccc;
  background-color: #fff;
  box-shadow: 0 -1px 1px 0px rgba(200, 200, 200, 0.5) inset;
  li {
    // background-color: pink;
    flex: 1;
    a {
      text-decoration: none;
      color: #333;
      padding: 0 12px;
      font-size: 15px;
      padding-bottom: 8px;
      &.router-link-exact-active {
        border-bottom: 2px solid #dd001b;
        color: #dd001b;
      }
    }
  }
}
// 相对定位
.routes-trasition {
  position: relative;
  top: 0;
  left: 0;
  height: 100vh;
}
.router-view {
  position: absolute;
  top: 0px;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
.audio {
  position: absolute;
  bottom: -10px;
  left: 0;
  z-index: 100000;
  height: 50px;
}
</style>
