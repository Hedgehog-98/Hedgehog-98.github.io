<template>
  <div id="app">
    <Header v-if="$route.meta.isShowNavBar"></Header>
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
        enter-active-class="animate__animated animate__slideInRight"
        leave-active-class="animate__animated animate__slideOutLeft"
      >
        <router-view 
          @change-current-song="changeCurrentSong"
          @change-current-play-list="changeCurrentPlayList"
          :currentSongId="currentSong ? currentSong.id : null"
          :playing="playing"
          style="position:absolute;top: 0; left: 0; width:100%; height:100%;"
        />
      </transition>
    </section>
    <!-- 加了动画就不设高度或者display:none，没加动画要设高度 -->
    <audio
      :src="currentSongUrl"
      controls="controls"
      style=" margin-bottom: 50px"
      autoplay
      ref="audio"
      @playing="playing = true"
      @pause="playing = false"
      @timeupdate="timeUpdate"
      @durationchange="durationChange"
    ></audio>

    <PlayBar
      v-if="currentSong"
      :currentSong="currentSong"
      :currentPlayList="currentPlayList"
      @toggle-play-state="togglePlayState"
      :playing="playing"
      :currentTime="currentTime"
      :durationTime="durationTime"
      @change-current-song="changeCurrentSong"
    ></PlayBar>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import PlayBar from "@/components/PlayBar.vue";
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
    PlayBar,
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

<style lang="less">
#app{
  width: 100vw;
  height: 100vh;
  
}
#nav {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  height: 40px;
  // border-bottom: 1px solid #ccc;
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
  height:calc(100vh - 84px - 40px);
  
}
</style>
