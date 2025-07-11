<template>
  <form class="flex flex-col gap-3 mb-4 bg-white p-4 rounded shadow" @submit.prevent="onSubmit">
    <input v-model="form.title" placeholder="Tiêu đề dự án" required class="border p-2 rounded" />
    <textarea v-model="form.description" placeholder="Mô tả dự án" required class="border p-2 rounded"></textarea>
    <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">{{ isEdit ? 'Cập nhật' : 'Thêm mới' }} dự án</button>
  </form>
</template>

<script>
export default {
  name: 'ProjectForm',
  props: {
    project: Object,
    isEdit: Boolean
  },
  data() {
    return {
      form: {
        title: this.project ? this.project.title : '',
        description: this.project ? this.project.description : ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$emit('submit', { ...this.form });
      // Reset form nếu là thêm mới
      if (!this.isEdit) {
        this.form.title = '';
        this.form.description = '';
      }
    }
  },
  watch: {
    project: {
      handler(newVal) {
        if (newVal) {
          this.form.title = newVal.title;
          this.form.description = newVal.description;
        }
      },
      immediate: true
    }
  }
}
</script>


