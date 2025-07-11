<template>
  <div class="max-w-2xl mx-auto p-4">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import { reactive, toRefs, watch } from 'vue';

export default {
  components: { Navbar },
  setup() {
    const state = reactive({
      projects: []
    });
    // Load from localStorage
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      state.projects = JSON.parse(savedProjects);
    }
    // Fake authentication
    if (!localStorage.getItem('isAuthenticated')) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify({ role: 'admin' }));
    }
    // Sync to localStorage
    watch(() => state.projects, (newVal) => {
      localStorage.setItem('projects', JSON.stringify(newVal));
    }, { deep: true });
    function addProject(project) {
      state.projects.push({ ...project, id: Date.now(), tasks: [] });
    }
    function updateProject(updatedProject) {
      const index = state.projects.findIndex((p) => p.id === updatedProject.id);
      if (index !== -1) state.projects[index] = updatedProject;
    }
    function deleteProject(id) {
      const idx = state.projects.findIndex((p) => p.id === id);
      if (idx !== -1) state.projects.splice(idx, 1);
    }
    return {
      ...toRefs(state),
      addProject,
      updateProject,
      deleteProject
    };
  },
  provide() {
    return {
      projects: this.projects,
      addProject: this.addProject,
      updateProject: this.updateProject,
      deleteProject: this.deleteProject,
    };
  }
};
</script>