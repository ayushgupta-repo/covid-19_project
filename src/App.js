import {useState, useEffect} from "react";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');

  useEffect (() => {

    const getCountriesData = async () => {
      await fetch ("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => (
          {
            name: country.country, // United States, United Kingdom
            value: country.countryInfo.iso2, // UK, USA, FR
          }));

          setCountries(countries);
      });
    };

    getCountriesData();
  }, []);

  const onCountryChange =(event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  }

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className="app__dropdown">
            <Select
              variant="outlined" value={country} onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" cases={123} total={2000}/>

          <InfoBox title="Recovered" cases={123} total={3000}/>

          <InfoBox title="Deaths" cases={123} total={4000}/>
          {/* InfoBoxs title="Coronavirus cases*/}
          {/* InfoBoxs title="Coronavirus recoveries*/}
          {/* InfoBoxs */}
        </div>
      
        <Map />
      </div>
      
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          {/* Table */}
          <h3>Wordwide new cases</h3>
          {/* Graph */}
        </CardContent>
        
      </Card>
    </div>
  );
}

export default App;
