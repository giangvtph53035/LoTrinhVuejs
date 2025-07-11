<template>
  <div id="app">
    <h1>Danh sách Công việc</h1>
    <TaskForm @add="addTask" />
    <ul class="task-list">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @toggle="toggleTask"
        @delete="deleteTask"
      />
    </ul>
    <p>Số công việc chưa hoàn thành: {{ incompleteTaskCount }}</p>
  </div>
</template>

<script>
import TaskForm from './components/TaskForm.vue'
import TaskItem from './components/TaskItem.vue'

export default {
  name: 'App',
  components: {
    TaskForm,
    TaskItem
  },
  data() {
    return {
      tasks: [],
      newTaskTitle: ''
    }
  },
  computed: {
    incompleteTaskCount() {
      return this.tasks.filter(task => !task.completed).length
    }
  },
  methods: {
    addTask(title) {
      const newTask = {
        id: Date.now(),
        title,
        completed: false
      }
      this.tasks.push(newTask)
    },
    toggleTask(id) {
      const task = this.tasks.find(t => t.id === id)
      if (task) {
        task.completed = !task.completed
      }
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter(t => t.id !== id)
    }
  },
  mounted() {
    const savedTasks = localStorage.getItem('tasks')
    if (savedTasks) {
      try {
        this.tasks = JSON.parse(savedTasks)
      } catch (e) {
        console.error('Lỗi khi phân tích dữ liệu từ localStorage', e)
      }
    }
  },
  watch: {
    tasks: {
      handler(newTasks) {
        localStorage.setItem('tasks', JSON.stringify(newTasks))
      },
      deep: true
    }
  }
}
</script>

<style>
#app {
  max-width: 600px;
  margin: 0 auto;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 20px;
  text-align: center;
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
