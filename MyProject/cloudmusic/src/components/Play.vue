<template>
  <div class="play">
    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <PlayBar
        class="play-bar"
        v-show="!showPlayPage"
        :currentPlayList="currentPlayList"
        :currentSong="currentSong"
        :currentTime="currentTime"
        :durationTime="durationTime"
        :playing="playing"
        @toggle-play-state="$emit('toggle-play-state')"
        @toggle-show-play-list="showPlayList = $event"
        @toggle-show-play-page="showPlayPage = $event"
      />
      <!-- <SearchPlayBar
        v-else
        class="play-bar"
        v-show="!showPlayPage"
        :currentPlayList="currentPlayList"
        :currentSong="currentSong"
        :currentTime="currentTime"
        :durationTime="durationTime"
        :playing="playing"
        @toggle-play-state="$emit('toggle-play-state')"
        @toggle-show-play-list="showPlayList = $event"
        @toggle-show-play-page="showPlayPage = $event"
      /> -->
    </transition>
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
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <!-- 播放页面 -->
      <keep-alive>
        <PlayPage
          v-show="showPlayPage"
          @toggle-show-play-page="showPlayPage = $event"
          @toggle-play-state="$emit('toggle-play-state')"
          @toggle-show-play-list="showPlayList = $event"
          @prev-song="$emit('prev-song')"
          @next-song="$emit('next-song')"
          @toggle-play-mode="$emit('toggle-play-mode')"
          @change-current-song="$emit('change-current-song', $event)"
          :currentSong="currentSong"
          :currentSongId="currentSong.id"
          :currentTime="currentTime"
          :durationTime="durationTime"
          :currentPlayList="currentPlayList"
          :playing="playing"
          class="play-page"
          @current-time-change="$emit('current-time-change', $event)"
        />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import PlayBar from "@/components/PlayBar";
// import SearchPlayBar from "@/components/SearchPlayBar";
import PlayPage from "@/components/PlayPage";
import PlayList from "@/components/PlayList";
export default {
  name: "Play",
  components: {
    PlayBar,
    // SearchPlayBar,
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
