<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <!-- <RouterLink to="/about">About</RouterLink> -->
      <RouterLink to="/login">Login</RouterLink>
      <RouterLink to="/registration">Registration</RouterLink>
      <RouterLink to="/download-map">Download Data</RouterLink>
      <RouterLink @click="handlerSignOut" v-if="isLoggedIn" to="/">Sign Out</RouterLink>
    </nav>
  </header>
  <RouterView></RouterView>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted } from 'vue'
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

const isLoggedIn = ref(false)

let auth
onMounted(() => {
  auth = getAuth()

  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true
    } else {
      isLoggedIn.value = false
    }
  })
})

const handlerSignOut = () => {
  signOut(auth).then(() => {
    router.push('/')
  })
}
</script>

<style scoped>
header {
  margin: 2rem 25%;
}

/* nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
} */

nav a.router-link-exact-active {
  /* color: var(--color-text); */
  color: rgb(107, 172, 3);
  align-items: center;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
