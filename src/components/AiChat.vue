<script setup lang="ts">
import ChatInteraction from './ChatInteraction.vue'
import { ref } from 'vue'

const questions = ref<string[]>([])
const nextQuestion = ref('')

const ask = () => {
  questions.value.push(nextQuestion.value)
  nextQuestion.value = ''

  window.setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 0)
}

const askOnCtrlEnter = (event: KeyboardEvent) => {
  if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
    ask()
  }
}
</script>

<template>
  <div id="conversation">
    <div v-for="(question, index) in questions" :key="index">
      <ChatInteraction :question="question" />
    </div>
  </div>

  <div class="input-area">
    <form>
      <textarea
        class="main-input"
        v-model="nextQuestion"
        @keydown="askOnCtrlEnter"
        autofocus
        placeholder="Ask the AI anything"
        type="text"
      ></textarea>
      <button @click="ask" type="button">Ask</button>
    </form>
  </div>
</template>

<style scoped>
.input-area {
  bottom: 0px;
  position: fixed;
  gap: 20px;
  margin: 0 auto;
  width: min(80vw, 600px);
  background-color: rgba(255, 255, 255, 1);
  padding: 20px;
}

.main-input {
  flex: 1;
  padding: 5px;
  width: 80%;
}
</style>
