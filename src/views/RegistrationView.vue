<template>
  <div class="reg-wrapper">
    <div>
      <h2>Register</h2>
    </div>

    <div class="input-btn-wrapper">
      <p>
        <el-input type="email" v-model="email" style="width: 355px" placeholder="Email" />
      </p>
      <p>
        <el-input type="text" v-model="password" style="width: 355px" placeholder="Password" />
      </p>
      <div class="btn-wrapper">
        <p><el-button type="primary" @click="register">Sign UP</el-button></p>
        <p><el-button plain type="warning" @click="signInWithGoogle">Sign in with Google</el-button></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const register = () => {
  const auth = getAuth()
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      ElMessage.success('Registration Successfully!!!', auth.currentUser)
      console.log('Registration Successfully!!!')
      console.log('Registration Successfully!!!', auth.currentUser)
      router.push('/download-map')
    })
    .catch(() => {
      ElMessage.error('Registration Error!!!')
      console.log('Registration Error!!!')
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
.reg-wrapper {
  margin: 2rem 25%;
}

.btn-wrapper {
  padding-top: 2rem;
  display: flex;
  gap: 119px;
}

.input-btn-wrapper>p {
  padding-top: 2rem;
}
</style>
