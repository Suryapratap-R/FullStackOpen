import axios from 'axios';
import React, { useEffect, useState } from 'react';

const FilteredCountries = ({viewCountries, setViewCountries}) => {
  if (viewCountries.length > 10) {
    return 'Too many matches, specify another filter'
  } else if (viewCountries.length === 1) {
    const country = viewCountries[0]
    return <>
      <h1>{country.name.common}</h1>
      <p>capital { country.capital }</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <ul>
        {Object.values(country.languages).map((lang) => <li key={lang}>{ lang }</li>)}
      </ul>
      <div>{country.flag}</div>
      <h3>Weather in { country.capital }</h3>
    </>
    
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
    console.log(countries.filter((country)=>country.name.common.toLowerCase().includes(word.toLowerCase())))
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
