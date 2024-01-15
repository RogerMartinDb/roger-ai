<script setup lang="ts">
import { onMounted, ref, toRefs, type Ref } from 'vue'
import {EventSourcePost} from '@/utils/EventSourcePost.ts'

//define new type called ChatSettings that is available in other scripts that import this one
export type ChatSettings = {
  systemPrompt: string
  assistantPrompt: string
  modelId: string
}

const props = defineProps<{
  question: string
  settings: ChatSettings | undefined
}>()

const { question, settings } = toRefs(props)
const answer = ref<string>('')

const init = () => {
  const task = {
    question: question.value,
    modelId: settings.value?.modelId || '@cf/meta/llama-2-7b-chat-int8',
    systemPrompt: settings.value?.systemPrompt || 'You are a helpful assistant.',
    assistantPrompt: settings.value?.assistantPrompt || 'You are a helpful assistant.'
  }

  const url = apiUrl()
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

const apiUrl = () => {
  if (document.location.hostname === "localhost"){
    return "https://ai.bimis.net/stream"
  }
  else {
    return "/stream"
  }
}

init()

const me: Ref<HTMLDivElement | null> = ref(null);

onMounted(() => {
  me.value?.scrollIntoView()
});
</script>

<template>
  <div class="interaction" ref="me">
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
