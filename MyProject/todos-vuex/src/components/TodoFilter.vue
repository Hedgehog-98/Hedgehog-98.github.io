<template>
  <div class="todo-filter">
    <span class="left"><span>{{ activeTodosCount }}</span> item left</span>
    <ul class="center" > 
      <li v-for="f in filters" :key="f" @click="changeFilter(f)" :class="{active:filter === f}">{{ f }}</li>
    </ul>
    <div class="right btn" @click="clearAllTodo">clear All</div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';
export default {
  name: "TodoFilter",
  data() {
    return {
      filters: ["All", "Active", "Done"],
    };
  },
  computed:{
      ...mapState(['filter']),
      ...mapGetters(['activeTodosCount']),
  },
  methods:{
      ...mapMutations(['changeFilter','clearAllTodo']),
  }
};
</script>

<style lang="less" scoped>
.todo-filter {
  display: flex;
  align-items: center;
  height: 40px;
  width: 100%;
  margin: 20px auto 0;
  padding: 0 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 1px 1px 5px 2px #ccc;
  .left {
    span{
        color: #f00;
        font-size: 20px;
        font-style: italic;
    }
  }
  .center {
    flex: 1;
    margin: 0 10px;
    display: flex;
    justify-content: space-evenly;
    li {
      padding: 3px 8px;
    //   border: 1px solid #ccc;
    background-color: rgba(148, 144, 136, 0.253);
      border-radius: 18px;
      transition: transform .3s;
      cursor: pointer;
      color: #333;
      &.active{
          color: #f00;
          background-color: rgba(255, 166, 0, 0.555);
      }
    //   &:hover{
    //       transform: scale(1.2);
    //   }
    }
  }
  .right {
    width: 80px;
    height: 25px;
    // align-self: center;
    line-height: 1.3;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 1px 1px 5px 3px #ccc;
    transition: all .3s;
    cursor: pointer;
    &:hover{
        transform: translateY(-1px);
        color: #f00;
    }
  }
}
</style>