<template>
  <form @submit.prevent="onSubmit" class="task-form">
    <input
      type="text"
      v-model="title"
      placeholder="Nhập công việc mới"
      required
      class="task-input"
    />
    <button type="submit" class="add-btn">Thêm</button>
  </form>
</template>

<script>
export default {
  name: 'TaskForm',
  data() {
    return {
      title: ''
    }
  },
  methods: {
    onSubmit() {
      if (this.title.trim()) {
        this.$emit('add', this.title.trim())
        this.title = ''
      }
    }
  }
}
</script>

<style scoped>
.task-form {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.task-input {
  flex: 1;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.add-btn {
  padding: 8px 16px;
  font-size: 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.add-btn:hover {
  background-color: #369870;
}
</style>
