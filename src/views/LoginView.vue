<template>
  <div class="log-wrapper">
    <div>
      <h2>Sign In</h2>
      <router-link to="/registration">
        <h4>Create an Account</h4>
      </router-link>
    </div>

    <div class="input-btn-wrapper">
      <p>
        <el-input type="email" v-model="email" style="width: 355px" placeholder="email" />
      </p>
      <p>
        <el-input type="text" v-model="password" style="width: 355px" placeholder="password" />
      </p>
      <p v-if="errorMsg">
        {{ errorMsg }}
        {{ ElMessage.info(errorMsg) }}
      </p>

      <div class="btn-wrapper">
        <p><el-button type="primary" @click="login">Sign In</el-button></p>
        <p>
          <el-button type="warning" plain @click="signInWithGoogle">Sign in with Google</el-button>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import iGoogle from '../assets/google.png'

const email = ref('')
const password = ref('')
const errorMsg = ref('')
const router = useRouter()

const login = () => {
  const auth = getAuth()
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      ElMessage.success('Signin Successfully!!!')
      console.log('Sign Successfully!!!')
      console.log('Sign Successfully!!!', data)
      router.push('/download-map')
    })
    .catch((error) => {
      ElMessage.error('Sign Error!!!', error)
      ElMessage.error('Sign Error!!!', error.code)
      console.log('Sign Error!!!', error)
      console.log('Sign Error!!!', error.code)

      switch (error.code) {
        case 'auth/invalid-email':
          errorMsg.value = 'Invalid Email !!!'
          break
        case 'auth/user-not-found':
          errorMsg.value = 'User Not Found !!!'
          break
        case 'auth/wrong-password':
          errorMsg.value = 'Wrong Password !!!'
          break
        default:
          errorMsg.value = 'Email or Password was Incorrect !!!'
          break
      }
    })
}

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider()
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      console.log(result.user)
      ElMessage.info(result.user)
      router.push('/download-map')
    })
    .catch((error) => {
      console.log('error', error)
      ElMessage.warning(error)
    })
}
</script>

<style scoped>
.log-wrapper {
  margin: 2rem 25%;
}

div > div > a > h4 {
  color: green;
  padding: 1rem 0;
}

.btn-wrapper {
  padding-top: 2rem;
  display: flex;
  gap: 119px;
}

.input-btn-wrapper > p {
  padding-top: 2rem;
}
</style>
