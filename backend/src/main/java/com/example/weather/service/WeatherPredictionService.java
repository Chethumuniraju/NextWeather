package com.example.weather.service;

import com.example.weather.dto.WeatherInputDTO;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.Arrays;

@Service
public class WeatherPredictionService {

    public String predict(WeatherInputDTO input) {
        try {
            String[] cmd = new String[]{
                    "python",
                    "src/main/java/com/example/weather/service/weather_model_predict.py",
                    String.valueOf(input.getDate_month()),
                    String.valueOf(input.getPrecipitation()),
                    String.valueOf(input.getTemp_max()),
                    String.valueOf(input.getTemp_min()),
                    String.valueOf(input.getWind())
            };
    
            ProcessBuilder pb = new ProcessBuilder(cmd);
            pb.redirectErrorStream(true); // Important to capture errors too
            Process process = pb.start();
    
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            StringBuilder output = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line);
            }
    
            int exitCode = process.waitFor();
            if (exitCode != 0) {
                return "{\"error\": \"Python script failed with exit code " + exitCode + "\"}";
            }
    
            return output.toString();
    
        } catch (Exception e) {
            e.printStackTrace();
            return "{\"error\": \"" + e.getMessage() + "\"}";
        }
    }
    
}
