<script setup lang="ts">
import { ref, toRefs } from 'vue'
const emit = defineEmits<{ newQuestion: [value: string] }>()
const props = defineProps<{ placeholder: string }>()
const { placeholder } = toRefs(props)

const theQuestion = ref<string>('')
const newQuestion = () => {
  emit('newQuestion', theQuestion.value)
  theQuestion.value = ''
}

const askOnCtrlEnter = (event: KeyboardEvent) => {
  if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
    newQuestion()
  }
}
</script>
<template>
  <div class="input-area">
    <form>
      <textarea
        class="main-input"
        v-model="theQuestion"
        @keydown="askOnCtrlEnter"
        autofocus
        :placeholder="placeholder"
        type="text"
      ></textarea>
      <button type="button" @click="newQuestion">⪢</button>
    </form>
  </div>
</template>
<style>
.input-area {
  bottom: 0px;
  position: fixed;
  gap: 20px;
  margin: 0 auto;
  width: min(80vw, 600px);
  background-color: rgba(255, 255, 255, 1);
  padding: 20px;
}

.input-area button {
  font-size: large;
}

.main-input {
  flex: 1;
  padding: 5px;
  width: 80%;
}
</style>
