import React, { useEffect } from "react";

export default function Weather({ weathere, countriesf, find2}) {
    useEffect(() => {
        countriesf.length === 1 ? find2(countriesf[0]) : null
      
          //     .then((res) => {
          // return res.json().then((el)=>setcountries(el.data))
        }, [countriesf]);

  console.log(weathere.current);
  return (
    <div>
      <h4>
        Weather in {weathere && weathere.location?.country && weathere.location?.country}
      </h4>
      <p> Temperature {weathere.current && weathere.current.temp_c} Celcius</p>
      <img src={weathere.current && weathere.current.condition.icon} />
      <p>wind {weathere.current && weathere.current.wind_kph} kph</p>
    </div>
  );
}
