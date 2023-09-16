<template>
  <button :class="buttonVariants({ variant, shape, size })">
    <v-icon v-if="leftIcon && !buttonLoading" :name="leftIcon" />
    <Spinner v-if="buttonLoading" />
    <slot />
    <v-icon v-if="rightIcon" :name="rightIcon" />
  </button>
</template>

<script setup lang="ts">
import { VariantProps, cva } from "class-variance-authority"
import { computed, ref } from "vue"
import Spinner from "./spinner.vue"

const buttonVariants = cva("btn", {
  variants: {
    size: {
      xs: "btn-xs",
      md: "btn-md",
      sm: "btn-sm",
      lg: "btn-lg",
    },
    variant: {
      default: "btn-default",
      primary: "btn-primary",
      "primary-outlined": "btn-primary-outlined",
      outlined: "btn-outlined",
      ghost: "btn-ghost",
      success: "btn-success",
      error: "btn-error",
    },
    shape: {
      normal: "btn-normal",
      pill: "btn-pill",
      rounded: "btn-rounded",
      square: "btn-square",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    shape: "normal",
  },
})

type ButtonVariantProps = VariantProps<typeof buttonVariants>

export interface ButtonProps {
  loading?: boolean
  loadingText?: string
  size?: ButtonVariantProps["size"]
  variant?: ButtonVariantProps["variant"]
  shape?: ButtonVariantProps["shape"]
  leftIcon?: string
  rightIcon?: string
}

const { variant, shape, size, loading } = defineProps<ButtonProps>()

const asyncLoading = ref(false)
const buttonLoading = computed(() => asyncLoading.value || loading)
</script>
