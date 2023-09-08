import { createApp } from "vue";
import App from "./App.vue";
/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
/* import specific icons */
import {faAnglesDown } from "@fortawesome/free-solid-svg-icons";
/* add icons to the library */
library.add(faAnglesDown);
createApp(App).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
// createApp(App).mount("#app");