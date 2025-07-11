<template>
  <form @submit.prevent="submitForm" class="expense-form">
    <div class="form-group">
      <label>Tên khoản chi</label>
      <input
        v-model="form.name"
        @keyup.enter="submitForm"
        type="text"
        placeholder="Nhập tên khoản chi"
      />
      <span v-if="errors.name" class="error">{{ errors.name }}</span>
    </div>
    <div class="form-group">
      <label>Số tiền</label>
      <input v-model.number="form.amount" type="number" placeholder="Nhập số tiền" />
      <span v-if="errors.amount" class="error">{{ errors.amount }}</span>
      <span v-if="amountWarning" class="warning">Cảnh báo: Số tiền vượt quá 1,000,000 VNĐ</span>
    </div>
    <div class="form-group">
      <label>Danh mục</label>
      <select v-model="form.category">
        <option disabled value="">Chọn danh mục</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
      <span v-if="errors.category" class="error">{{ errors.category }}</span>
    </div>
    <div class="form-group">
      <label>Ngày</label>
      <input v-model="form.date" type="date" />
      <span v-if="errors.date" class="error">{{ errors.date }}</span>
    </div>
    <button type="submit" :disabled="hasErrors" class="submit-btn">Thêm khoản chi</button>
  </form>
</template>

<script>
export default {
  name: 'ExpenseForm',
  data() {
    return {
      form: {
        name: '',
        amount: null,
        category: '',
        date: '',
      },
      errors: {
        name: '',
        amount: '',
        category: '',
        date: '',
      },
      amountWarning: false,
      categories: ['Food', 'Transport', 'Entertainment', 'Other'],
    };
  },
  computed: {
    hasErrors() {
      return Object.values(this.errors).some(error => error !== '');
    },
  },
  watch: {
    'form.amount'(value) {
      this.amountWarning = value > 1000000;
      this.validateAmount();
    },
    'form.name': 'validateName',
    'form.category': 'validateCategory',
    'form.date': 'validateDate',
  },
  methods: {
    validateName() {
      this.errors.name =
        this.form.name.length < 3 ? 'Tên phải có ít nhất 3 ký tự' : '';
    },
    validateAmount() {
      this.errors.amount =
        !this.form.amount || this.form.amount <= 0
          ? 'Số tiền phải là số dương'
          : '';
    },
    validateCategory() {
      this.errors.category = !this.form.category ? 'Vui lòng chọn danh mục' : '';
    },
    validateDate() {
      const today = new Date().toISOString().split('T')[0];
      this.errors.date =
        this.form.date > today ? 'Ngày không được là ngày trong tương lai' : '';
    },
    submitForm() {
      this.validateName();
      this.validateAmount();
      this.validateCategory();
      this.validateDate();
      if (!this.hasErrors) {
        // Chuẩn hóa dữ liệu trước khi emit
        const expenseData = {
          name: this.form.name.trim(),
          amount: Number(this.form.amount),
          category: this.form.category,
          date: this.form.date || new Date().toISOString().split('T')[0], // nếu không chọn ngày thì lấy ngày hiện tại
        };
        this.$emit('submit', expenseData);
        this.form = { name: '', amount: null, category: '', date: '' };
        this.errors = { name: '', amount: '', category: '', date: '' };
      }
    },
  },
};
</script>

<style scoped>
.expense-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}
.form-group {
  display: flex;
  flex-direction: column;
}
.error {
  color: red;
  font-size: 0.8em;
}
.warning {
  color: orange;
  font-size: 0.8em;
}
.submit-btn {
  background-color: #4caf50;
  color: white;
  padding: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.submit-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
