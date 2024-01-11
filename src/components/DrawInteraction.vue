<script setup lang="ts">
import { toRefs } from 'vue'

const props = defineProps<{
  prompt: string
}>()

const { prompt } = toRefs(props)

const apiUrl = (prompt: string) => {
  const url = new URL(document.location.href)
  url.pathname = '/image'
  url.searchParams.set('prompt', prompt)
  return url
}

</script>

<template>
  <div class="interaction">
    <div class="question">
      <div class="actor">You</div>
      <div class="questionText">{{ prompt }}</div>
    </div>
    <div class="answer">
      <div class="actor">Model</div>
      <img v-bind:src="apiUrl(prompt).toString()" />
    </div>
  </div>
</template>

<style scoped>
.interaction {
  margin-bottom: 100px;
}

.actor {
  font-weight: bold;
}

.questionText {
  background-color: lightgray;
}
.answer {
  margin-top: 4px;
}
</style>
