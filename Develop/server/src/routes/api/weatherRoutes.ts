import { Router } from 'express';
const router = Router();

// import HistoryService from '../../service/historyService.js';
import HistoryService from '../../service/historyService.js';

// import WeatherService from '../../service/weatherService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
// router.post('/api/weather/:city', async (req, res) => {
//   try {
//     // Extract the city name from the route parameter
//     const { city } = req.params;

//     if (!city) {
//       return res.status(400).json({ error: 'City name is required' });
//     }

//     // GET weather data from city name
//     const weatherServiceCity = new WeatherService(city);
//     const weatherData = await weatherServiceCity.getWeatherForCity(city);

//     // Save city to search history
//     await HistoryService.addCity(city);

//     return res.status(200).json(weatherData);
//   } catch (error) {
//     console.error('Error retrieving weather data:', error);
//     res.status(500).json({ error: 'An error occurred while retrieving weather data' });
//     return;
//   }
// });

router.post('/api/weather', async (req, res) => {
  try {
      // Extract the city name from the query parameter
      const { city } = req.query;
      if (!city || typeof city !== 'string') {
          return res.status(400).json({ error: 'City name is required' });
      }
      // GET weather data from city name
      const weatherServiceCity = new WeatherService(city);
      const weatherData = await weatherServiceCity.getWeatherForCity(city);
      // Save city to search history
      await HistoryService.addCity(city);
      return res.status(200).json(weatherData);
  }
  catch (error) {
      console.error('Error retrieving weather data:', error);
      res.status(500).json({ error: 'An error occurred while retrieving weather data' });
      return;
  }
});

// TODO: GET search history
router.get('/api/weather/history', async (_req, res) => {
  try {
    const history = await HistoryService.getCities();
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving search history' });
  }
});

// * BONUS TODO: DELETE city from search history
// router.delete('/history/:id', async (req, res) => {});

export default router;
