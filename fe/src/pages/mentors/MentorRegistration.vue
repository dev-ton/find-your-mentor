<template>
<div>
    <section>
        <base-card>
            <h2>Register as a Mentor now!</h2>
            <mentor-form @save-data="saveData"></mentor-form>
        </base-card>
    </section>
</div>
</template>
<script>
import MentorForm from '../../components/mentors/MentorForm'
export default {
    components: {
        MentorForm
    },
    methods: {
        saveData(data) {
            this.$store.dispatch('mentors/registerMentor', data)
            this.$router.replace('/mentors')
        }
    },
}
</script>