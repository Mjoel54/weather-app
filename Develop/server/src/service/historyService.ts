import { promises as fs } from 'fs';
import * as path from 'path';

// TODO: Define a City class with name and id properties

class City {
  name: string;
  id: number;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}

// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  // private async read() {}
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  // private async write(cities: City[]) {}
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  // async getCities() {}
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  // async addCity(city: string) {}
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}
    private filePath = path.join(__dirname, '.searchHistory.json');

    private async read(): Promise<City[]> {
      try {
        const data = await fs.readFile(this.filePath, 'utf-8');
        return JSON.parse(data);
      } catch (error) {
        if (error.code === 'ENOENT') {
          return [];
        }
        throw error;
      }
    }

    private async write(cities: City[]): Promise<void> {
      await fs.writeFile(this.filePath, JSON.stringify(cities, null, 2));
    }

    async getCities(): Promise<City[]> {
      return await this.read();
    }

    async addCity(name: string): Promise<void> {
      const cities = await this.read();
      const id = cities.length ? cities[cities.length - 1].id + 1 : 1;
      cities.push(new City(name, id));
      await this.write(cities);
    }

    async removeCity(id: number): Promise<void> {
      let cities = await this.read();
      cities = cities.filter(city => city.id !== id);
      await this.write(cities);
    }
  }


export default new HistoryService();
