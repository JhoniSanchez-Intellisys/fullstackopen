import { useEffect, useState } from "react";

// import './App.css'

function App() {
  const [countries, setcountries] = useState([]);
  const [search, setSearch] = useState([]);

  const nation = async () => {
    const data = await fetch(
      `https://studies.cs.helsinki.fi/restcountries/api/all`
    );
    const res = await data.json();
    console.log(res);
    setcountries(res)
  };

  useEffect(() => {
    nation();
    //     .then((res) => {
    // return res.json().then((el)=>setcountries(el.data))
  }, []);

  return (
    <>
      <div>Find Countries</div> <input type="text" />
      <div>
        {countries.map((el) => {
          return <li>{el.name.common}</li>;
        })}
      </div>
    </>
  );
}

export default App;
