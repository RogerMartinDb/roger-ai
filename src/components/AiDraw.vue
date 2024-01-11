<script setup lang="ts">
import DrawInteraction from './DrawInteraction.vue'
import AskQuestion from './AskQuestion.vue'
import { ref } from 'vue'

const prompts = ref<string[]>([])
</script>

<template>
  <div v-for="(prompt, index) in prompts" :key="index">
    <DrawInteraction :prompt="prompt" />
  </div>

  <AskQuestion @new-question="(q) => prompts.push(q)" />
</template>
