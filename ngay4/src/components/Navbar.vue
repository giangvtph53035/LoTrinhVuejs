
<template>
  <nav class="flex gap-4 p-4 bg-blue-600 text-white items-center">
    <router-link class="hover:underline" to="/">Trang chủ</router-link>
    <router-link class="hover:underline" to="/projects">Dự án</router-link>
    <router-link class="hover:underline" to="/projects/new">Thêm dự án</router-link>
    <span class="flex-1"></span>
    <button v-if="isAuthenticated" @click="logout" class="ml-auto bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200 transition">Đăng xuất</button>
    <router-link v-else class="hover:underline" to="/login">Đăng nhập</router-link>
  </nav>
</template>

<script>
export default {
  name: 'AppNavbar',
  data() {
    return {
      isAuthenticated: localStorage.getItem('isAuthenticated') === 'true'
    }
  },
  mounted() {
    window.addEventListener('storage', this.syncAuth);
  },
  beforeUnmount() {
    window.removeEventListener('storage', this.syncAuth);
  },
  methods: {
    logout() {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
      this.isAuthenticated = false;
      this.$router.push('/login');
    },
    syncAuth() {
      this.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    }
  }
}
</script>


