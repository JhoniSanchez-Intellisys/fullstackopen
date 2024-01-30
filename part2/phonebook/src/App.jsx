import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Personform from "./components/Personform";
import Person from "./components/Person";
import services from "./assets/services";



const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFind, setNewFind] = useState([]);
  const [search, newSeach] = useState("");

const res = async () => {
  const data = await services.getAll()
  return data
}

useEffect(() => {
const resp = res()
console.log('Funcion =>', resp)
setPersons(resp)
}, [])


  const searching = (e) => {
    newSeach(e.target.value);
    console.log('search', search);
    
    const valueExist = persons.filter((el) => {
      return el.name.toLowerCase() == search.toLowerCase();
    });
    setNewFind(valueExist);
    console.log("Valor actualizado", valueExist);
    console.log("Valor guardado", newFind);
  };

  console.log("Cuadro de Busqueda", search);

  const addperson = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length,
    };

    const valueExist = persons.filter((el) => {
      return el.name == newName;
    });
    console.log(valueExist);

    if (valueExist[0] && valueExist[0].name == newName) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons([...persons, newPerson]);
    }
  };

 const filteredData = search ? persons.filter((person) => person.name.toLowerCase().includes(search.toLowerCase())) : persons

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter
       searching={searching} 
       search={search}  />

      <h2>Add New</h2>
      <Personform
        addperson={addperson}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        setNewName={setNewName}
        newName={newName}
      />
      <h2>Numbers</h2>
      <Person persons={filteredData} />
    </div>
  );
};

export default App;
