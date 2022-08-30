import './App.css';
import CurrentWeather from './components/currentWeather/currentWeather';
import Search from './components/Search/search';
import { WEATHER_API_URL, WEATHER_API_KEY } from './api'
import { useState } from 'react';
import Forecast from './components/forecast/forecast';


function App() {

  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecastWeather, setForecastWeather] = useState(null)

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(' ')

    const currentWeatherFetch = 
    fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)

    const forecastFetch = 
    fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)

    Promise.all([currentWeatherFetch, forecastFetch])
    .then(async (res) => {
      const weatherRes = await res[0].json()
      const forecastRes = await res[1].json()

      setCurrentWeather({ city: searchData.label, ...weatherRes })
      setForecastWeather({ city: searchData.label, ...forecastRes })
    })
    .catch((err) => {
      console.log(err)
    })
  }


  console.log(currentWeather)
  console.log(forecastWeather)

  return (
    <div className='container'>
      <Search onSearchChange={handleOnSearchChange}/>
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecastWeather && <Forecast data={forecastWeather} />}
    </div>
  );
}

export default App;
