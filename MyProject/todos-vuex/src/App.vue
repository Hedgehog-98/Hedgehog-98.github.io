<template>
  <div id="app">
    <AddTodo />
    <TodoList />
    <TodoFilter />
  </div>
</template>

<script>
import AddTodo from "./components/AddTodo.vue";
import TodoList from "./components/TodoList.vue";
import TodoFilter from "./components/TodoFilter.vue";

export default {
  name: "App",
  components: {
    AddTodo,
    TodoList,
    TodoFilter,
  },
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 50px auto;
  border: 1px solid #ccc;
  width: 400px;
  padding: 10px 12px ;
  position: relative;
  background-color: #fafafa;
  
}
</style>
