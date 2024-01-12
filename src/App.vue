<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import MainMessage from './components/MainMessage.vue'
import { ref, type Ref } from 'vue'
const logo: Ref<HTMLImageElement | null> = ref(null)

const changeLogo = (name: string) => {
  if (!logo.value) {
    return
  }

  let image = 'cha-bubbles-two-svgrepo-com.svg';

  switch (name) {
    case 'chat':
      image = 'cha-bubbles-two-svgrepo-com.svg'
      break
    case 'draw':
      image = 'des-palette-svgrepo-com.svg'
      break
    case 'translate':
      image = 'cha-translate-2-svgrepo-com.svg'
      break
    case 'about':
      image = 'clo-bowler-svgrepo-com.svg'
      break
  }

  logo.value.src = logo.value.src.replace(/\/assets\/.*.svg/, `/assets/${image}`)
}
</script>

<template>
  <header>
    <img
      alt="Chat logo"
      ref="logo"
      id="logo"
      src="@/assets/cha-bubbles-two-svgrepo-com.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <MainMessage />

      <nav>
        <RouterLink to="/" @click="changeLogo('chat')">Chat</RouterLink>
        <RouterLink to="/draw" @click="changeLogo('draw')">Draw</RouterLink>
        <RouterLink to="/vue" @click="changeLogo('translate')">Translate</RouterLink>
        <RouterLink to="/about" @click="changeLogo('about')">About</RouterLink>
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
