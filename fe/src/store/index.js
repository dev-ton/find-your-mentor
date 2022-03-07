import { createStore } from 'vuex'

import mentorsModule from './modules/mentors/index'
import requestsModule from './modules/requests/index'
import authModule from './modules/auth/index'

const store = createStore({
    modules: {
        mentors: mentorsModule,
        requests: requestsModule,
        auth: authModule
    },
})

export default store