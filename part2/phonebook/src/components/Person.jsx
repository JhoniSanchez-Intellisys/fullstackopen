import React, { useEffect } from "react";

export default function Person({ persons, dele }) {
  // useEffect(() => {   
  //   console.log(persons);
  // }, [persons]);
  return (
    <div>
       { persons.map((el) => {
        return (
          <li key={el.id}>
            {el.name}: {el.number} 
           <button id={el.id} datatitle={el.name} onClick={() => dele(el.id, el.name)}>Delete{el.id}</button>
          </li>
        );
      })}
    </div>
  );
}
