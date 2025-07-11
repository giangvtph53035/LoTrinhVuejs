<template>
  <div class="flex items-center justify-between p-4 border-b border-gray-200">
    <div>
      <h3 class="text-lg font-semibold text-gray-800">{{ project.title }}</h3>
      <p class="text-gray-600">{{ project.description }}</p>
    </div>
    <div class="flex gap-2">
      <button 
        @click="$emit('view', project.id)"
        class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        View
      </button>
      <button 
        @click="$emit('delete', project.id)"
        class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectItem',
  props: {
    project: Object
  }
}
</script>