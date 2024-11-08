import { promises as fs } from "fs";
import * as path from "path";
import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// import data from "../../db/searchHistory.json" assert { type: "json" };


// TODO: Define a City class with name and id properties
class City {
  name: string;
  id: number;

  constructor(name: string) {
    this.name = name;
    this.id = Number(uuidv4());
  }
}

// TODO: Complete the HistoryService class
class HistoryService {
  private filePath = path.join(__dirname, '.searchHistory.json');

  // TODO: Define a read method that reads from the searchHistory.json file
  private async read() {
    try {
      const data = await fs.readFile(this.filePath, "utf-8");
      return JSON.parse(data);
    } catch (error: any) {
      if (error.code === "ENOENT") {
        return [];
      }
      throw error;
    }
  }

  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  async write(cities: City[]): Promise<void> {
    await fs.writeFile(this.filePath, JSON.stringify(cities, null, 2));
  }

  // async getCities() {}
    // TODO Define an addCity method that adds a city to the searchHistory.json file
  async getCities(): Promise<City[]> {
    return await this.read();
  }

  // TODO Define an addCity method that adds a city to the searchHistory.json file
  // async addCity(city: string) {}
  async addCity(name: string): Promise<void> {
    let cities = await this.read();
    cities.push(new City(name));
    await this.write(cities);
  }

  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}

}

export default new HistoryService();
