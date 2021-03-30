import Login from './views/auth/Login'
import Register from './views/auth/Register'
import Forgot from './views/auth/Forgot'
import Reset from './views/auth/Reset'
import Orders from './views/admin/Orders'

export const routes = [
	{
		path: '/orders',
		name: 'orders',
		component: Orders,
		layout: '/admin',
	},
	{
		path: '/login',
		name: 'login',
		component: Login,
		layout: '/auth',
	},
	{
		path: '/register',
		name: 'register',
		component: Register,
		layout: '/auth',
	},
	{
		path: '/forgot',
		name: 'forgot',
		component: Forgot,
		layout: '/auth',
	},
	{
		path: '/set/:token',
		name: 'reset_token',
		component: Reset,
		layout: '/auth',
	},
]
