package com.example.weather.controller;

import com.example.weather.dto.WeatherInputDTO;
import com.example.weather.service.WeatherPredictionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/weather")
@CrossOrigin
public class WeatherPredictionController {

    @Autowired
    private WeatherPredictionService predictionService;

    @PostMapping("/predict")
    public String predictWeather(@RequestBody WeatherInputDTO input) {
        return predictionService.predict(input);
    }
}
