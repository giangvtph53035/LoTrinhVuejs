<template>
  <div>
    <h2 class="text-xl font-bold">{{ project.title }}</h2>
    <p class="mb-2">{{ project.description }}</p>
    <div class="flex gap-4 mb-4">
      <router-link class="text-blue-600 hover:underline" :to="`/projects/${project.id}/tasks`">Nhiệm vụ</router-link>
      <router-link class="text-blue-600 hover:underline" :to="`/projects/${project.id}/edit`">Chỉnh sửa</router-link>
    </div>
    <div class="mt-4">
      <router-view />
    </div>
  </div>
</template>

<script>
import { inject, computed } from 'vue';
export default {
  name: 'ProjectDetail',
  props: ['id'],
  setup(props) {
    const projects = inject('projects');
    const project = computed(() => {
      const arr = projects.projects || projects.value || projects;
      if (!arr || !Array.isArray(arr)) return {};
      return arr.find(p => p.id == props.id) || {};
    });
    return { project };
  }
}
</script>
