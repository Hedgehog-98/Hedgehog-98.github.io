<template>
  <li class="todo-item">
    <!-- 写法1 写一个方法 -->
    <!-- <input type="checkbox" :checked="todo.done" @change="changeHandler" /> -->
    <!-- 写法2 直接在标签上写点击事件的处理，适合代码比较少的时候用-->
    <input
      type="checkbox"
      :checked="todo.done"
      @change="toggleTodo({ id: todo.id, done: $event.target.checked })"
    />

    <input
      type="text"
      v-if="showEdit"
      v-model="value"
      @blur="showEdit = false"
      ref="ipt"
      :class="{ edit: showEdit }"
    />
    <p v-else class="text" :class="{ active: todo.done }" @click="pClick()">
      {{ todo.text }}
    </p>
    <span class="del-btn" @click="deleteTodo(todo.id)">×</span>
  </li>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "TodoItem",
  data() {
    return {
      showEdit: false,
      value: "",
    };
  },
  props: {
    todo: Object,
  },
  methods: {
    /*
    //写法1 
      changeHandler(event){
        //   console.log(event.target.checked);
        // 调用toggleTodoCkbState方法 需要带参数
        this.toggleTodoCkbState({id:this.todo.id,done:event.target.checked});
      },
    ...mapMutations(["toggleTodo"]), 
    */

    // 写法2
    ...mapMutations(["toggleTodo", "deleteTodo"]),
    // mouseover(event){
    //     console.log(11);
    //     console.log(event.target);

    // },
    // mouseleave(event){
    //     console.log(22);
    //     console.log(event.target);

    // }
    pClick() {
      this.showEdit = true;
      // 下次dom更新完成之后再自动获取焦点
      this.$nextTick(() => {
        this.$refs.ipt.focus();
      });
    },
  },
};
</script>

<style lang="less" scoped>
.todo-item {
  display: flex;
  align-items: center;
  padding: 0 12px;
  margin: 5px 0;
  cursor: pointer;
  height: 28px;
  //   background-color: skyblue;
  box-shadow: 0 1px 3px 0px #aaa;
  .text {
    flex: 1;
    margin: 0 10px;
    &.active {
      text-decoration: line-through;
      // text-decoration-color: #f00;
      // text-decoration-style: double;
    }
  }
  input.edit {
    outline: none;
    border: none;
    border-radius: 5px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    flex: 1;
    margin: 0 10px;
    height: 25px;
    border-left: 2px solid orange;
    text-indent: 1rem;
    background: rgba(0,0,0,.1);
  }
  .del-btn {
    text-align: center;
    width: 20px;
    height: 20px;
    background-color: rgba(135, 207, 235, 0.527);
    cursor: pointer;
    border-radius: 10px;
    &:hover {
      background-color: rgba(255, 0, 0, 0.5);
      color: #fff;
    }
  }
}
</style>