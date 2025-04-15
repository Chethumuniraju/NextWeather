package com.example.weather.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GeocodingService {

    private final RestTemplate restTemplate;
    private final String apiKey;
    private final String baseUrl;

    public GeocodingService(
            RestTemplate restTemplate,
            @Value("${geoapify.api.key}") String apiKey) {
        this.restTemplate = restTemplate;
        this.apiKey = apiKey;
        this.baseUrl = "https://api.geoapify.com/v1/geocode/autocomplete";
    }

    public List<Map<String, Object>> getAutocompleteResults(String text) {
        String url = String.format("%s?text=%s&format=json&apiKey=%s", baseUrl, text, apiKey);
        
        Map<String, Object> response = restTemplate.getForObject(url, Map.class);
        List<Map<String, Object>> results = new ArrayList<>();
        
        if (response != null && response.containsKey("results")) {
            List<Map<String, Object>> apiResults = (List<Map<String, Object>>) response.get("results");
            
            for (Map<String, Object> result : apiResults) {
                Map<String, Object> locationData = new HashMap<>();
                locationData.put("formattedAddress", result.get("formatted"));
                locationData.put("latitude", result.get("lat"));
                locationData.put("longitude", result.get("lon"));
                results.add(locationData);
            }
        }
        
        return results;
    }
}