<template>
  <div class="expense-item">
    <div>{{ expense.name }}</div>
    <div>{{ expense.amount !== undefined && expense.amount !== null ? expense.amount.toLocaleString() : '' }} VNĐ</div>
    <div>{{ expense.category }}</div>
    <div>{{ expense.date }}</div>
    <button @click.stop="emitDelete" class="delete-btn">Xóa</button>
  </div>
</template>

<script>
export default {
  name: 'ExpenseItem',
  props: {
    expense: {
      type: Object,
      required: true,
    },
  },
  methods: {
    emitDelete() {
      this.$emit('delete', this.expense.id);
    },
  },
};
</script>

<style scoped>
.expense-item {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  border-bottom: 1px solid #ddd;
}
.delete-btn {
  background-color: #ff4444;
  color: white;
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.delete-btn:hover {
  background-color: #cc0000;
}
</style>
