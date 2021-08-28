<template>
  <div id="search" @scroll="searchScroll">
    <section class="serachIptBox">
      <div class="searchIpt">
        <div class="ipt-icon">搜</div>
        <input
          type="text"
          placeholder="搜索歌曲、歌手、专辑"
          v-model="value"
          @keyup.enter="value && (searching = true)"
          @focus="inputing = true"
          @blur="inputing = false"
        />
        <div class="close"></div>
      </div>
    </section>
    <!-- 热门搜索和搜索建议都是根据value显示，但是搜索的时候要显示搜索建议 ,没有搜索中searching的时候显示热门搜索-->
    <section class="search hot-search" v-if="!value && !searching">
      <h5>热门搜索</h5>
      <ul>
        <li
          v-for="hot in hots"
          :key="hot.first"
          @click="
            searching = true;
            value = hot.first;
          "
        >
          {{ hot.first }}
        </li>
      </ul>
    </section>
    <section class="search search-suggest" v-if="value && !searching">
      <h5>搜索建议</h5>
      <ul>
        <li
          v-for="(suggest, index) in suggests"
          :key="index"
          @click="
            searching = true;
            value = suggest.keyword;
          "
        >
          <span>{{ suggest.keyword }}</span>
        </li>
      </ul>
    </section>
    <!-- 搜索时显示 -->
    <section class="search search-result" v-if="searching">
      <h5>搜索结果</h5>
      <ul>
        <!-- <li v-for="item in searchResults" :key="item.id">
          <div class="title"><span class="song-name">{{item.name}}</span> <span class="song-alias">{{item.alias[0]}}</span></div>
          
        </li> -->
        <li v-for="(item, index) in searchResults" :key="index">
          <div class="title">
            {{ item.name }}
            <span class="alias"> {{ item.alias[0] }}</span>
          </div>
          <div class="info">
            <i></i>
            <!-- 歌手名-->
            <span class="artist"> {{ item.artists[0].name }}- </span>
            <!-- 专辑名 -->
            <em class="album">{{ item.album.name }}</em>
          </div>
        </li>
      </ul>
      <div class="bottom-box" v-if="!hasMore">
        <span class="no-more">没有更多了</span>
        <span class="up">↑</span>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Search",
  components: {},
  data() {
    return {
      hots: [],
      suggests: [],
      searchResults: [],
      value: "",
      searching: false,
      inputing: false,
      page: 0,
      hasMore: false,
      history:JSON.parse(window.localStorage.getItem('history')) || [],
    };
  },
  created() {
    this.getHotsData();
  },
  methods: {
    // 获取热门搜索
    getHotsData() {
      this.axios.get("http://apis.netstart.cn/music/search/hot").then(
        (res) => {
          this.hots = res.data.result.hots;
        },
        (err) => console.log(err)
      );
    },
    // 获取搜索建议
    getSuggestsData(keywords) {
      this.axios
        .get("http://apis.netstart.cn/music/search/suggest", {
          params: {
            keywords,
            type: "mobile",
          },
        })
        .then(
          (res) => {
            this.suggests = res.data.result.allMatch;
          },
          (err) => console.log(err)
        );
    },
    // 获取搜索结果
    getSearchResultsData() {
      this.axios
        .get("http://apis.netstart.cn/music/search", {
          params: {
            keywords: this.value,
            limit: 30, //限制30条
            offset: this.page * 30,
          },
        })
        .then(
          (res) => {
            console.log(res);
            // this.searchResults = res.data.result.songs;
            // 把audio 隐藏掉
            // document.querySelector("audio").style.display = "none";
            this.searchResults.push(...res.data.result.songs);
            this.page++;
            this.hasMore = res.data.result.hasMore;

            // 记录历史搜索记录
            this.history = [...new Set([...this.history,this.value])];
            window.localStorage.setItem('history',JSON.stringify(this.history));
          },
          (err) => console.log(err)
        );
    },

    // 事件相关
    searchScroll(event) {
      if (this.hasMore) {
        if (
          Math.ceil(event.target.offsetHeight + event.target.scrollTop) >=
          event.target.scrollHeight - 1
        ) {
          // console.log(Math.ceil(event.target.offsetHeight + event.target.scrollTop),event.target.scrollHeight);
          console.log("触底了");
          this.getSearchResultsData();
        } else {
          console.log(
            "判断错误",
            Math.ceil(event.target.offsetHeight + event.target.scrollTop),
            event.target.scrollHeight
          );
        }
      }
      // else{
      //   console.log('没有更多了');

      // }
      // document.querySelector("#search").scrollHeight;
      // document.querySelector("#search").scrollTop;
      // document.querySelector("#search").offsetHeight;
    },
  },
  watch: {
    value(n) {
      // console.log(n);
      // 如果当前正在输入就把searching 改为false
      if (this.inputing) {
        this.searching = false;
      }

      //如果value存在改变并且不是在搜索中就重新获取数据
      if (n && !this.searching) {
        this.getSuggestsData(n);
      } else {
        //如果没有value就置空
        this.suggests = [];
      }
    },

    // 监听是否搜索中
    searching(n) {
      // console.log(n);//就是searching 的值 true/false

      // 如果searching 为true并且有value的时候才发送请求
      if (n && this.value) {
        this.getSearchResultsData();
      } else {
        this.searchResults = [];
      }
    },
  },
};
</script>

<style lang="less" scoped>
#search {
  .serachIptBox {
    padding: 15px 10px;
    box-shadow: 0 1px 3px 0 rgba(150, 150, 150, 0.3);
    .searchIpt {
      overflow: hidden;
      display: flex;
      width: 100%;
      height: 30px;
      font-size: 14px;
      border-radius: 15px;
      background: rgba(0, 0, 0, 0.08);
      color: #333;
      .ipt-icon,
      .close {
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        background-color: skyblue;
      }
      input {
        flex: 1;
        outline: none;
        border: none;
        height: 30px;
        line-height: 18px;
        text-indent: 0.2rem;
        background: rgba(0, 0, 0, 0);
      }
      // .close{

      // }
    }
  }
  .search {
    overflow: hidden;
    padding: 15px 10px 0;
    &.hot-search {
      // overflow: hidden;
      // padding: 15px 10px 0;
      ul {
        margin: 10px 0 7px 0;
        li {
          float: left;
          // height: 32px;
          // line-height: 32px;
          // padding: 0 14px;
          padding: 5px 14px;
          margin: 0 8px 8px 0;
          border: 1px solid #ccc;
          border-radius: 20px;
        }
      }
    }
    &.search-suggest {
      padding: 0;
      h5 {
        margin-left: 10px;
        padding-right: 10px;
        color: #507daf;
        font-size: 15px;
        line-height: 50px;
      }
      ul {
        li {
          height: 44px;
          line-height: 44px;
          display: flex;
          color: #333;
          font-size: 15px;
          padding: 0 0 0 10px;
          span {
            flex: 1;
            padding-right: 10px;
            border-bottom: 1px solid #ccc;
            // box-shadow: 0 1px 3px 0 #ccc;
          }
          &::before {
            content: "❤";
            display: inline-block;
            margin-right: 7px;
            color: pink;
          }
        }
      }
    }
    &.search-result {
      // height: 100vh ;
      ul {
        li {
          // display: flex;
          // height: 54px;
          // line-height: 54px;
          border-bottom: 1px solid #ccc;
          .info {
            i {
              display: inline-block;
              width: 20px;
              height: 20px;
              background: url("https://s3.music.126.net/mobile-new/img/index_icon_2x.png")
                no-repeat;
              background-size: 166px 97px;
            }
          }
        }
      }
      .bottom-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 46px;
        line-height: 46px;
        .no-more {
          color: #d43c33;
          font-size: 24px;
        }
        .up{
          position: fixed;
          bottom: 10px;
          right: 20px;
          display: block;
          width: 25px;
          height: 25px;
          font-size: 24px;
          text-align: center;
          line-height: 25px;
          background-color: skyblue;
          border-radius: 25px 25px 0 0 ;
        }
      }
    }
  }
}
</style>