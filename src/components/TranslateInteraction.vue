<script setup lang="ts">
import { onMounted, ref, toRefs, type Ref } from 'vue'

const props = defineProps<{
  question: string
}>()

const { question } = toRefs(props)
const answer = ref<string>('')

const init = () => {
  const task = {
    text: question.value,
    from: 'english',
    to: 'spanish',
    detect: true
  }

  const url = apiUrl()

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  })
    .then((response) => response.json())
    .then((translation) => {
      answer.value = translation.translated_text
    })
    .catch((error) => console.log(error))
}

const apiUrl = () => {
  if (document.location.hostname === 'localhost') {
    return 'https://ai.bimis.net/translate'
  } else {
    return '/translate'
  }
}

init()

const me: Ref<HTMLDivElement | null> = ref(null)

onMounted(() => {
  me.value?.scrollIntoView()
})
</script>

<template>
  <div class="interaction" ref="me">
    <div class="question">
      <div class="actor">You</div>
      <div class="questionText">{{ question }}</div>
    </div>
    <div class="answer">
      <div class="actor">Model</div>
      <div class="answerText">{{ answer }}</div>
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
