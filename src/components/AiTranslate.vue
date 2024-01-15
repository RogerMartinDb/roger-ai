<script setup lang="ts">
import TranslateInteraction from './TranslateInteraction.vue'
import AskQuestion from './AskQuestion.vue'
import { ref } from 'vue'

const questions = ref<string[]>([])
</script>

<template>
  <div v-for="(question, index) in questions" :key="index">
    <TranslateInteraction :question="question" />
  </div>

  <AskQuestion placeholder="Enter text to be translated" @new-question="(q) => questions.push(q)" />
</template>
