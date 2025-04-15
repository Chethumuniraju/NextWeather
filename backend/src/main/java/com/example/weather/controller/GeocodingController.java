package com.example.weather.controller;

import com.example.weather.service.GeocodingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/geocoding")
public class GeocodingController {

    private final GeocodingService geocodingService;

    @Autowired
    public GeocodingController(GeocodingService geocodingService) {
        this.geocodingService = geocodingService;
    }

    @GetMapping("/autocomplete")
    public ResponseEntity<List<Map<String, Object>>> getAutocompleteResults(@RequestParam String text) {
        List<Map<String, Object>> results = geocodingService.getAutocompleteResults(text);
        return ResponseEntity.ok(results);
    }
}