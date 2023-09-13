import { OhVueIcon, addIcons } from "oh-vue-icons"
import * as Icons from "oh-vue-icons/icons"
import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import "./styles/styles.scss"

const app = createApp(App)

// Routing
app.use(router)

// Import all icons
addIcons(...Object.values(Icons))
app.component("v-icon", OhVueIcon)

// Mount
app.mount("#app")
