<template>
  <ul class="todo-list">
      <!-- <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo"/> -->
      <TodoItem v-for="todo in currentShowTodos" :key="todo.id" :todo="todo"/>
  </ul>
</template>

<script>
import TodoItem from '@/components/TodoItem.vue'
import { mapGetters} from 'vuex'
export default {
    name:'TodoList',
    components:{
        TodoItem,
    },
    computed:{
        // ...mapState(['todos']),
        ...mapGetters(['currentShowTodos']),
    },
        
}
</script>

<style lang="less" scoped>
.todo-list{
    height: 200px;
    margin: 10px 5px;
    padding: 10px;
    background-color: #efefef;
    border-radius: 5px;
    overflow-y:auto;   
}
</style>