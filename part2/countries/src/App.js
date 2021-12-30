import axios from 'axios';
import React, { useEffect, useState } from 'react';

const DisplayCountry = (props) => {
  const [temp, setTemp] = useState('')
  const [icon, setIcon] = useState('')
  const [speed, setSpeed] = useState('')

   const effectData = () =>
      axios
        .get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
          .then((response) => 
          {
            setTemp(response.data.main.temp)
            setSpeed(response.data.wind.speed)
            setIcon('https://openweathermap.org/img/wn/'+response.data.weather[0].icon+'@2x.png')
          }
        )
        useEffect(effectData, [])
  
  const country = props.country
 
  return <>
      <h1>{country.name.common}</h1>
      <p>capital { country.capital }</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <ul>
        {Object.values(country.languages).map((lang) => <li key={lang}>{ lang }</li>)}
      </ul>
      <div>{country.flag}</div>
      <h3>Weather in {country.capital}</h3>
      <strong>temprature</strong> {temp} celcius <br />
      <img src={ icon }/><br />
      <strong>windspeed</strong> {speed} km/hr 
    </>}

const FilteredCountries = ({ viewCountries, setViewCountries }) => {
  if (viewCountries.length > 10) {
    return 'Too many matches, specify another filter'
  } else if (viewCountries.length === 1) {
    return <DisplayCountry country={ viewCountries[0] }/>
  }
  return viewCountries.map((country) =>
    <div key={country.name.official}>{country.name.common}
      <button onClick={()=>setViewCountries([country])}>show</button>
    </div>)
}


function App() {
  const [countries, setCountries] = useState([])
  const [viewCountries, setViewCountries] = useState([])

  const fetchCountries = () =>
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data))
  useEffect(fetchCountries, [])


  const handleFindCountry = (event) => {
    const word = event.target.value
    setViewCountries(countries.filter((country)=>country.name.common.toLowerCase().includes(word.toLowerCase())))
  }
  
  return (
    <div >
      find country <input onChange={handleFindCountry}/>
      <div>
        <FilteredCountries viewCountries={viewCountries} setViewCountries={ setViewCountries }/>
      </div>
    </div>
  );
}

export default App;
