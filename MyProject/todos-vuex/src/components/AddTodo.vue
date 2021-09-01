<template>
  <div class="add-todo">
    <input type="checkbox" :checked="isAllChecked" 
    @change="toggleAllTodos($event.target.checked)"/>
    <input type="text" placeholder="输入todos" v-model.trim="value" @keyup.enter="handleAddTodo(value);"/>
    <!-- 不使用辅助函数 -->
    <!-- <input type="button" @click="addTodo(value)" value="add" /> -->
    <input type="button" @click="handleAddTodo(value)" value="add" />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
// import { mapMutations } from 'vuex';
export default {
  name: "AddTodo",
  data() {
    return {
      value: "",
    };
  },
  methods: {

   /*
  //  不使用辅助函数
     addTodo(v) {
      if (v) {
        this.$store.commit("addTodo", v);
        this.value = "";
      } else {
        alert("请输入内容后再添加!!!");
      }
    }, */
    // 使用辅助函数
    handleAddTodo(v){
     if (v) {
        this.addTodo(v)
        this.value = "";
      } else {
        alert("请输入内容后再添加!!!");
      }
    },
    ...mapMutations(['addTodo','toggleAllTodos'])
  },
  computed:{
    ...mapGetters(['isAllChecked']),
  }
};
</script>

<style lang="less" scoped>
.add-todo {
  display: flex;
  align-items: center;
  height: 30px;
  margin: 20px 5px;
  padding: 0 20px;
  border: 1px solid #ccc;
  border-radius: 15px;
  // 属性选择器
  input[type="checkbox"] {
    width: 15px;
    height: 15px;
  }
  input[type="text"] {
    outline: none;
    border: none;
    flex: 1;
    margin-left: 10px;
    margin-right: 10px;
    padding: 0 15px;
    border-left: 2px solid #aaa;
    height: 18px;
    // background-color: pink;
  }
  input[type="button"] {
    outline: none;
    border: none;
    display: block;
    height: 24px;
    width: 36px;
    border-radius: 5px;
    background-color: #ffbbdd;
  }
}
</style>
