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

  <AskQuestion placeholder="Tell the AI what you want it to draw" @new-question="(q) => prompts.push(q)" />
</template>
