import { VueElement } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import Projects from '../views/Projects.vue'
import Project from '../views/Project.vue'

const routes = [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/projects',
      name: 'projects',
      component: Projects
    },
    {
      path: '/project/:id',
      name: 'project',
      component: Project
    },
  ]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })
  
  export default router