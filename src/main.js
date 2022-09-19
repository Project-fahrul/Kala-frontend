import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import "./assets/style.css"

import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faPerson, faEye, faPen, faTrash, faTriangleExclamation, faHouseUser, faUser, faUserGroup, faAddressBook, faCheck } from "@fortawesome/free-solid-svg-icons";


library.add(faPerson, faEye, faPen, faTrash, faTriangleExclamation, faHouseUser, faUser, faUserGroup, faAddressBook, faCheck)

createApp(App)
    .use(require('vue-cookies'))
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')

import 'bootstrap/dist/js/bootstrap'
