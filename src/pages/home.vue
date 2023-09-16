<template>
  <div class="p-6">
    <div class="border-line rounded border p-6">
      <Button>Button</Button>
    </div>
  </div>
</template>

<script lang="tsx" setup>
import Button from "@/libs/ui/button.vue"
import { ref } from "vue"

const loading = ref(false)
console.log("🚀 ~ file: home.vue:14 ~ loading:", loading.value)
</script>
