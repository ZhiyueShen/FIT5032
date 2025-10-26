<template>
  <div>
    <h1>Books with ISBN > 1000</h1>
    <ul>
      <li v-for="book in books" :key="book.id">
        {{ book.name }} - ISBN: {{ book.isbn }}
        <button @click="updateName(book)">Update</button>
        <button @click="remove(book)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import db from '../firebase/init.js'
import {
  collection, query, where, getDocs,
  doc, updateDoc, deleteDoc, orderBy, limit
} from 'firebase/firestore'

export default {
  setup () {
    const books = ref([])

    const fetchBooks = async () => {
      const q = query(
        collection(db, 'books'),
        where('isbn', '>', 1000),
        orderBy('isbn', 'asc'),
        limit(20)
      )
      const snap = await getDocs(q)
      const arr = []
      snap.forEach(d => arr.push({ id: d.id, ...d.data() }))
      books.value = arr
    }

    const updateName = async (book) => {
      await updateDoc(doc(db, 'books', book.id), { name: book.name + ' (updated)' })
      await fetchBooks()
    }

    const remove = async (book) => {
      await deleteDoc(doc(db, 'books', book.id))
      await fetchBooks()
    }
    onMounted(fetchBooks)
    return { books, updateName, remove }
  }
}
</script>
