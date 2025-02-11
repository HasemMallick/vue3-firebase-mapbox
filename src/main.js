import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDUP3F9eyfmSf_sueYOeDW17y7QP1VoT9I',
  authDomain: 'inndia-admin.firebaseapp.com',
  projectId: 'inndia-admin',
  storageBucket: 'inndia-admin.firebasestorage.app',
  messagingSenderId: '199534529356',
  appId: '1:199534529356:web:eaa0c0d2055067640edde9',
  measurementId: 'G-G65E4KXX76',
}

// Initialize Firebase
initializeApp(firebaseConfig)
// const analytics = getAnalytics(app);

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')
