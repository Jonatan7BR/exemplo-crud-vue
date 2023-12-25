import DetailsView from '@/views/DetailsView.vue';
import HomeView from '@/views/HomeView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: HomeView
		},
		{
			path: '/novo',
			component: DetailsView
		},
		{
			path: '/editar/:id',
			component: DetailsView
		}
	]
});

export default router;
