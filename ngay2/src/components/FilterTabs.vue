<template>
  <div class="flex space-x-6 mb-6 justify-center">
    <button
      :class="[
        'px-6 py-2 text-lg cursor-pointer bg-transparent border-b-4 border-transparent focus:outline-none focus:border-blue-600 transition-colors duration-200',
        activeFilter === 'all' ? 'font-semibold border-blue-600 text-blue-600' : 'text-gray-600 hover:text-blue-600'
      ]"
      @click="$emit('change-filter', 'all')"
    >
      Tất cả
    </button>
    <button
      :class="[
        'px-6 py-2 text-lg cursor-pointer bg-transparent border-b-4 border-transparent focus:outline-none focus:border-blue-600 transition-colors duration-200',
        activeFilter === 'purchased' ? 'font-semibold border-blue-600 text-blue-600' : 'text-gray-600 hover:text-blue-600'
      ]"
      @click="$emit('change-filter', 'purchased')"
    >
      Đã mua
    </button>
    <button
      :class="[
        'px-6 py-2 text-lg cursor-pointer bg-transparent border-b-4 border-transparent focus:outline-none focus:border-blue-600 transition-colors duration-200',
        activeFilter === 'not-purchased' ? 'font-semibold border-blue-600 text-blue-600' : 'text-gray-600 hover:text-blue-600'
      ]"
      @click="$emit('change-filter', 'not-purchased')"
    >
      Chưa mua
    </button>
  </div>
</template>

<script>
export default {
  name: 'FilterTabs',
  props: {
    activeFilter: {
      type: String,
      required: true
    }
  },
  emits: ['change-filter']
}
</script>
