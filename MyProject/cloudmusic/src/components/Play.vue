<template>
  <div class="play-bar">
    <PlayBar
      :currentPlayList="currentPlayList"
      :currentSong="currentSong"
      :currentTime="currentTime"
      :durationTime="durationTime"
      :playing="playing"
      @toggle-play-state="$emit('toggle-play-state')"
      @toggle-show-play-list="showPlayList = $event"
      @toggle-show-play-page="showPlayPage = $event"
    />
    <PlayList
      v-if="showPlayList"
      @change-current-song="$emit('change-current-song', $event)"
      @toggle-show-play-list="showPlayList = $event"
      :currentSong="currentSong"
      :playing="playing"
      :currentPlayList="currentPlayList"
    />
    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__zoomIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <!-- 播放页面 -->
      <PlayPage v-if="showPlayPage" @toggle-show-play-page="showPlayPage = $event"/>
    </transition>
  </div>
</template>

<script>
import PlayBar from "@/components/PlayBar";
import PlayPage from "@/components/PlayPage";
import PlayList from "@/components/PlayList";
export default {
  name: "Play",
  components: {
    PlayBar,
    PlayPage,
    PlayList,
  },
  props: {
    currentSong: Object,
    playing: Boolean,
    currentTime: Number,
    durationTime: Number,
    currentPlayList: Array,
  },
  data() {
    return {
      showPlayList: false,
      showPlayPage: false,
    };
  },
};
</script>

<style lang="less" scoped>
</style>>
