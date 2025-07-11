<template>
  <div class="flex flex-col items-center justify-center min-h-[60vh]">
    <div class="bg-white p-8 rounded shadow w-full max-w-xs">
      <h2 class="text-xl font-bold mb-4 text-center">Đăng nhập quản trị</h2>
      <form @submit.prevent="login">
        <input v-model="username" class="border p-2 rounded w-full mb-3" placeholder="Tài khoản" />
        <input v-model="password" type="password" class="border p-2 rounded w-full mb-3" placeholder="Mật khẩu" />
        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition">Đăng nhập</button>
      </form>
      <div v-if="error" class="text-red-500 mt-2 text-center">{{ error }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
      error: ''
    }
  },
  methods: {
    login() {
      if (this.username === 'admin' && this.password === '123456') {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify({ role: 'admin' }));
        this.$router.push('/projects');
      } else {
        this.error = 'Sai tài khoản hoặc mật khẩu!';
      }
    }
  }
}
</script>
