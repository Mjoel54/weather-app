import dotenv from 'dotenv';
import fetch from 'node-fetch';
import searchHistory from '../../db/searchHistory.json' assert { type: "json" };


dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  latitude: number;
  longitude: number;
}

// TODO: Define a class for the Weather object
class Weather {
  temperature: number;
  description: string;

  constructor(temperature: number, description: string) {
    this.temperature = temperature;
    this.description = description;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL: string;
  private apiKey: string;
  cityName: string;

  constructor(city: string) {
    this.baseURL = process.env.BASE_URL ? process.env.BASE_URL.toString() : '';
    this.apiKey = process.env.API_KEY ? process.env.API_KEY.toString() : '';
    this.cityName = city;
  }

  // TODO: Create fetchLocationData method
  // private async fetchLocationData(query: string) {}
  private async fetchLocationData(query: string): Promise<any> {
    try {
      const response = await fetch(
        `${this.baseURL}/geo/1.0/direct?q=${query}&limit=1&appid=${this.apiKey}`
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error fetching location data:', error);
      throw new Error('Failed to fetch location data');
    }
  }  

  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {}
  private destructureLocationData(locationData: any): Coordinates {
    return {
      latitude: locationData.latitude,
      longitude: locationData.longitude,
    };
  }

  // TODO: Create buildGeocodeQuery method
    // private buildGeocodeQuery(): string {}
  buildGeocodeQuery(): string {
    const cityData = searchHistory.find((data: any) => data.name === this.cityName);

    if (cityData) {
      return `${cityData.name}, ${cityData.state}, ${cityData.country}`;
    } else {
      throw new Error('City not found in search history');
    }
  }

  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/data/2.5/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${this.apiKey}`;
  }

  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  // private async fetchAndDestructureLocationData(): Promise<Coordinates> {
  //   const locationData = await this.fetchLocationData(this.buildGeocodeQuery());
  //   return this.destructureLocationData(locationData);
  // }

  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const response = await fetch(this.buildWeatherQuery(coordinates));
    return response.json();
  }

  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  private parseCurrentWeather(response: any): Weather {
    return new Weather(
      response.main.temp,
      response.weather[0].description
    );
  }

  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // private buildForecastArray(_currentWeather: Weather, weatherData: any[]): Weather[] {
  //   return weatherData.map((data: any) => new Weather(
  //     data.temp,
  //     data[0].description
  //   ));
  // }

  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
  async getWeatherForCity(city: string): Promise<Weather> {
    const locationData = await this.fetchLocationData(city);
    const coordinates = this.destructureLocationData(locationData);
    const weatherData = await this.fetchWeatherData(coordinates);
    return this.parseCurrentWeather(weatherData);
  }
}

export default WeatherService;
