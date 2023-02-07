import { useEffect, useState } from "react";
import axios from "axios";
import SearchFilter from "./components/SearchFilter";
import Countries from "./components/Countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");

  const filterCountries = (countries) => {
    return countries.filter((country) => {
      return country.name.official.toLowerCase().includes(query.toLowerCase());
    });
  };

  const queryChangeHandler = (event) => {
    setQuery(event.target.value);
  };

  const countryShowHandler = (index) => {
    setCountries((countries) => {
      return [countries[index]];
    });
  };

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((resp) => {
      const filteredCountries = filterCountries(resp.data);
      setCountries(filteredCountries);
    });
  }, [query]);

  return (
    <>
      <SearchFilter query={query} queryChangeHandler={queryChangeHandler} />
      <Countries countries={countries} showHandler={countryShowHandler} />
    </>
  );
}

export default App;
