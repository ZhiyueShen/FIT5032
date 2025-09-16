<template>
  <div class="container p-4">
    <h1>Create an Account</h1>
    <p><input type="email" placeholder="Email" v-model="email" required /></p>
    <p><input type="password" placeholder="Password (min 6)" v-model="password" required /></p>
    <p><button @click="register">Save to Firebase</button></p>
    <p v-if="ok" style="color:green">Firebase Register Successful!</p>
    <p v-if="error" style="color:red">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

const email = ref(''); const password = ref('')
const error = ref(''); const ok = ref(false)
const router = useRouter(); const auth = getAuth()

const register = () => {
  error.value=''; ok.value=false
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((cred) => { console.log('Firebase Register Successful!', cred.user); ok.value=true; router.push('/FireLogin') })
    .catch((e) => { console.log(e.code); error.value = e.message })
}
</script>
