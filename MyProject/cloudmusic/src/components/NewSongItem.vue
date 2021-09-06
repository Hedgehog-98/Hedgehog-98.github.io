<template>
  <div>
    <!-- <ul v-if="item.song">
      <li class="new-song-item" @click="$emit('change-current-song', item)">
        <div class="left">
          <div class="title">
            {{ item.name }}
            <span class="alias" v-for="a in item.song.alias" :key="a">
              {{ a }}</span
            >
          </div>
          <div class="info">
            <i v-if="item.song.exclusive"></i>
            <span
              class="artist"
              v-for="artist in item.song.artists"
              :key="artist.id"
            >
              {{ artist.name }}
            </span>
            <em class="album">{{ item.song.album.name }}</em>
          </div>
        </div>
        <div class="icon">
          <div class="play" :class="{ current: currentSongId === item.id ,playing:playing}">
            <i></i><i></i><i></i>
          </div>
        </div>
      </li>
    </ul> -->
    <!-- <ul v-else class="song-list">
      <li class="new-song-item" @click="$emit('change-current-song', item)">
        <div class="num"><slot></slot></div>
        <div class="left">
          <div class="title">
            {{ item.name }}
            <span class="alias" v-for="a in item.alia" :key="a"> {{ a }}</span>
          </div>
          <div class="info">
            <span class="artist" v-for="artist in item.ar" :key="artist.id">
              {{ artist.name }}
            </span>
            <em class="album">{{ item.al.name }}</em>
          </div>
        </div>
        <div class="icon">
          <div class="play" :class="{ current: currentSongId === item.id ,playing:playing}">
            <i></i><i></i><i></i>
          </div>
        </div>
      </li>
    </ul> -->
    <!-- 最新音乐 -->
    <li
      v-if="item.song"
      class="new-song-item"
      @click="$emit('change-current-song', item)"
    >
      <div class="num"><slot></slot></div>
      <div class="left">
        <div class="title">
          {{ item.name }}
          <span class="alias" v-for="a in item.song.alias" :key="a">
            {{ a }}</span
          >
        </div>
        <div class="info">
          <!-- 是否独家 这里应该是音质 -->
          <i v-if="item.song.exclusive"></i>
          <!-- 艺术家 -->
          <span
            class="artist"
            v-for="artist in item.song.artists"
            :key="artist.id"
          >
            {{ artist.name }}
          </span>
          <em class="album">{{ item.song.album.name }}</em>
        </div>
      </div>
      <div class="icon">
        <!-- <div class="play"></div> -->
        <div
          class="play"
          :class="{ current: currentSongId === item.id, playing: playing }"
        >
          <!-- 动画条 -->
          <i></i><i></i><i></i><i></i><i></i>
        </div>
      </div>
    </li>
    <!-- 推荐歌单 -->
    <li
      v-else-if="item.al"
      class="new-song-item song-list"
      @click="$emit('change-current-song', item)"
    >
      <div class="num"><slot></slot></div>
      <div class="left">
        <div class="title">
          {{ item.name }}
          <span class="alias" v-for="a in item.alia" :key="a"> {{ a }}</span>
        </div>
        <div class="info">
          <!-- <i v-if="item.song.exclusive"></i> -->
          <span class="artist" v-for="artist in item.ar" :key="artist.id">
            {{ artist.name }}
          </span>
          <em class="album">{{ item.al.name }}</em>
        </div>
      </div>
      <div class="icon">
        <div
          class="play"
          :class="{ current: currentSongId === item.id, playing: playing }"
        >
          <i></i><i></i><i></i><i></i><i></i>
        </div>
      </div>
    </li>
    <li
      v-else-if="item.artists"
      class="new-song-item song-list"
      @click="$emit('change-current-song', item)"
    >
      <div class="num"><slot></slot></div>
      <div class="left">
        <div class="title">
          {{ item.name }}
          <span class="alias" v-for="a in item.alia" :key="a"> {{ a }}</span>
        </div>
        <div class="info">
          <!-- <i v-if="item.song.exclusive"></i> -->
          <span class="artist" v-for="artist in item.artists" :key="artist.id">
            {{ artist.name }}
          </span>
          <em class="album">{{ item.album.name }}</em>
        </div>
      </div>
      <div class="icon">
        <div
          class="play"
          :class="{ current: currentSongId === item.id, playing: playing }"
        >
          <i></i><i></i><i></i><i></i><i></i>
        </div>
      </div>
    </li>
  </div>
</template>

<script>
export default {
  name: "NewSongItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
    index: Number,
    currentSongId: {
      type: Number,
    },
    playing: Boolean,
  },
};
</script>

<style lang="less" scoped >
.song-list {
  .new-song-item {
    box-shadow: 30px 1px 0px rgba(202, 192, 192, 0.3);
    border-bottom: none;
  }
}
&.lt3 {
  .num {
    span {
      color: #f00;
    }
  }
}
.new-song-item {
  display: flex;
  align-items: center;
  padding: 5px 15px 10px 0;
  margin-left: 15px;
  border-bottom: 1px solid rgba(202, 192, 192, 0.3);

  .num {
    span {
      display: block;
      width: 25px;
    }
  }
  .left {
    flex: 1;

    // margin-left: 15px;
    .title {
      font-size: 17px;
      color: #333;
      line-height: 1.5;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;

      .alias {
        color: #888;
        &::before {
          content: "(";
        }
        &::after {
          content: ")";
        }
      }
    }
    .info {
      font-size: 12px;
      color: #888;
      line-height: 1.5;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      i {
        display: inline-block;
        width: 12px;
        height: 8px;
        margin-right: 4px;
        background: url("https://s3.music.126.net/mobile-new/img/index_icon_2x.png")
          no-repeat;
        background-size: 166px 97px;
      }
      span.artist {
        &::after {
          content: "/";
        }
        &:last-of-type {
          &::after {
            content: "-";
            margin-right: 3px;
          }
        }
      }
      em {
        font-style: normal;
      }
    }
  }
  .icon {
    width: 22px;
    height: 22px;

    margin-left: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    .play {
      width: 100%;
      height: 100%;
      // background-color: pink;
      background: url("https://s3.music.126.net/mobile-new/img/index_icon_2x.png")
        no-repeat -24px 0;
      background-size: 166px 97px;
    }
    .current {
      // background-color: red;
      display: inline-block;
      width: 40px;
      height: 16px;
      display: flex;
      justify-content: space-around;
      background: none;
      i {
        width: 3px;
        margin: 0 0 0 2px;
        height: 100%;
        display: inline-block;
        background-color: #ff0000;
        animation: playing 0.5s linear infinite alternate;
        transform-origin: bottom;
        animation-play-state: paused;
        &:nth-child(1) {
          animation-delay: -0.5s;
        }
        &:nth-child(2) {
          animation-delay: -0.3s;
        }
        &:nth-child(3) {
          animation-delay: 0s;
        }
        &:nth-child(4) {
          animation-delay: .2s;
        }
        &:nth-child(5) {
          animation-delay: -.1s;
        }
      }
      &.playing {
        i {
          animation-play-state: running;
        }
      }
    }

    @keyframes playing {
      0% {
        transform: scaleY(0.2);
      }
      25% {
        transform: scaleY(0.8);
      }
      25% {
        transform: scaleY(0.6);
      }
      100% {
        transform: scaleY(1.1);
      }
    }
  }
}
</style>