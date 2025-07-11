<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Danh sách dự án</h2>
    <ProjectItem
      v-for="project in filteredProjects"
      :key="project.id"
      :project="project"
      @view="viewProject"
      @delete="handleDeleteProject"
    />
  </div>
</template>

<script>
import { inject, computed } from 'vue';
import ProjectItem from '../components/ProjectItem.vue';

export default {
  name: 'ProjectsView',
  components: { ProjectItem },
  setup() {
    const projects = inject('projects');
    const deleteProject = inject('deleteProject');
    const router = inject('router') || null;
    function viewProject(id) {
      if (router && router.push) {
        router.push({ name: 'project-detail', params: { id } });
      } else {
        window.location.href = `/projects/${id}`;
      }
    }
    function handleDeleteProject(id) {
      if (confirm('Bạn có chắc muốn xóa dự án này?')) {
        deleteProject(id);
        // Nếu đang ở chi tiết dự án vừa xóa thì quay về danh sách
        if (router && router.currentRoute && router.currentRoute.value.params.id == id) {
          router.push('/projects');
        }
      }
    }
    const filteredProjects = computed(() => {
      const arr = projects.projects || projects;
      return Array.isArray(arr) ? arr.filter(p => p && (p.title || p.description)) : [];
    });
    return { projects, filteredProjects, viewProject, handleDeleteProject };
  }
}
</script>
