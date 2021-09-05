<template>
  <div class="recommend-head">
    <div
      class="mask"
      :style="{ background: `url(${detail.coverImgUrl})` }"
    ></div>
    <div class="wrap">
      <div class="left">
        <img :src="detail.coverImgUrl" alt="" />
        <!-- <img :src="`${item.picUrl}?imageView=1&type=webp&thumbnail=246x0`" /> -->
        <span class="play-count">
          <img
            class="m-icon"
            style="width: 12px"
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMiAyMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMDQwMDAwIiBkPSJNMjIgMTYuNzc3YzAgMS4yMzMtMS4xMjEgMi4yMzMtMi41MDYgMi4yMzMtMS4zODQgMC0yLjUwNi0xLTIuNTA2LTIuMjMzdi0yLjU1M2MwLTEuMjM0IDEuMTIyLTIuMjMzIDIuNTA2LTIuMjMzLjE3NCAwIC4zNDMuMDE3LjUwNi4wNDZ2LTEuMzdoLS4wMzNjLjAxNy0uMjIuMDMzLS40NDEuMDMzLS42NjZhOCA4IDAgMCAwLTE2IDBjMCAuMjI1LjAxNi40NDYuMDM0LjY2Nkg0djEuMzdjLjE2My0uMDI5LjMzMy0uMDQ2LjUwNS0uMDQ2IDEuMzg0IDAgMi41MDYuOTk5IDIuNTA2IDIuMjMzdjIuNTUzYzAgMS4yMzMtMS4xMjIgMi4yMzMtMi41MDYgMi4yMzNTMiAxOC4wMTEgMiAxNi43Nzd2LTIuNTUzYzAtLjI1OC4wNTktLjUwMS4xNDgtLjczQS45ODIuOTgyIDAgMCAxIDIgMTMuMDAxdi0yLjY2N2MwLS4wMjMuMDEyLS4wNDMuMDEzLS4wNjctLjAwNC0uMDg4LS4wMTMtLjE3Ni0uMDEzLS4yNjYgMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMHMxMCA0LjQ3NyAxMCAxMGMwIC4wOS0uMDA5LjE3OC0uMDE0LjI2Ni4wMDIuMDI0LjAxNC4wNDQuMDE0LjA2N3YyYS45ODguOTg4IDAgMCAxLS4zNi43NTNjLjIyNC4zMzQuMzYuNzIuMzYgMS4xMzh2Mi41NTIiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZmlsbD0iI2ZmZiIgZD0iTTIwIDE2Ljc3N2MwIDEuMjMzLTEuMTIxIDIuMjMzLTIuNTA2IDIuMjMzLTEuMzg0IDAtMi41MDYtMS0yLjUwNi0yLjIzM3YtMi41NTNjMC0xLjIzNCAxLjEyMi0yLjIzMyAyLjUwNi0yLjIzMy4xNzQgMCAuMzQzLjAxNy41MDYuMDQ2di0xLjM3aC0uMDMzYy4wMTctLjIyLjAzMy0uNDQxLjAzMy0uNjY2YTggOCAwIDAgMC0xNiAwYzAgLjIyNS4wMTYuNDQ2LjAzNC42NjZIMnYxLjM3Yy4xNjMtLjAyOS4zMzMtLjA0Ni41MDUtLjA0NiAxLjM4NCAwIDIuNTA2Ljk5OSAyLjUwNiAyLjIzM3YyLjU1M2MwIDEuMjMzLTEuMTIyIDIuMjMzLTIuNTA2IDIuMjMzUzAgMTguMDExIDAgMTYuNzc3di0yLjU1M2MwLS4yNTguMDU5LS41MDEuMTQ4LS43M0EuOTgyLjk4MiAwIDAgMSAwIDEzLjAwMXYtMi42NjdjMC0uMDIzLjAxMi0uMDQzLjAxMy0uMDY3LS4wMDQtLjA4OC0uMDEzLS4xNzYtLjAxMy0uMjY2IDAtNS41MjMgNC40NzctMTAgMTAtMTBzMTAgNC40NzcgMTAgMTBjMCAuMDktLjAwOS4xNzgtLjAxNC4yNjYuMDAyLjAyNC4wMTQuMDQ0LjAxNC4wNjd2MmEuOTg4Ljk4OCAwIDAgMS0uMzYuNzUzYy4yMjQuMzM0LjM2LjcyLjM2IDEuMTM4djIuNTUyIi8+PC9zdmc+"
            alt=""
          />
        </span>
      </div>
      <div class="right">
        <h2>{{ detail.name }}</h2>
        <div class="info">
          <img src="" alt="" />
          <span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendHead",
  props: ["detail"],
  // props:{
  //   detail:Array,
  // }
};
</script>

<style lang="less" scoped>
.recommend-head {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding: 20px 15px;
  position: relative;
  .mask {
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    background-position: center center;
    background-size: contain;
    filter: blur(20px);
    transform: scale(1.5);
    background-color: rgba(92, 69, 69, 0.5);
  }
  .wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 125px;
    // border: 1px solid #ff0;
    .left {
      position: relative;
      width: 125px;
      height: 125px;
      text-align: center;
      background-color: pink;
      margin-right: 10px;
      img {
        vertical-align: center;
      }
      .play-count {
        position: absolute;
        top: 3px;
        right: 30px;
        width: 30px;
        height: 12px;
        .m-icon {
          position: absolute;
          top: 0;
          left: 0;
        }
      }
    }
    .right {
      flex: 1;
      width: 100px;
      height: 100px;
      // background-color: pink;
      h2 {
        font-size: 17px;
        color: #fff;
      }
    }
  }
}
</style>