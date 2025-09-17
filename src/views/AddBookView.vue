<template>
  <div class="container p-4">
    <h1>Add Book</h1>

    <form @submit.prevent="addBook">
      <p>
        <input
          v-model.number="isbn"
          type="number"
          placeholder="ISBN (number)"
          required
        />
      </p>
      <p>
        <input
          v-model="name"
          type="text"
          placeholder="Book name"
          required
        />
      </p>
      <button type="submit">Add</button>
    </form>

    <p v-if="ok" style="color: green">Added successfully!</p>
    <p v-if="error" style="color: red">{{ error }}</p>

    <!-- 8.5 用来显示查询结果；若你还没建 BookList.vue，可以先注释掉这两行 -->
    <BookList />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import db from '../firebase/init'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import BookList from '../components/BookList.vue' // 8.5 会创建该组件

const isbn = ref(null)
const name = ref('')
const ok = ref(false)
const error = ref('')

const addBook = async () => {
  error.value = ''; ok.value = false
  try {
    await addDoc(collection(db, 'books'), {
      isbn: Number(isbn.value),     // 教程要求保存为 number
      name: name.value.trim(),
      createdAt: serverTimestamp()
    })
    ok.value = true
    isbn.value = null
    name.value = ''
    console.log('Firestore: added to books')
  } catch (e) {
    console.error(e)
    error.value = e.message
  }
}
</script>
