<script setup lang="ts">
import ChatInteraction from './ChatInteraction.vue'
import AskQuestion from './AskQuestion.vue'
import { ref } from 'vue'

const questions = ref<string[]>([])
</script>

<template>
  <div v-for="(question, index) in questions" :key="index">
    <ChatInteraction :question="question" :settings="undefined"/>
  </div>

  <AskQuestion placeholder="Ask the AI anything" @new-question="(q) => questions.push(q)" />
</template>
