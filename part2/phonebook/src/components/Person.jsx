import React from "react";

export default function Person({ persons }) {
  return (
    <div>
       {persons.map((el) => {
        return (
          <div key={el.id}>
            {el.name}: {el.number}
          </div>
        );
      })}
    </div>
  );
}
