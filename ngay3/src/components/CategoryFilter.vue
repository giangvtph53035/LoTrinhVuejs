<template>
  <div class="category-filter">
    <label>Lọc theo danh mục: </label>
    <select v-model="selected">
      <option value="All">Tất cả</option>
      <option v-for="category in categories" :key="category" :value="category">
        {{ category }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'CategoryFilter',
  props: {
    categories: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
  },
  computed: {
    selected: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
  },
};
</script>

<style scoped>
.category-filter {
  margin-bottom: 16px;
}
select {
  padding: 4px;
  border-radius: 4px;
}
</style>
