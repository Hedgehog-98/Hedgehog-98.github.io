(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1df91881"],{"09cf":function(M,t,i){"use strict";i("cd4e")},4802:function(M,t,i){"use strict";i.r(t);var a=function(){var M=this,t=M.$createElement,i=M._self._c||t;return M.detail?i("div",{staticClass:"play-list"},[i("RecommendHead",{staticClass:"recommend-head",attrs:{detail:M.detail}}),i("h3",{staticClass:"title"},[M._v("歌曲列表")]),M._l(M.detail.tracks,(function(t,a){return i("NewSongItem",{key:t.id,class:{lt3:a<3},style:{background:"#fefefe"},attrs:{item:t,currentSongId:M.currentSongId,playing:M.playing},on:{"change-current-song":function(t){M.$emit("change-current-song",t),M.$emit("change-current-play-list",M.detail.tracks)}}},[i("span",[M._v(M._s(a+1))])])}))],2):M._e()},e=[],u=(i("a9e3"),i("a4d3"),i("e01a"),i("fb6a"),i("ac1f"),i("1276"),i("da1d")),c=function(){var M=this,t=M.$createElement,i=M._self._c||t;return i("div",{staticClass:"recommend-head"},[i("div",{staticClass:"mask",style:{background:"url("+M.detail.coverImgUrl+"?imageView=1&type=webp&thumbnail=246x0)"}}),i("div",{staticClass:"wrap"},[i("div",{staticClass:"left"},[i("img",{attrs:{src:M.detail.coverImgUrl,alt:""}}),i("span",{staticClass:"play-count"},[i("img",{staticClass:"m-icon",staticStyle:{width:"12px"},attrs:{src:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMiAyMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMDQwMDAwIiBkPSJNMjIgMTYuNzc3YzAgMS4yMzMtMS4xMjEgMi4yMzMtMi41MDYgMi4yMzMtMS4zODQgMC0yLjUwNi0xLTIuNTA2LTIuMjMzdi0yLjU1M2MwLTEuMjM0IDEuMTIyLTIuMjMzIDIuNTA2LTIuMjMzLjE3NCAwIC4zNDMuMDE3LjUwNi4wNDZ2LTEuMzdoLS4wMzNjLjAxNy0uMjIuMDMzLS40NDEuMDMzLS42NjZhOCA4IDAgMCAwLTE2IDBjMCAuMjI1LjAxNi40NDYuMDM0LjY2Nkg0djEuMzdjLjE2My0uMDI5LjMzMy0uMDQ2LjUwNS0uMDQ2IDEuMzg0IDAgMi41MDYuOTk5IDIuNTA2IDIuMjMzdjIuNTUzYzAgMS4yMzMtMS4xMjIgMi4yMzMtMi41MDYgMi4yMzNTMiAxOC4wMTEgMiAxNi43Nzd2LTIuNTUzYzAtLjI1OC4wNTktLjUwMS4xNDgtLjczQS45ODIuOTgyIDAgMCAxIDIgMTMuMDAxdi0yLjY2N2MwLS4wMjMuMDEyLS4wNDMuMDEzLS4wNjctLjAwNC0uMDg4LS4wMTMtLjE3Ni0uMDEzLS4yNjYgMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMHMxMCA0LjQ3NyAxMCAxMGMwIC4wOS0uMDA5LjE3OC0uMDE0LjI2Ni4wMDIuMDI0LjAxNC4wNDQuMDE0LjA2N3YyYS45ODguOTg4IDAgMCAxLS4zNi43NTNjLjIyNC4zMzQuMzYuNzIuMzYgMS4xMzh2Mi41NTIiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZmlsbD0iI2ZmZiIgZD0iTTIwIDE2Ljc3N2MwIDEuMjMzLTEuMTIxIDIuMjMzLTIuNTA2IDIuMjMzLTEuMzg0IDAtMi41MDYtMS0yLjUwNi0yLjIzM3YtMi41NTNjMC0xLjIzNCAxLjEyMi0yLjIzMyAyLjUwNi0yLjIzMy4xNzQgMCAuMzQzLjAxNy41MDYuMDQ2di0xLjM3aC0uMDMzYy4wMTctLjIyLjAzMy0uNDQxLjAzMy0uNjY2YTggOCAwIDAgMC0xNiAwYzAgLjIyNS4wMTYuNDQ2LjAzNC42NjZIMnYxLjM3Yy4xNjMtLjAyOS4zMzMtLjA0Ni41MDUtLjA0NiAxLjM4NCAwIDIuNTA2Ljk5OSAyLjUwNiAyLjIzM3YyLjU1M2MwIDEuMjMzLTEuMTIyIDIuMjMzLTIuNTA2IDIuMjMzUzAgMTguMDExIDAgMTYuNzc3di0yLjU1M2MwLS4yNTguMDU5LS41MDEuMTQ4LS43M0EuOTgyLjk4MiAwIDAgMSAwIDEzLjAwMXYtMi42NjdjMC0uMDIzLjAxMi0uMDQzLjAxMy0uMDY3LS4wMDQtLjA4OC0uMDEzLS4xNzYtLjAxMy0uMjY2IDAtNS41MjMgNC40NzctMTAgMTAtMTBzMTAgNC40NzcgMTAgMTBjMCAuMDktLjAwOS4xNzgtLjAxNC4yNjYuMDAyLjAyNC4wMTQuMDQ0LjAxNC4wNjd2MmEuOTg4Ljk4OCAwIDAgMS0uMzYuNzUzYy4yMjQuMzM0LjM2LjcyLjM2IDEuMTM4djIuNTUyIi8+PC9zdmc+",alt:""}}),M._v(" "+M._s(M._f("calcCount")(M.detail.playCount))+" ")])]),i("div",{staticClass:"right"},[i("h2",[M._v(M._s(M.detail.name))]),M.detail.creator?i("div",{staticClass:"info"},[i("img",{staticClass:"avatar",attrs:{src:M.detail.creator.avatarUrl}}),i("span",{staticClass:"nickname"},[M._v(M._s(M.detail.creator.nickname))])]):M._e()])])])},s=[],n=(i("b680"),{name:"RecommendHead",props:{detail:{required:!0}},data:function(){return{}},components:{},filters:{calcCount:function(M){return M>1e8?(M/1e8).toFixed(1)+"亿":M>1e4?(M/1e4).toFixed(1)+"万":M}}}),j=n,I=(i("09cf"),i("2877")),L=Object(I["a"])(j,c,s,!1,null,"16529092",null),l=L.exports,d={name:"Recommend",components:{NewSongItem:u["a"],RecommendHead:l},props:{currentSongId:{type:Number},playing:Boolean},data:function(){return{detail:[]}},created:function(){this.getPlayListData(this.$route.query.id)},computed:{CalcDesc:function(){var M=this.detail.description;return M.split("\n").slice(0,3)}},methods:{getPlayListData:function(M){var t=this;this.axios.get("http://apis.netstart.cn/music/playlist/detail",{params:{id:M}}).then((function(M){t.detail=M.data.playlist}),(function(M){console.log(M)}))}},watch:{$route:function(M){this.detail=this.getPlayListData(M.query.id)}}},N=d,D=(i("61c9"),Object(I["a"])(N,a,e,!1,null,"4f439ae2",null));t["default"]=D.exports},"61c9":function(M,t,i){"use strict";i("bbfd")},bbfd:function(M,t,i){},cd4e:function(M,t,i){}}]);
//# sourceMappingURL=chunk-1df91881.b17d8489.js.map