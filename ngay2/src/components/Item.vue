<template>
  <div :class="['flex justify-between items-center p-2 border-b border-gray-300', item.purchased ? 'line-through text-gray-500' : '']">
    <input type="checkbox" :checked="item.purchased" @change="$emit('toggle', item.id)" />
    <span class="flex-grow ml-2">{{ item.name }} (x{{ item.quantity }})</span>
    <button @click="$emit('edit', item)" class="ml-2 px-2 py-1 border rounded hover:bg-gray-200">Sửa</button>
    <button @click="$emit('delete', item.id)" class="ml-2 px-2 py-1 border rounded hover:bg-gray-200">Xóa</button>
  </div>
</template>

<script>
export default {
  name: 'AppItem',
  props: {
    item: {
      type: Object,
      required: true,
      validator(value) {
        return Object.prototype.hasOwnProperty.call(value, 'id') &&
               Object.prototype.hasOwnProperty.call(value, 'name') &&
               Object.prototype.hasOwnProperty.call(value, 'purchased');
      }
    }
  },
  emits: ['toggle', 'edit', 'delete']
}
</script>
