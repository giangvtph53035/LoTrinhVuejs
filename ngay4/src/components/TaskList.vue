<template>
  <div class="p-2">
    <div v-if="tasks && tasks.length">
      <div v-for="task in tasks" :key="task.id" class="border-b py-2">
        <span>{{ task.title }}</span>
      </div>
    </div>
    <div v-else class="text-gray-500 italic">Không có nhiệm vụ nào.</div>
  </div>
</template>

<script>
export default {
  name: 'TaskList',
  props: {
    tasks: Array
  }
}
</script>


