<template>
  <div>
    <h3 class="text-lg font-bold mb-2">Nhiệm vụ</h3>
    <form class="flex gap-2 mb-4" @submit.prevent="addTask">
      <input v-model="newTask" class="border p-2 rounded flex-1" placeholder="Nhập tên nhiệm vụ..." />
      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Thêm</button>
    </form>
    <TaskList :tasks="tasks" />
  </div>
</template>

<script>
import { inject, computed, ref } from 'vue';
import TaskList from '../components/TaskList.vue';

export default {
  name: 'TasksView',
  props: ['id'],
  components: { TaskList },
  setup(props) {
    const projects = inject('projects');
    const project = computed(() => {
      const arr = projects.projects || projects.value || projects;
      if (!arr || !Array.isArray(arr)) return {};
      return arr.find(p => p.id == props.id) || {};
    });
    const tasks = computed(() => (project.value && project.value.tasks) || []);
    // Thêm task
    const newTask = ref('');
    function addTask() {
      if (!newTask.value.trim()) return;
      if (project.value && Array.isArray(project.value.tasks)) {
        project.value.tasks.push({ id: Date.now(), title: newTask.value });
        newTask.value = '';
      }
    }
    return { tasks, newTask, addTask };
  }
}
</script>
