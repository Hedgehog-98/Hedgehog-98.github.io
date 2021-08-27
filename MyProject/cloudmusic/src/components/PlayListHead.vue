<template>
  <div class="play-list-head">
    <div class="wrap">
      <div class="left">
        <slot class="left"> </slot>
      </div>
      <div class="right">
        <slot class="right"> </slot>
      </div>
    </div>
    <!-- <div class="content">
        <div class="title">{{detail.name}}</div>
        <div class="update">每日更新</div>
        <div class="desc">
          <i v-for="text in CalcDesc" :key="text">{{text}} </i>
        </div>
      </div>
      <div class="bg"></div>
      <div class="mask"></div> -->
  </div>
</template>

<script>
export default {
  name: "PlayListHead",
  props: {
    detail: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
.play-list-head {
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 210px;
  padding: 20px 40px;
  // background-color: pink;
  background-color: #a79598ba;
  .wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 125px;
    border: 1px solid #ff0;
    .left {
      width: 100px;
      height: 100px;
      background-color: pink;
    }
    .right {
      width: 100px;
      height: 100px;
      background-color: skyblue;
    }
  }
}
// 头部区域
// .play-list-head {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 210px;
//   padding: 20px 40px;
//   // background-color: pink;
//   background-color: #a79598ba;

//   .content {
//     position: relative;
//     height: 138px;
//     width: 336px;
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
//     // border: 1px solid red;
//     .title {
//       font-size: 18px;
//       color: #fff;
//       display: -webkit-box;
//       -webkit-line-clamp: 1;
//       -webkit-box-orient: vertical;
//       overflow: hidden;
//     }
//     .update {
//       width: 60px;
//       height: 18px;
//       text-align: center;
//       line-height: 18px;
//       margin: 10px 0 20px;
//       padding: 0 3px;
//       font-size: 12px;
//       color: #ffffff99;
//       background-color: #ffffff33;
//     }
//     i {
//       display: block;
//       font-style: normal;
//       font-size: 14px;
//       color: #ffffffcc;
//       &:nth-child(3) {
//         width: 50%;
//         display: -webkit-box;
//         -webkit-line-clamp: 1;
//         -webkit-box-orient: vertical;
//         overflow: hidden;
//       }
//     }

//     &::after {
//       content: ">";
//       position: absolute;
//       right: -12px;
//       bottom: -3px;
//       font-size: 20px;
//       color: #fff;
//     }
//   }
//   .bg {
//     height: 210px;
//   }
// }
</style>