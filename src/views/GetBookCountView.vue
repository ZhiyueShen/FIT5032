<template>
  <div id="app">
    <h1>Book Counter</h1>

    <button @click="getBookCount">Get Book Count</button>

    <!-- 如果成功获取数量，显示数量 -->
    <p v-if="count !== null">Total number of books: {{ count }}</p>

    <!-- 如果出错，显示错误 -->
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      count: null,
      error: null,
    };
  },
  methods: {
    async getBookCount() {
      try {
        const response = await axios.get(
          "https://us-central1-fit5032-zhiyue.cloudfunctions.net/countBooks"
        );
        this.count = response.data.count;
        this.error = null;
      } catch (error) {
        console.error("Error fetching book count:", error);
        this.error = "Error fetching book count.";
        this.count = null;
      }
    },
  },
};
</script>

<style scoped>
button {
  padding: 8px 16px;
  margin-top: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

p {
  margin-top: 12px;
  font-size: 18px;
}
</style>
