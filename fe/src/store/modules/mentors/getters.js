export default {
    mentors(state) {
        return state.mentors
    },
    hasMentors(state) {
        return state.mentors && state.mentors.length > 0
    },
    isMentor(_, getters, _2, rootGetters) {    // better approach would to add new state 'userIsCoach = true/false'
        const mentors = getters.mentors
        const userId = rootGetters.userId
        return mentors.some(mentor => mentor.id === userId)
    },
    shouldUpdate(state) {
        const lastFetch = state.lastFetch
        if (!lastFetch) {
            return true
        }
        const currentTimestamp = new Date().getTime()
        return (currentTimestamp - lastFetch) / 1000 > 60  // if more than minute passed, it will update again
    }
}