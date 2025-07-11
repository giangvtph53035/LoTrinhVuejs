<template>
  <div class="expense-list">
    <ExpenseItem
      v-for="expense in sortedExpenses"
      :key="expense.id"
      :expense="expense"
      @delete="$emit('delete', $event)"
    />
  </div>
</template>

<script>
import ExpenseItem from './ExpenseItem.vue';

export default {
  name: 'ExpenseList',
  components: { ExpenseItem },
  props: {
    expenses: {
      type: Array,
      required: true,
    },
  },
  computed: {
    sortedExpenses() {
      return [...this.expenses].sort((a, b) => new Date(b.date) - new Date(a.date));
    },
  },
};
</script>

<style scoped>
.expense-list {
  margin-top: 16px;
}
</style>
