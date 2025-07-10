<template>
  <form @submit.prevent="onSubmit" class="flex gap-3 mb-6 items-center justify-center">
    <input
      type="text"
      v-model="formData.name"
      placeholder="Tên mặt hàng"
      required
      class="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
    <input
      type="number"
      v-model.number="formData.quantity"
      min="1"
      placeholder="Số lượng"
      required
      class="w-24 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
    <button
      type="submit"
      class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
    >
      {{ initialData ? 'Cập nhật' : 'Thêm' }}
    </button>
  </form>
</template>

<script>
export default {
  name: 'ItemForm',
  props: {
    initialData: {
      type: Object,
      required: false,
      default: () => ({ name: '', quantity: 1, purchased: false })
    }
  },
  emits: ['submit'],
  data() {
    return {
      formData: { ...this.initialData }
    }
  },
  methods: {
    onSubmit() {
      this.$emit('submit', { ...this.formData });
      this.formData = { name: '', quantity: 1, purchased: false };
    }
  }
}
</script>
