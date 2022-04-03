export default {
  registermentor(state, payload) {
    state.mentors.push(payload);
  },
  setmentors(state, payload) {
    state.mentors = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  }
};