<template>
<div>
    <base-dialog :show="!!error" title="Error occurred" @close="handleError"> <!-- !! converts true String to Boolean -->
    <p>{{ error }}</p>
    </base-dialog>
    <section>
        <mentor-filter @change-filter="setFilters"/>
    </section>
    <section>
        <base-card>
        <div class="controls">
            <base-button mode="outline" @click="loadMentors(true)">Refresh</base-button>
            <base-button link to="/auth?redirect=register" v-if="!isLoggedIn">Login</base-button>
            <base-button v-if="isLoggedIn && !isMentor && !isLoading" link to="/register">Register as a Mentor</base-button>
        </div>
        <div v-if="isLoading">
            <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasMentors">
            <mentor-item
             v-for="mentor in filteredMentors" 
             :key="mentor.id" :id="mentor.id" 
             :first-name="mentor.firstName"
             :last-name="mentor.lastName"
             :rate="mentor.hourlyRate"
             :areas="mentor.areas"
             ></mentor-item>
        </ul>
        <h3 v-else>No mentors found</h3>
        </base-card>
    </section>
</div>
</template>

<script>
import MentorItem from '../../components/mentors/MentorItem'
import MentorFilter from '../../components/mentors/MentorFilter'

export default {
    data() {
        return {
            isLoading: false,
            error: null,
            activeFilters: {
                frontend: true,
                backend: true,
                career: true
            }
        }
    },
    components: {
        MentorItem,
        MentorFilter,
    },
    computed: {
        isLoggedIn () {
            return this.$store.getters.isAuthenticated
        },
        filteredMentors () {
            const mentors = this.$store.getters['mentors/mentors']
            return mentors.filter(mentor => {
                if (this.activeFilters.frontend && mentor.areas.includes('frontend')) {
                    return true
                }
                if (this.activeFilters.backend && mentor.areas.includes('backend')) {
                    return true
                }
                if (this.activeFilters.career && mentor.areas.includes('career')) {
                    return true
                }
                return false
            })
        },
        hasMentors () {
            return !this.isLoading && this.$store.getters['mentors/hasMentors']
        },
        isMentor() {
            return this.$store.getters['mentors/isMentor']
        }
    },
    created() {
        this.loadMentors()
    },
    methods: {
        setFilters(updatedFilters) {
            this.activeFilters = updatedFilters
        },
        async loadMentors(refresh = false) {
            this.isLoading = true
            try {
            await this.$store.dispatch('mentors/loadMentors', {forceRefresh: refresh})
            } catch (error) {
                this.error = error.message || 'Something went wrong!'
            }
            this.isLoading = false 
        },
        handleError() {
            this.error = null
        }
    },
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>