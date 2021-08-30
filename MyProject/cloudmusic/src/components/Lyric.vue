<template>
  <div class="play-lyric" @click="$emit('toggle-show-play-lyric', false)"></div>
</template>

<script>
export default {
  name: "Lyric",
  props: {
    currentSong: Object,
  },
  data() {
    return {
      lyric: [],
    };
  },
  created() {
    // 获取歌词
    this.getLyricData();
  },
  methods: {
    getLyricData() {
      this.axios.get("http://apis.netstart.cn/music/lyric?id=1872975622").then(
        (res) => {
          console.log(res);
          var lyric = res.data.lrc.lyric;
          // console.log(lyric);
          var arr = lyric
            .split("\n")
            .filter((s) => s)
            .map((s) => {
              var text = s.replace(/^\[\d{2}:\d{2}\.\d{3}\]/i, "");
              var timeStr = s.replace(text, "").replace(/(^\[|\]$)/g, "");
              var timeArr = timeStr.split(":").join("-").split(".").join("-");
              // console.log(timeArr);
              //   var time = timeArr[0] * 60 + timeArr[1];
              //   return { text, time };
              return timeArr;
            });
          console.log(arr);
          var arr1 = arr.filter((item) => item != "");
          console.log(arr1);
          var arr2 = [];
          arr1.forEach((item) => {
            console.log(item.split("-"));
            // return item.split('-');
            // console.log(item.split('-')[0],item.split('-')[1],item.split('-')[2]);
            var m = Number(item.split("-")[0]);
            var s = Number(item.split("-")[1]);
            var ms = Number(item.split("-")[2]);
            var time = m * 60 * 1000 + s * 1000 + ms;
            console.log(m, s, ms);
            console.log(time);
            arr2.push(time);
          });
          console.log(arr1);
          console.log(arr2);
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
  padding-top: 20vh;
  background: rgba(255, 0, 0, 0.5);
}
</style>