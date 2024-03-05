import { useEffect, useState } from "react";
import Weather from "./components/Weather";

// import './App.css'

function App() {
  const [countries, setcountries] = useState([]);
  const [countriesf, setcountriesf] = useState([]);
  const [weathere, setweathere] = useState([]);
  const [search, setSearch] = useState("");

  const weather = async (lat, log) => {
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${lat}%2C${log}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_SOME_KEY,
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      // const result = await response.text();
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  const nation = async () => {
    const data = await fetch(
      `https://studies.cs.helsinki.fi/restcountries/api/all`
    );
    const res = await data.json();
    console.log(res);
    setcountries(res);
    setcountriesf(res);
  };
  //  useEffect(() => {

  //     //     .then((res) => {
  //     // return res.json().then((el)=>setcountries(el.data))
  //   }, [weathere]);
  
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

  const find2 = async (el) => {
    const weat = await weather(
      el.capitalInfo.latlng[0],
      el.capitalInfo.latlng[1]
    );
    console.log(weat);
    setweathere(weat);
    // setcountriesf([el]);
    console.log(search);
  };
  const find3 = async (el) => {
    const weat = await weather(
      el.capitalInfo.latlng[0],
      el.capitalInfo.latlng[1]
    );
    console.log(weat);
    setweathere(weat);
    setcountriesf([el]);
    console.log(search);
  };

  const data = () => {
    const fil = countries.filter((el) => {
      return el.name.common.toLowerCase().includes(search.toLowerCase());
    });
    if (search.length === 0) {
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
        {countriesf.length === 1 &&
        countriesf[0].name.common !=
          "Too many matches, specify another filter" ? (
            
          <div key={1}>
            <h2>{countriesf[0].name.common}</h2>
            Capital: {countriesf[0].capital}
            <p>Area:{countriesf[0].area}</p>
            <img src={countriesf[0].flags && countriesf[0].flags.png}></img>
            <h4>Languages</h4>
            {countriesf[0].languages &&
              Object.values(countriesf[0].languages).map((el, i) => {
                return <li key={i}>{el}</li>;
              })}
            <Weather weathere={weathere} countriesf={countriesf} find2 = {find2} />
          </div>
        ) : (
          countriesf.map((el, i) => {
            // if (countriesf.length === 1) {
            //   console.log()
            //   find2(el);
            // }

            return (
              <div key={i}>
                {el.name.common}
                {countriesf.length < 11 &&
                  countriesf[0].name.common !=
                    "Too many matches, specify another filter" && (
                    <button
                      onClick={() => {
                        find3(el);
                      }}
                    >
                      Show More
                    </button>
                  )}
              </div>
            );
          })
        )}
      </div>
    </>
  );
}

export default App;
