<template>
  <div>
    <h2>{{ isEdit ? 'Edit Project' : 'Add Project' }}</h2>
    <ProjectForm :project="project" :isEdit="isEdit" @submit="onSubmit" />
  </div>
</template>

<script>
import { inject, computed, getCurrentInstance } from 'vue';
import ProjectForm from '../components/ProjectForm.vue';

export default {
  name: 'ProjectFormView',
  components: { ProjectForm },
  props: ['id'],
  setup(props) {
    const projects = inject('projects');
    const addProject = inject('addProject');
    const updateProject = inject('updateProject');
    const isEdit = computed(() => !!props.id);
    const project = computed(() => {
      if (!projects || !projects.value) return {};
      return projects.value.find(p => p.id == props.id) || {};
    });
    // Lấy router instance đúng chuẩn
    const internalInstance = getCurrentInstance();
    const router = internalInstance && internalInstance.proxy && internalInstance.proxy.$router;
    function onSubmit(data) {
      if (isEdit.value) {
        updateProject({ ...project.value, ...data });
      } else {
        addProject(data);
      }
      if (router) {
        router.push('/projects');
      }
    }
    return { project, isEdit, onSubmit };
  }
}
</script>
