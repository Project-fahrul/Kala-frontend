import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "./assets/style.css"
import 'bootstrap/dist/css/bootstrap.css'

import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faPerson, faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";


library.add(faPerson, faEye, faPen, faTrash)

createApp(App)
    .use(require('vue-cookies'))
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')

import 'bootstrap/dist/js/bootstrap'
