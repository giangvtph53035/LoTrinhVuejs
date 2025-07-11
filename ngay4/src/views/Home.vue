<template>
  <div class="text-center mt-10">
    <h1 class="text-3xl font-bold mb-6">Chào mừng đến với Quản lý Dự án</h1>
    <router-link to="/projects">
      <button class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">Xem danh sách dự án</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>
