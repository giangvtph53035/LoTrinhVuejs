import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Projects from '../views/Projects.vue';
import ProjectDetail from '../views/ProjectDetail.vue';
import ProjectForm from '../views/ProjectForm.vue';
import Tasks from '../views/Tasks.vue';
import Login from '../views/Login.vue';

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/login', name: 'login', component: Login },
  { path: '/projects', name: 'projects', component: Projects, meta: { requiresAuth: true } },
  {
    path: '/projects/new',
    name: 'project-new',
    component: ProjectForm,
    beforeEnter: (to, from, next) => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.role === 'admin') {
        next();
      } else {
        next('/projects');
      }
    }
  },
  {
    path: '/projects/:id',
    name: 'project-detail',
    component: ProjectDetail,
    props: true,
    meta: { requiresAuth: true },
    children: [
      { path: 'tasks', name: 'project-tasks', component: Tasks, props: true },
      { path: 'edit', name: 'project-edit', component: ProjectForm, props: true },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next('/');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;