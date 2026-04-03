<script setup lang="ts">
import { ref } from "vue";

/* 📍 типы */
type City = {
  name: string;
  lat: number;
  lon: number;
};

type CurrentWeather = {
  temperature: number;
  windspeed: number;
};

type ForecastDay = {
  date: string;
  max: number;
  min: number;
};

/* 📍 города */
const cities: City[] = [
  { name: "Amsterdam", lat: 52.37, lon: 4.89 },
  { name: "London", lat: 51.50, lon: -0.12 },
  { name: "Berlin", lat: 52.52, lon: 13.40 },
];

/* 📍 state */
const weather = ref<{
  city: string;
  current: CurrentWeather;
} | null>(null);

const forecast = ref<ForecastDay[]>([]);

/* 📍 функция */
const getWeather = async (city: City) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;

  const res = await fetch(url);
  const data = await res.json();

  weather.value = {
    city: city.name,
    current: data.current_weather,
  };

  forecast.value = data.daily.time.map((t: string, i: number) => ({
    date: t,
    max: data.daily.temperature_2m_max[i],
    min: data.daily.temperature_2m_min[i],
  }));
};
</script>

<template>
  <div class="page">
    <h1>🌦️ Погода</h1>

    <!-- КНОПКИ -->
    <div class="cities">
      <button v-for="c in cities" :key="c.name" @click="getWeather(c)">
        {{ c.name }}
      </button>
    </div>

    <!-- ТЕКУЩАЯ -->
    <div v-if="weather" class="card">
      <h2>{{ weather.city }}</h2>
      <p>🌡 {{ weather.current.temperature }}°C</p>
      <p>💨 {{ weather.current.windspeed }} km/h</p>
    </div>

    <!-- ПРОГНОЗ -->
    <div v-if="forecast.length" class="forecast">
      <h3>📅 7 дней</h3>

      <div class="grid">
        <div v-for="day in forecast" :key="day.date" class="day">
          <p>{{ day.date }}</p>
          <p>⬆ {{ day.max }}°C</p>
          <p>⬇ {{ day.min }}°C</p>
        </div>
      </div>
    </div>
  </div>
</template>
