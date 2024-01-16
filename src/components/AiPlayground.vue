<script setup lang="ts">
import ChatInteraction from './ChatInteraction.vue'
import type { ChatSettings } from './ChatInteraction.vue'

import AskQuestion from './AskQuestion.vue'
import { ref } from 'vue'

const questions = ref<string[]>([])
const chatSettings = ref<ChatSettings>({
  systemPrompt: 'You are a helpful assistant.',
  assistantPrompt: 'You are a helpful assistant.',
  modelId: '@cf/meta/llama-2-7b-chat-int8'
})
</script>

<template>
  <div v-for="(question, index) in questions" :key="index">
    <ChatInteraction :question="question" :settings="chatSettings" />
  </div>

  <div id="playgroundSettings">
    <label for="systemPrompt">System Prompt</label>
    <input v-model="chatSettings.systemPrompt" />
    <label for="assistantPrompt">Assistant Prompt</label>
    <input v-model="chatSettings.assistantPrompt" />
    <label for="modelId">Model ID</label>
    <select v-model="chatSettings.modelId">
      <option value="@cf/meta/llama-2-7b-chat-fp16">Llama Full precision (fp16)</option>
      <option value="@cf/meta/llama-2-7b-chat-int8">Llama Quantized (int8)</option>
      <option value="@cf/mistral/mistral-7b-instruct-v0.1">Mistral-7b</option>
      <option value="@hf/thebloke/codellama-7b-instruct-awq">CodeLlama 7B</option>
    </select>
  </div>
  <AskQuestion placeholder="Ask the AI anything" @new-question="(q) => questions.push(q)" />
</template>
<style scoped>
label {
  display: block;
}
input {
  width: 100%;
}

#playgroundSettings {
  position: sticky;
  bottom: 80px;
  padding:1rem;
  z-index: 1;
  border: 1px solid grey;
}
</style>
