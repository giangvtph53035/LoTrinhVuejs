<template>
  <div class="container">
    <h1 class="text-2xl font-bold mb-4">Quản lý Chi tiêu Cá nhân</h1>
    <CategoryFilter
      v-model="selectedCategory"
      :categories="categories"
    />
    <ExpenseForm @submit="addExpense" />
    <div class="total">
      Tổng chi tiêu: {{ totalAmount.toLocaleString() }} VNĐ
    </div>
    <ExpenseList :expenses="filteredExpenses" @delete="deleteExpense" />
  </div>
</template>

<script>
import ExpenseForm from './components/ExpenseForm.vue';
import ExpenseList from './components/ExpenseList.vue';
import CategoryFilter from './components/CategoryFilter.vue';

export default {
  name: 'App',
  components: { ExpenseForm, ExpenseList, CategoryFilter },
  data() {
    return {
      expenses: [],
      categories: ['Food', 'Transport', 'Entertainment', 'Other'],
      selectedCategory: 'All',
    };
  },
  computed: {
    filteredExpenses() {
      if (this.selectedCategory === 'All') return this.sortedExpenses;
      return this.sortedExpenses.filter(expense => expense.category === this.selectedCategory);
    },
    sortedExpenses() {
      return [...this.expenses].sort((a, b) => new Date(b.date) - new Date(a.date));
    },
    totalAmount() {
      return this.filteredExpenses.reduce((sum, expense) => {
        const amount = typeof expense.amount === 'number' && !isNaN(expense.amount) ? expense.amount : 0;
        return sum + amount;
      }, 0);
    },
  },
  watch: {
    expenses: {
      handler(newExpenses) {
        localStorage.setItem('expenses', JSON.stringify(newExpenses));
      },
      deep: true,
    },
  },
  created() {
    const savedExpenses = localStorage.getItem('expenses');
    if (savedExpenses) {
      let parsedExpenses = JSON.parse(savedExpenses);
      parsedExpenses = parsedExpenses.filter(expense =>
        expense &&
        expense.id &&
        expense.name &&
        typeof expense.amount === 'number' &&
        !isNaN(expense.amount) &&
        expense.category &&
        expense.date
      );
      this.expenses = parsedExpenses;
    }
  },
  methods: {
    addExpense(expense) {
      if (
        expense &&
        expense.name &&
        typeof expense.amount === 'number' &&
        !isNaN(expense.amount) &&
        expense.category &&
        expense.date
      ) {
        this.expenses.push({ ...expense, id: Date.now() });
      }
    },
    deleteExpense(id) {
      this.expenses = this.expenses.filter(expense => expense.id !== id);
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 16px;
}
.total {
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 16px;
}
</style>
