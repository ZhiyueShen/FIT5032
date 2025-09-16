<template>
  <div class="container p-4">
    <h1>Login</h1>

    <p><input type="email" placeholder="Email" v-model="email" required /></p>
    <p><input type="password" placeholder="Password" v-model="password" required /></p>
    <p><button @click="login">Sign In</button></p>

    <p v-if="userEmail" style="color: green">Logged in as: {{ userEmail }}</p>
    <p v-if="error" style="color: red">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const email = ref('')
const password = ref('')
const error = ref('')
const userEmail = ref('')
const auth = getAuth()

const login = () => {
  error.value = ''
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((cred) => {
      console.log('Login successful:', cred.user)
      userEmail.value = cred.user.email
    })
    .catch((err) => {
      console.error(err.code)
      error.value = err.message
    })
}
</script>
