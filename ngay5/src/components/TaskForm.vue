<template>
  <transition name="form" appear>
    <form
      class="flex gap-2 mb-4 animate__animated animate__bounceIn"
      @submit.prevent="submitTask"
    >
      <input
        v-model="title"
        type="text"
        placeholder="Nhập công việc..."
        class="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-base sm:text-lg transition-all duration-150"
      />
      <button
        type="submit"
        :class="[
          'px-5 py-2 rounded-lg font-semibold shadow-sm transition-colors duration-150',
          isValid ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        ]"
        :disabled="!isValid"
      >Thêm</button>
    </form>
  </transition>
</template>

<script setup>
import { ref, computed } from 'vue';
// eslint-disable-next-line
const emit = defineEmits(['submit']);
const title = ref('');
const isValid = computed(() => title.value.trim().length > 0);
function submitTask() {
  if (isValid.value) {
    emit('submit', title.value.trim());
    title.value = '';
  }
}

</script>

<style scoped>
.form-enter-active, .form-leave-active {
  transition: opacity 0.3s;
}
.form-enter-from, .form-leave-to {
  opacity: 0;
}
</style>
