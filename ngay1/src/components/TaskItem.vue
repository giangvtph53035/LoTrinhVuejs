<template>
  <li :class="{ completed: task.completed }" class="task-item">
    <label>
      <input type="checkbox" :checked="task.completed" @change="$emit('toggle', task.id)" />
      <span>{{ task.title }}</span>
    </label>
    <button @click="$emit('delete', task.id)" class="delete-btn">Xóa</button>
  </li>
</template>

<script>
export default {
  name: 'TaskItem',
  props: {
    task: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.task-item {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  border-bottom: 1px solid #ddd;
  align-items: center;
}

.task-item.completed span {
  text-decoration: line-through;
  color: #888;
}

.delete-btn {
  background-color: transparent;
  border: none;
  color: #c00;
  cursor: pointer;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.delete-btn:hover {
  background-color: #fdd;
}
</style>
