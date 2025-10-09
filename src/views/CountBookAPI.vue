<template>
  <div class="container">
    <h1>Book Count API Result</h1>
    <pre>{{ jsondata }}</pre> 
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CountBookAPI",
  data() {
    return {
      jsondata: null,
      error: null
    };
  },
  async mounted() {
    await this.getBookCountAPI();
  },
  methods: {
    async getBookCountAPI() {
      try {
        const response = await axios.get(
          "https://countbooks-r7bsezglla-uc.a.run.app"
        );
        this.jsondata = response.data;
        this.error = null;
      } catch (error) {
        console.error("Error fetching book count:", error);
        this.error = error;
        this.jsondata = null;
      }
    },
  },
};
</script>
