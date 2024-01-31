import React from "react";

export default function Person({ persons, dele }) {

  return (
    <div>
       { persons.map((el) => {
        return (
          <div key={el.id}>
            {el.name}: {el.number} 
           <button id={el.id} datatitle={el.name} onClick={() => dele(el.id, el.name)}>Delete{el.id}</button>
          </div>
        );
      })}
    </div>
  );
}
