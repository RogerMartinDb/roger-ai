<script setup lang="ts">
import { ref, type Ref, toRefs, onMounted } from 'vue'
import VueLoadImage from 'vue-load-image'

const props = defineProps<{
  prompt: string
}>()

const { prompt } = toRefs(props)

const imageUrl = (prompt: string) => {
  const url = new URL(document.location.href)
  url.pathname = '/image'
  url.searchParams.set('prompt', prompt)
  return url.toString()
}

const me: Ref<HTMLDivElement | null> = ref(null);

onMounted(() => {
  me.value?.scrollIntoView()
});
</script>

<template>
  <div class="interaction" ref="me">
    <div class="question">
      <div class="actor">You</div>
      <div class="questionText">{{ prompt }}</div>
    </div>
    <div class="answer">
      <div class="actor">Model</div>

      <div id="imageContainer">
        <vue-load-image>
          <template v-slot:image>
            <img id="image" v-bind:src="imageUrl(prompt)" />
          </template>
          <template v-slot:preloader>
            <img src='@/assets/200.webp' />
          </template>
          <template v-slot:error>Failed to generate image, please try again</template>
        </vue-load-image>
      </div>
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

#imageContainer {
  width: 100%;
}

#image {
  width: 100%;
}
</style>
