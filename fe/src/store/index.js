import { createStore } from 'vuex';

import mentorsModule from './modules/mentors/index.js';
import requestsModule from './modules/requests/index.js';
import authModule from './modules/auth/index.js';

const store = createStore({
  modules: {
    mentors: mentorsModule,
    requests: requestsModule,
    auth: authModule
  }
});

export default store;