import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  latitude: number;
  longitude: number;
}

// TODO: Define a class for the Weather object
class Weather {
  temperature: number;
  humidity: number;
  windSpeed: number;
  description: string;

  constructor(temperature: number, humidity: number, windSpeed: number, description: string) {
    this.temperature = temperature;
    this.humidity = humidity;
    this.windSpeed = windSpeed;
    this.description = description;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  // TODO: Create fetchLocationData method
  // private async fetchLocationData(query: string) {}
  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {}
  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}
  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}

  private baseURL: string;
  private apiKey: string;
  private cityName: string;

  constructor() {
    this.baseURL = process.env.BASE_URL || '';
    this.apiKey = process.env.API_KEY || '';
    this.cityName = '';
  }

  private async fetchLocationData(query: string): Promise<any> {
    const response = await fetch(`${this.baseURL}/geocode?q=${query}&key=${this.apiKey}`);
    return response.json();
  }

  private destructureLocationData(locationData: any): Coordinates {
    return {
      latitude: locationData.lat,
      longitude: locationData.lon,
    };
  }

  private buildGeocodeQuery(): string {
    return `${this.cityName}`;
  }

  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${this.apiKey}`;
  }

  private async fetchAndDestructureLocationData(): Promise<Coordinates> {
    const locationData = await this.fetchLocationData(this.buildGeocodeQuery());
    return this.destructureLocationData(locationData);
  }

  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const response = await fetch(this.buildWeatherQuery(coordinates));
    return response.json();
  }

  private parseCurrentWeather(response: any): Weather {
    return new Weather(
      response.main.temp,
      response.main.humidity,
      response.wind.speed,
      response.weather[0].description
    );
  }

  private buildForecastArray(currentWeather: Weather, weatherData: any[]): Weather[] {
    return weatherData.map((data: any) => new Weather(
      data.temp,
      data.humidity,
      data.wind_speed,
      data.weather[0].description
    ));
  }

  public async getWeatherForCity(city: string): Promise<Weather> {
    this.cityName = city;
    const coordinates = await this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(coordinates);
    return this.parseCurrentWeather(weatherData);
  }
}

export default new WeatherService();
