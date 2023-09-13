<script lang="ts" setup>
import { cva, VariantProps } from "class-variance-authority"
import { cn } from "../utils/className"
import { ButtonHTMLAttributes, computed, ref, VueElement } from "vue"

export interface ButtonProps extends ButtonHTMLAttributes, VariantProps<typeof buttonVariants> {
  /* Shows loading */
  loading?: boolean
  /* Makes button disabled */
  disabled?: boolean
  /* The label to show in the button when loading is true */
  loadingText?: string
  /* Set the original html type of button */
  type?: "button" | "reset" | "submit"
  /* Adds icon before button label */
  leftIcon?: VueElement
  /* Adds icon after button label */
  rightIcon?: VueElement
}

const props = defineProps<ButtonProps>()

const buttonVariants = cva(cn("btn"), {
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

const asyncLoading = ref(false)
const buttonLoading = computed(() => asyncLoading || props.loading)
const disabled = computed(() => props.disabled || buttonLoading)

const buttonClass = cn(
  buttonVariants({ variant: props.variant, size: props.size, class: props.class, shape: props.shape }),
)
// const loadingClass = cn(props.loadingText ? "relative" : "absolute", props.loadingText ? `mr-2` : "mr-0")

async function handleCLick(ev: MouseEvent) {
  if (!props.onClick) return
  if (props.onClick.constructor.name === "AsyncFunction") {
    asyncLoading.value = true
    props.onClick && (await props.onClick(ev))
    asyncLoading.value = false
  } else props.onClick(ev)
}
</script>

<template>
  <button :class="buttonClass" :disabled="disabled" @click="handleCLick" {...props}>
    <component @is="leftIcon" v-if="leftIcon && !buttonLoading" />
    <!-- <component v-if="buttonLoading" :is="<Loading  />" /> -->
    <component v-if="buttonLoading">
      <component v-if="loadingText">
        {{ loadingText }}
      </component>
      <component v-else>
        <span className="opacity-0"><slot /></span>
      </component>
    </component>
    <component v-else>
      <slot />
    </component>
    <component @is="rightIcon" v-if="rightIcon && !buttonLoading" />
  </button>
</template>
