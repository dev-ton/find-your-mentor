import { createRouter, createWebHistory } from 'vue-router'

// import MentorDetail from './pages/mentors/MentorDetail'
import MentorsList from './pages/mentors/MentorsList'
// import MentorRegistration from './pages/mentors/MentorRegistration'
// import ContactMentor from './pages/requests/ContactMentor'
// import RequestReceived from './pages/requests/RequestReceived'
// import UserAuth from './pages/auth/UserAuth'
import NotFound from './pages/NotFound'
import store from './store/index'

const MentorDetail = () => import('./pages/mentors/MentorDetail')
const MentorRegistration = () => import('./pages/mentors/MentorRegistration')
const ContactMentor = () => import('./pages/requests/ContactMentor')
const RequestReceived = () => import('./pages/requests/RequestReceived')
const UserAuth = () => import('./pages/auth/UserAuth')

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/mentors'},
        { path: '/mentors', component: MentorsList },
        { path: '/mentors/:id',
          component: MentorDetail,
          props: true,
          children: [
            { path: 'contact', component: ContactMentor } // mentors/id/contact
        ]},
        { path: '/register', component: MentorRegistration, meta: { requiresAuth: true }},
        { path: '/requests', component: RequestReceived, meta: { requiresAuth: true }  },
        { path: '/auth', component: UserAuth, meta: { requiresUnauth: true }  },
        { path: '/:notFound(.*)', component: NotFound }
    ]
})

router.beforeEach(function(to, _, next) {
    if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next('/auth')
    } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
            next('/mentors')
        } else {
            next()
        }
})


export default router