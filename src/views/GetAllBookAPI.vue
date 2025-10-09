<template>
  <div class="container p-4">
    <h1>All Books (JSON Result)</h1>
    <p v-if="loading">Loading data...</p>
    <p v-if="error" style="color: red;">Error: {{ error }}</p>
    <pre v-if="books">{{ books }}</pre>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "GetAllBookAPI",
  data() {
    return {
      books: null,
      loading: true,
      error: null,
    };
  },
  async mounted() {
    await this.getAllBooks();
  },
  methods: {
    async getAllBooks() {
      try {
        const response = await axios.get("https://getallbooks-r7bsezglla-uc.a.run.app");
        this.books = JSON.stringify(response.data, null, 2); 
        this.loading = false;
      } catch (err) {
        console.error("Error fetching all books:", err);
        this.error = err.message;
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
pre {
  background: #f8f9fa;
  padding: 10px;
  border-radius: 6px;
  font-family: monospace;
  white-space: pre-wrap;
  word-break: break-word;
}
</style>
