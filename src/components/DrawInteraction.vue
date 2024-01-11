<script setup lang="ts">
import { ref, toRefs } from 'vue'

const props = defineProps<{
  prompt: string
}>()

const { prompt } = toRefs(props)
const drawing = ref<string>('')

const init = async () => {
  const task = {
    prompt: prompt.value
  }

  fetch(apiUrl(), {
    body: JSON.stringify(task),
    method: 'POST'
  })
  .then(response => response.text())
  .then(bodyString => drawing.value = bodyString)
}

const apiUrl = () => {
  return '/image'
}

init()
</script>

<template>
  <div class="interaction">
    <div class="question">
      <div class="actor">You</div>
      <div class="questionText">{{ prompt }}</div>
    </div>
    <div class="answer">
      <div class="actor">Model</div>
      <img v-bind:src="drawing" />
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
