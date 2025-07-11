<template>
  <div>
    <h3>Tasks</h3>
    <TaskList :tasks="tasks" />
  </div>
</template>

<script>
import { inject, computed } from 'vue';
import TaskList from '../components/TaskList.vue';

export default {
  name: 'TasksView',
  props: ['id'],
  components: { TaskList },
  setup(props) {
    const projects = inject('projects');
    const project = computed(() => projects.value.find(p => p.id == props.id));
    const tasks = computed(() => (project.value && project.value.tasks) || []);
    return { tasks };
  }
}
</script>
