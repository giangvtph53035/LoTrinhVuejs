
<template>
  <transition-group name="task" tag="ul" class="mt-4 rounded-xl bg-white dark:bg-gray-800 shadow-lg divide-y divide-gray-100 dark:divide-gray-700 overflow-hidden">
    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @toggle="$emit('toggle', $event)"
      @delete="$emit('delete', $event)"
    />
  </transition-group>
</template>


<script setup>
import TaskItem from './TaskItem.vue';
// eslint-disable-next-line
const props = defineProps({
  tasks: Array
});
</script>

<style scoped>
.task-enter-active, .task-leave-active {
  transition: all 0.3s;
}
.task-enter-from, .task-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
.task-move {
  transition: transform 0.3s;
}
</style>
