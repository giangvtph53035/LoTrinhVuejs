
<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
    <div class="w-full max-w-xl mx-auto p-4 sm:p-8 md:p-10 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl">
      <h1 class="text-3xl font-extrabold mb-6 text-center text-blue-600 dark:text-blue-300 tracking-tight">Quản lý Công việc</h1>
      <TaskForm @submit="addTask" />
      <TaskList
        :tasks="tasks"
        @toggle="toggleTask"
        @delete="deleteTask"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import TaskForm from './components/TaskForm.vue';
import TaskList from './components/TaskList.vue';

const tasks = ref([]);

onMounted(() => {
  const saved = localStorage.getItem('tasks');
  if (saved) tasks.value = JSON.parse(saved);
});

watch(tasks, (newTasks) => {
  localStorage.setItem('tasks', JSON.stringify(newTasks));
}, { deep: true });

function addTask(title) {
  tasks.value.push({
    id: Date.now(),
    title,
    completed: false
  });
}
function toggleTask(id) {
  const task = tasks.value.find(t => t.id === id);
  if (task) task.completed = !task.completed;
}
function deleteTask(id) {
  tasks.value = tasks.value.filter(t => t.id !== id);
}
</script>


