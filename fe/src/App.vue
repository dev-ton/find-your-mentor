<template>
    <the-header></the-header>
    <router-view v-slot="slotProps">
      <transition name="route" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
</template>

<script>
import TheHeader from './components/layout/TheHeader'
export default {
    components: {
        TheHeader
    },
    created(){
       this.$store.dispatch('tryLogin')
    },
    computed: {
      didAutoLogout() {
          return this.$store.getters.didAutoLogout
      }
    },
    watch: {
      didAutoLogout(curValue, oldValue) {
         if (curValue && curValue !== oldValue) {
           this.$router.replace('/mentors')
         }
      }
    }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
}

.route-enter-from {
  opacity:0;
  transform:translateY(-30px)
}

.route-leave-to {
  opacity:0;
  transform:translateY(30px)
}

.route-enter-active {
  transition: all ease-out .3s;
}

.route-leave-active {
  transition: all ease-in .3s;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform:translateY(0)
}


</style>