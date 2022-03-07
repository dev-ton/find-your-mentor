export default {
    async registerMentor(context, data) {
        const userId = context.rootGetters.userId
        const mentor = {
            firstName: data.first,
            lastName: data.last,
            description: data.desc,
            hourlyRate: data.rate,
            areas: data.areas
        }

        const token = context.rootGetters.token

        const response = await fetch(`https://vue-http-demo-43e7a-default-rtdb.europe-west1.firebasedatabase.app/mentors/${userId}.json?auth=` + token, {
            method: 'PUT',
            body: JSON.stringify(mentor)
        })

        const responseData = await response.json()

        if (!response.ok) {
            const error = Error(responseData.message || 'Fetching data failed!')
            throw error
        }

        context.commit('registerMentor', {
            ...mentor,
            id: userId
        })
    },
   async loadMentors(context, payload) {
        if (!payload.forceRefresh && !context.getters.shouldUpdate) {
            return
        }

       const response = await fetch(
           `https://vue-http-demo-43e7a-default-rtdb.europe-west1.firebasedatabase.app/mentors.json`
           )
        const responseData = await response.json()

        if (!response.ok) {
            // error ..
        }

        const mentors = []

        for (const key in responseData) {
            const mentor = {
                id: key,
                firstName: responseData[key].firstName,
                lastName: responseData[key].lastName,
                description: responseData[key].description,
                hourlyRate: responseData[key].hourlyRate,
                areas: responseData[key].areas
            }
            mentors.push(mentor)
        }

        context.commit('setMentors', mentors )
        context.commit('setFetchTimestamp')
    }
}