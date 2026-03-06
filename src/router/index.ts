import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import BaseLayout from '@/layouts/BaseLayout.vue';
import { useUserStore } from '@/stores/user';

const Login = () => import('@/views/Login.vue');
const Registro = () => import('@/views/Registro.vue');
const Seccion1 = () => import('@/views/secciones/Seccion1.vue');
const Seccion = () => import('@/views/secciones/Seccion.vue');
const DeviceHardware = () => import('@/views/DeviceHardware.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/seccion'
  },
  {
    path: '/login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/registro',
    component: Registro,
    meta: { requiresAuth: false }
  },
  {
    path: '/seccion',
    component: BaseLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: '/seccion/seccion1'
      },
      {
        path: 'seccion1',
        component: Seccion1
      },
      {
        path: 'hardware',
        component: DeviceHardware,
        meta: {
          title: 'Riksiri - Hardware del Dispositivo',
        }
      },
      {
        path: ':name',
        name: "seccion",
        component:  Seccion,
        meta: {
          title: 'Riksiri - Sección',
        }
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(), //import.meta.env.BASE_URL
  routes
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const isAuthenticated = !!userStore.authToken;
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else if(isAuthenticated && !to.meta.requiresAuth) {
    next('/seccion/seccion1');
  } else {
    next();
  }
});

export default router
