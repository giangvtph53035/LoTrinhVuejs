<template>
  <transition name="task-item" appear>
    <li
      :class="[
        'flex justify-between items-center px-4 py-3 border-b bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-200 animate__animated',
        addedAnimation,
        { 'line-through text-gray-400': task.completed, 'opacity-60': task.completed }
      ]"
      :style="{ backgroundColor: task.completed ? '#f3f4f6' : '' }"
    >
      <div class="flex items-center gap-3 w-full">
        <input
          type="checkbox"
          class="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-400 transition-all duration-150 mr-2"
          :checked="task.completed"
          @change="$emit('toggle', task.id)"
        />
        <span class="truncate text-base sm:text-lg select-text">{{ task.title }}</span>
      </div>
      <button
        class="ml-3 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-red-100 hover:bg-red-500 text-red-500 hover:text-white transition-colors duration-200 shadow-sm"
        title="Xóa công việc"
        @click="$emit('delete', task.id)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </li>
  </transition>
</template>

<script setup>
import { ref, onMounted } from 'vue';
// eslint-disable-next-line
const props = defineProps({
  task: Object
});
const addedAnimation = ref('');
onMounted(() => {
  addedAnimation.value = 'animate__fadeIn';
});
</script>

<style scoped>
.task-item-enter-active {
  transition: all 0.3s;
}
.task-item-enter-from {
  transform: scale(0.8);
  opacity: 0;
}
</style>
