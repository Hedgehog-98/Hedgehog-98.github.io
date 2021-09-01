import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    todos: [{
        id: 1,
        text: '学习vue前端框架',
        done: true
      },
      {
        id: 2,
        text: '学习react',
        done: false
      },
      {
        id: 5,
        text: 'hedgehog 记得早睡早起',
        done: false
      },
      {
        id: 6,
        text: '学习react',
        done: false
      },
      {
        id: 9,
        text: 'hedgehog 记得早睡早起',
        done: false
      },
      
    ],
    filter:'All',
  },
  mutations: {
    // 添加todo 携带一个参数写法
    addTodo(state, text) {
      state.todos.push({
        id: Date.now(), //提交时间作为id保证不重复
        text,
        done: false,
      })
    },
    // 切换todo复选框的状态 携带载荷的写法
    toggleTodo(state, payload) {
      state.todos = state.todos.map(todo => {
        // 根据id判断 如果todo的id跟点击事件传过来载荷的id相等就更改为载荷的done，否则就返回原来的
        if (todo.id === payload.id) {
          return {
            ...todo,
            done: payload.done
          };
        } else {
          return todo;
        }
      })
    },

    /* toggleAllTodos(state, payload) {
      state.todos = state.todos.map(todo => ({
        ...todo,
        done: payload.done
      }));
    }, */
    // 是否全选 方法简写
    toggleAllTodos(state, bool) {
      state.todos = state.todos.map(todo => ({...todo,done:bool,}));
    },
    // 删除Todo
    deleteTodo(state,id){
      // 使用filter
      state.todos = state.todos.filter( todo => todo.id !== id);
      // 使用splice 要根据index
    },
    // 清空所有todos
    clearAllTodo(state){
      // 使用filter
      state.todos = [];
      
    },
    // 改变filter
    changeFilter(state,filter){
      // 直接赋值
      state.filter = filter;
    }

  },
  getters: {
    // 是否全选
    isAllChecked(state) {
      if(state.todos.length !== 0){
        return state.todos.every((todo) => todo.done);
      }
    },
    // 所有选中的todo的数量
    AllTodos(state){
      return state.todos;
    },
    // 所有未完成的todo
    activeTodos(state){
      return state.todos.filter( todo => !todo.done);
    },
    // 所有已完成的todo 
    doneTodos(state){
      return state.todos.filter( todo => todo.done);
    },
    // 未完成在todo个数
    activeTodosCount(state,getters){
      return getters.activeTodos.length;
    },
    // 当前的filter
    currentShowTodos(state,getters){
      switch (state.filter) {
        case 'Active':
          return getters.activeTodos;
        case 'Done':
          return getters.doneTodos;
        default:
         return getters.AllTodos;
      }
    }
    
  },
  actions: {},
  modules: {}
})

// 测试提交的同步代码是否正确
// 测试 addTodo 方法
// store.commit('addTodo','hahahahhhhh')
// 测试 toggleTodo 方法
// store.commit('toggleTodo',{id:1,done:false});
// 测试 toggleAllTodos 方法 
// 载荷形式
// store.commit('toggleAllTodos',{done:false});
// store.commit('toggleAllTodos',{done:true});
// 直接带一个布尔值
// store.commit('toggleAllTodos',false);
// store.commit('toggleAllTodos',true);
// 测试 deleteTodo 方法
// store.commit('deleteTodo',1);
// 测试 changeFilter 方法
// store.commit('changeFilter','All');
export default store;