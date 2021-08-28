<template>
  <div class="home" >
    
    <HomeTitle>编辑推荐</HomeTitle>
    <ul class="home-card-list">
      <CartItem v-for="item in personalize" :key="item.id"
        :item="item"
       ></CartItem>
    </ul>
    <!-- <ul class="personalize">
      <li v-for="item in personalize" :key="item.id" class="personalize-item"
      @click="goToPlayList(item.id)"
      >
        <span>{{ item.name }}</span>
      </li>
    </ul> -->
    <HomeTitle>最新音乐</HomeTitle>
    <div class="home-new-song-list">
      <NewSongItem v-for="item in songs" :key="item.id" :item='item'
      @change-current-song="$emit('change-current-song',$event);
      $emit('change-current-play-list',songs)
      "
      :currentSongId="currentSongId"
      :playing="playing"
      ></NewSongItem>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeTitle from '@/components/HomeTitle.vue';
import CartItem from "@/components/CartItem.vue";
import NewSongItem from "@/components/NewSongItem.vue";

export default {
  name: "Home",
  components: {
    HomeTitle,
    CartItem,
    NewSongItem,
    
  },
  props:{
    currentSongId:{
      type:Number,
    },
    playing:Boolean,
  },
  data() {
    return {
      personalize: [],
      songs:[],
    };
  },
  created() {
    //1. 推荐歌单
    this.getPersonalizeData();
    // 2.最新音乐
    this.getNewSongData();
  },
  methods: {
    getPersonalizeData() {
      this.axios.get("http://apis.netstart.cn/music/personalized?limit=6").then(
        (res) => {
          // console.log(res);
          this.personalize = res.data.result;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    getNewSongData(){
      this.axios.get("http://apis.netstart.cn/music/personalized/newsong").then(
        (res) => {
          console.log(res);
          this.songs = res.data.result;
        },
        (err) => {
          console.log(err);
        }
      );
    }

    
  },
};
</script>

<style lang="less" scoped>
// .personalize {
//   text-align: center;
//   .personalize-item {
//     padding: 10px;
//     margin: 5px 0;
//     &:hover{
//       cursor: pointer;
//       background-color: skyblue;
//     }
//   }
// }
// .home{
//   // height: 1500px;
// }
.home-card-list {
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-evenly;
}
// .home-new-song-list{
//   padding: 0 5px;
// }
</style>