<template>
  <div class="p-6">
    <div class="border-line rounded border p-6">
      <Button size="lg" :loading="loading" @click="click" left-icon="hi-check">Click me</Button>
    </div>
  </div>
</template>

<script lang="tsx" setup>
import { Button } from "@/libs/ui"
import { sleep } from "@/utils/promise"
import { ref } from "vue"

const loading = ref(false)

async function click() {
  await sleep(3000)
}
</script>
