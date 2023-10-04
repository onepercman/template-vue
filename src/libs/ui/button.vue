<template>
  <button :class="buttonVariants({ size, shape, variant })" @click="_click" :disabled="_disabled">
    <component :is="Spinner" v-if="_loading" />
    <OhVueIcon v-else :name="leftIcon" />
    <component v-if="_loading && loadingText">{{ loadingText }}</component>
    <slot v-else />
    <OhVueIcon :name="rightIcon" />
  </button>
</template>

<script setup lang="ts">
import { VariantProps, cva } from "class-variance-authority"
import { ButtonHTMLAttributes, computed, ref, toRefs } from "vue"
import Spinner from "./spinner.vue"
import { OhVueIcon } from "oh-vue-icons"

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
  leftIcon?: string
  rightIcon?: string
  variant?: ButtonVariantProps["variant"]
  shape?: ButtonVariantProps["shape"]
  size?: ButtonVariantProps["size"]
  onClick?: ButtonHTMLAttributes["onClick"]
  disabled?: ButtonHTMLAttributes["disabled"]
}

const props = defineProps<ButtonProps>()
const { size, shape, variant, loading, loadingText, leftIcon, rightIcon } = toRefs(props)
const asyncLoading = ref(false)
const _loading = computed(() => asyncLoading.value || loading.value)
const _disabled = computed(() => _loading.value || props.disabled)

async function _click(ev: MouseEvent) {
  if (!props.onClick) return
  asyncLoading.value = true
  await props.onClick(ev)
  asyncLoading.value = false
}
</script>
