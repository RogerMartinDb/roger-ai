<script setup lang="ts">
import { ref, toRefs } from 'vue'
import {EventSourcePost} from '@/utils/EventSourcePost.ts'

const props = defineProps<{
  question: string
}>()

const { question } = toRefs(props)
const answer = ref<string>('')

const init = () => {
  const task = {
    question: question.value,
    modelId: '@cf/meta/llama-2-7b-chat-int8'
  }

  const url = `https://ai.bimis.net/stream`
  const source = new EventSourcePost(url)
  source.onmessage = (event) => {
    if (event.data === '[DONE]') {
      source.close()
      return
    }
    const data = JSON.parse(event.data)
    answer.value += data.response
  }
  source.post(task)
}

init()
</script>

<template>
  <div class="interaction">
    <div class="question">
      <div class="actor">You</div>
      <div class="questionText">{{ question }}</div>
    </div>
    <div class="answer">
      <div class="actor">Model</div>
      <div class="answerText" v-html="answer"></div>
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
