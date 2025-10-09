<template>
  <div class="container p-4">
    <h1>WEATHER APP</h1>

    <div class="search-bar">
      <input
        v-model="city"
        type="text"
        placeholder="Enter city name"
        class="search-input"
      />
      <button @click="searchByCity" class="search-button">Search</button>
    </div>

    <main v-if="weatherData">
      <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
      <div>
        <img :src="iconUrl" alt="Weather Icon" />
        <p>{{ temperature }} °C</p>
        <p>{{ weatherData.weather[0].description }}</p>
      </div>
    </main>

    <p v-if="error" style="color: red">{{ error }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "WeatherView",
  data() {
    return {
      city: "",
      weatherData: null,
      error: "",
    };
  },
  computed: {
    temperature() {
      return this.weatherData
        ? Math.round(this.weatherData.main.temp)
        : null;
    },
    iconUrl() {
      return this.weatherData
        ? `http://openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
        : "";
    },
  },
  methods: {
    async searchByCity() {
      this.error = "";
      this.weatherData = null;
      try {
        const apikey = "3018d2a0da0004fd0beb9f392ec08d70"; 
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apikey}&units=metric`;
        const response = await axios.get(url);
        this.weatherData = response.data;
      } catch (err) {
        this.error = "City not found or API error.";
        console.error(err);
      }
    },
  },
};
</script>

<style>
.container {
  text-align: center;
}
.search-bar {
  margin: 20px;
}
.search-input {
  padding: 5px;
  font-size: 16px;
}
.search-button {
  margin-left: 5px;
  padding: 5px 10px;
}
</style>
