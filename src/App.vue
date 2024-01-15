<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import MainMessage from './components/MainMessage.vue'
import { ref, type Ref } from 'vue'

import chatImage from '@/assets/cha-bubbles-two-svgrepo-com.svg'
import drawImage from '@/assets/des-palette-svgrepo-com.svg'
import translateImage from '@/assets/cha-translate-2-svgrepo-com.svg'
import aboutImage from '@/assets/clo-bowler-svgrepo-com.svg'

interface PageLogo {
  name: string
  display: string
  image: string
}

const pageLogos: Ref<PageLogo[]> = ref([
  { name: 'chat', display: 'Chat', image: chatImage },
  { name: 'draw', display: 'Draw', image: drawImage },
  { name: 'translate', display: 'Translate', image: translateImage },
  { name: 'about', display: 'About', image: aboutImage }
])

const selectedPage: Ref<string> = ref('chat')

</script>

<template>
  <header>
    <div v-for="(pageLogo, index) in pageLogos" :key="index">
      <img
        :alt="pageLogo.display"
        :src="pageLogo.image"
        width="125"
        height="125"
        v-show="pageLogo.name == selectedPage"
      />
    </div>

    <div class="wrapper">
      <MainMessage />

      <nav>
        <RouterLink to="/" @click="selectedPage = 'chat'">Chat</RouterLink>
        <RouterLink to="/draw" @click="selectedPage = 'draw'">Draw</RouterLink>
        <RouterLink to="/vue" @click="selectedPage = 'translate'">Translate</RouterLink>
        <RouterLink to="/about" @click="selectedPage = 'about'">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
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
