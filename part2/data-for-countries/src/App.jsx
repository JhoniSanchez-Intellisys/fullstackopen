import { useEffect, useState } from "react";

// import './App.css'

function App() {
  const [countries, setcountries] = useState([]);
  const [countriesf, setcountriesf] = useState([]);
  const [search, setSearch] = useState("");

  const nation = async () => {
    const data = await fetch(
      `https://studies.cs.helsinki.fi/restcountries/api/all`
    );
    const res = await data.json();
    console.log(res);
    setcountries(res);
    setcountriesf(res);
  };

  useEffect(() => {
    nation();

    //     .then((res) => {
    // return res.json().then((el)=>setcountries(el.data))
  }, []);

  useEffect(() => {
    data();
    // nation();
    //     .then((res) => {
    // return res.json().then((el)=>setcountries(el.data))
  }, [search]);

  const find = (e) => {
    const valueT = e.target.value;
    console.log(valueT);
    console.log(typeof valueT);
    setSearch(valueT);
    console.log(search);
  };

  const data = () => {
    const fil = countries.filter((el) => {
      return el.name.common.toLowerCase().includes(search.toLowerCase());
    });
    if (search.length == 0) {
      setcountriesf(countries);
    } else if (fil.length >= 10) {
      setcountriesf([
        { name: { common: "Too many matches, specify another filter" } },
      ]);
      console.log(search);
    } else if (fil.length < 10) {
      setcountriesf(fil);
    } else {
      setcountriesf([]);
    }
    console.log(fil);
  };

  return (
    <>
      <div>Find Countries</div>
      <input
        value={search}
        onChange={(e) => {
          find(e);
        }}
        type="text"
      />
      <div>
        {countriesf.length == 1 ? (
          <li key={1}>
            <h2>{countriesf[0].name.common}</h2>
            Capital: {countriesf[0].capital[0]}
            <p>Area:{countriesf[0].area}</p>
            <img src={countriesf[0].flags.png}></img>
            <h4>Languages</h4>
            {Object.values(countriesf[0].languages).map((el, i) => {
              return <li key={i}>{el}</li>;
            })}
          </li>
        ) : (
          countriesf.map((el, i) => {
            return <div key={i}>{el.name.common}gti</div>;
          })
        )}
      </div>
    </>
  );
}

export default App;
