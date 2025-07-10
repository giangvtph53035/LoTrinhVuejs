<template>
  <nav class="bg-green-600 text-white p-4 flex items-center justify-between font-bold text-xl rounded-t-lg shadow-md">
    <h1 class="ml-4">Ứng dụng Quản lý Danh sách Mua sắm</h1>
    <button @click="$emit('add-new-item')" class="mr-4 px-4 py-2 text-base cursor-pointer bg-white text-green-600 rounded hover:bg-gray-200 transition duration-200">
      Thêm mặt hàng
    </button>
  </nav>
</template>

<script>
export default {
  name: 'AppNavbar'
}
</script>
