<template>
  <div id="search" @scroll="searchScroll">
    <section class="serachIptBox">
      <div class="searchIpt">
        <div class="ipt-icon" @click="value && (searching = true)"></div>
        <input
          type="text"
          placeholder="搜索歌曲、歌手、专辑"
          v-model="value"
          @keyup.enter="value && (searching = true)"
          @focus="inputing = true"
          @blur="inputing = false"
        />
        <div
          :class="{ close: value }"
          @click="
            value = '';
            searching = false;
          "
        ></div>
      </div>
    </section>
    <!-- 热门搜索和搜索建议都是根据value显示，但是搜索的时候要显示搜索建议 ,没有搜索中searching的时候显示热门搜索-->
    <section class="search hot-search" v-if="!value && !searching">
      <h5>热门搜索</h5>
      <ul class="default">
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
      <h3>
        <span class="text">所有历史记录</span>
        <span class="clear" @click="clearAllHistory"></span>
      </h3>
      <ul class="history" v-if="history.length != 0">
        <li v-for="(h, index) in history" :key="index">
          <span class="h-icon"></span>
          <div class="right">
            <span class="text">{{ h }}</span>
            <span class="del" @click="deleteHistory(index)"></span>
          </div>
        </li>
      </ul>
      <p v-else style="padding: 12px; color: #999">暂时还没有历史记录...</p>
    </section>
    <section class="search search-suggest" v-if="value && !searching">
      <h5>
        搜索<span
          @click="
            value = value;
            searching = true;
          "
          >“{{ value }}</span
        >”
      </h5>
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
      <!-- 最佳匹配 -->
      <!--  歌手-->
      <!-- 专辑 -->
      <ul class="search-song-list">
        <!-- 歌曲列表 -->
        <SearchSongItem
          v-for="(item, index) in searchResults"
          :key="index"
          :item="item"
          :currentSongId="currentSongId"
          :playing="playing"
        ></SearchSongItem>
      </ul>
      <div class="bottom-box" v-if="!hasMore">
        <span class="no-more">没有更多了</span>
        <span class="up">↑</span>
      </div>
    </section>
  </div>
</template>

<script>
import SearchSongItem from "@/components/SearchSongItem.vue";
export default {
  name: "Search",
  components: {
    SearchSongItem,
  },
  props: {
    currentSongId: {
      type: Number,
    },
    playing: Boolean,
  },
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
      history: JSON.parse(window.localStorage.getItem("history")) || [],
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
            // if (res.data.result.songs) {
            this.searchResults.push(...res.data.result.songs);
            this.page++;
            this.hasMore = res.data.result.hasMore;

            // 记录历史搜索记录
            this.history = [...new Set([this.value, ...this.history])];
            window.localStorage.setItem(
              "history",
              JSON.stringify(this.history)
            );
            // } else {
            //   return;
            // }
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
          console.log(
            Math.ceil(event.target.offsetHeight + event.target.scrollTop),
            event.target.scrollHeight
          );
          console.log("触底了");
          this.getSearchResultsData();
        } else {
          // console.log(
          //   "判断错误",
          //   Math.ceil(event.target.offsetHeight + event.target.scrollTop),
          //   event.target.scrollHeight
          // );
          console.log("还没触底");
        }
      }
      // else{
      //   console.log('没有更多了');

      // }
      // document.querySelector("#search").scrollHeight;
      // document.querySelector("#search").scrollTop;
      // document.querySelector("#search").offsetHeight;
    },

    // 删除历史记录
    deleteHistory(index) {
      // 先删除点击的一项再重新设置
      this.history.splice(index, 1);
      window.localStorage.setItem("history", JSON.stringify(this.history));
    },
    // 清除历史记录
    clearAllHistory() {
      this.history = [];
      window.localStorage.clear();
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
        this.page = 0;
      }
    },
  },
};
</script>

<style lang="less" scoped>
#search {
  padding-top: 120px;
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
      background: rgba(0, 0, 0, 0.1);
      // background: #ebecec;
      color: #333;
      .ipt-icon,
      .close {
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        // background-color: skyblue;
      }
      .ipt-icon {
        display: flex;
        justify-content: center;
        &::after {
          content: "";
          align-self: center;
          width: 13px;
          height: 13px;
          background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==")
            no-repeat;
        }
      }
      .close {
        display: flex;
        justify-content: center;
        &::after {
          content: "";
          align-self: center;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyOCAyOCI+PGcgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBmaWxsPSIjYmNiZGJkIiBkPSJNMTQgMGM3LjczMiAwIDE0IDYuMjY4IDE0IDE0cy02LjI2OCAxNC0xNCAxNFMwIDIxLjczMiAwIDE0IDYuMjY4IDAgMTQgMHoiLz48cGF0aCBkPSJNMTkgOUw5IDE5TTkgOWwxMCAxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZWJlY2ViIiBzdHJva2Utd2lkdGg9IjIuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+PC9nPjwvc3ZnPg==")
            no-repeat;
        }
        // }
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
    // padding: 15px 10px 0;
    &.hot-search {
      // overflow: hidden;
      h5{
        margin: 20px 15px 0;
        font-size: 12px;
      }
      ul {
        overflow: hidden;
        &.default {
          padding: 15px 10px 0;
          margin: 0 0 7px 0;
          li {
            float: left;
            // height: 32px;
            // line-height: 32px;
            // padding: 0 14px;
            padding: 5px 14px;
            margin: 0 8px 8px 0;
            border: 1px solid #ccc;
            border-radius: 20px;
            font-size: 14px;
            color: #333;
          }
        }

        &.history {
          li {
            display: flex;
            justify-content: center;
            align-items: center;
            // margin: 0px 8px 0px 5px;
            margin: 0 15px;
            font-size: 14px;
            color: #666;
            .h-icon {
              width: 15px;
              height: 15px;
              margin-right: 10px;
              background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljYWNhIiBkPSJNMTUgMzBDNi43MTYgMzAgMCAyMy4yODQgMCAxNVM2LjcxNiAwIDE1IDBzMTUgNi43MTYgMTUgMTUtNi43MTYgMTUtMTUgMTVtMC0yOEM3LjgyIDIgMiA3LjgyIDIgMTVzNS44MiAxMyAxMyAxMyAxMy01LjgyIDEzLTEzUzIyLjE4IDIgMTUgMm03IDE2aC04YTEgMSAwIDAgMS0xLTFWN2ExIDEgMCAxIDEgMiAwdjloN2ExIDEgMCAxIDEgMCAyIi8+PC9zdmc+);
            }
            .right {
              flex: 1;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 45px;
              .text {
                flex: 1;
                margin: 0 3px;
              }
              .del {
                width: 12px;
                height: 12px;
                background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjOTk5ODk5IiBkPSJNMTMuMzc5IDEybDEwLjMzOCAxMC4zMzdhLjk3NS45NzUgMCAxIDEtMS4zNzggMS4zNzlMMTIuMDAxIDEzLjM3OCAxLjY2MyAyMy43MTZhLjk3NC45NzQgMCAxIDEtMS4zNzgtMS4zNzlMMTAuNjIzIDEyIC4yODUgMS42NjJBLjk3NC45NzQgMCAxIDEgMS42NjMuMjg0bDEwLjMzOCAxMC4zMzhMMjIuMzM5LjI4NGEuOTc0Ljk3NCAwIDEgMSAxLjM3OCAxLjM3OEwxMy4zNzkgMTIiLz48L3N2Zz4=);
              }
            }
          }
        }
      }
      // 所有历史记录
      h3 {
        display: flex;
        padding: 5px 4px;
        margin: 0 10px 10px;
        border-radius: 8px 8px 5px 5px;
        color: #777;
        box-shadow: 0px -1px 2px 0px rgba(30, 30, 30, 0.5) inset;
        font-size: 14px;
        div {
          flex: 1;
        }
        span {
          &.text {
            flex: 1;
          }
          &.clear {
            display: block;
            width: 15px;
            height: 15px;
            margin-right: 1px;
            margin-top: 2px;
            background-image: url("../assets/imgs/垃圾桶.png");
            background-repeat: no-repeat;
            background-size: contain;
          }
        }
      }
    }
    &.search-suggest {
      padding: 0;
      h5 {
        margin:15px 0 0  10px;
        padding-right: 10px;
        color: #507daf;
        font-size: 15px;
        // line-height: 50px;
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
            // content: "❤";
            // display: inline-block;
            // margin-right: 7px;
            // color: pink;
            content: "";
            align-self: center;
            margin-right: 7px;
            width: 13px;
            height: 13px;
            background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==")
              no-repeat;
          }
        }
      }
    }
    &.search-result {
      // height: 100vh ;
      // ul.search-song-list {
      //   padding: 0 -5px;
      // }
      h5 {
        margin: 20px 16px 5px;
        font-size: 18px;
        color: #e62424;
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
        .up {
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
          border-radius: 25px 25px 0 0;
        }
      }
    }
  }
}
</style>