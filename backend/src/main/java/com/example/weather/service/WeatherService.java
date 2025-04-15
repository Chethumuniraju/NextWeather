package com.example.weather.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class WeatherService {

    private static final String API_KEY = "427e5dccac415a5ce17c408cb408cc10"; // Replace with your OpenWeather API key

    public String fetchCurrentWeather(double lat, double lon) {
        String url = String.format(
            "https://api.openweathermap.org/data/2.5/weather?lat=%f&lon=%f&appid=%s",
            lat, lon, API_KEY
        );

        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(url, String.class);  // Fetch current weather as a String
    }

    // New method for fetching air pollution data
    public String fetchAirPollution(double lat, double lon) {
        String url = String.format(
            "https://api.openweathermap.org/data/2.5/air_pollution?lat=%f&lon=%f&appid=%s",
            lat, lon, API_KEY
        );

        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(url, String.class);  // Fetch air pollution data as a String
    }
}
