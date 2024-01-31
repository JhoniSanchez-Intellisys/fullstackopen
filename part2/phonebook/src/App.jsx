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
    try {
      const data = await services.getAll();
      console.log(data);
      setPersons(data);
      return data;
    } catch (error) {
      console.log(error);

      setPersons([]);
    }
  };

  useEffect(() => {
    res();
    console.log(persons);
  }, []);

  const del = async (id, name) => {
    try {
      console.log(id);
      if (window.confirm(`Do you really want to Delete: ${name}?`)) {
        const data = await services.del(id);
        const newData = persons.filter((el) => el.id != id);
        setPersons(newData);
        console.log(data);
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const searching = (e) => {
    newSeach(e.target.value);
    console.log("search", search);

    const valueExist = persons.filter((el) => {
      return el.name.toLowerCase() == search.toLowerCase();
    });
    setNewFind(valueExist);
    console.log("Valor actualizado", valueExist);
    console.log("Valor guardado", newFind);
  };

  console.log("Cuadro de Busqueda", search);

  const update = (id, valueExist) => {
    try {
      services.update(id, valueExist);      
    } catch (error) {
      console.log(error);
    }
  };

  const addperson = async (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length.toString(),
    };
    const valueExist = persons.find((el) => el.name == newName);
    console.log(valueExist);
    try {
      if (valueExist && valueExist.name == newName) {
        if (
          confirm(`${newName} is already added to phonebook, replace the old number with a new one`)
        ) {
          valueExist.number = newNumber;
          setPersons([...persons, valueExist]);
          update(valueExist.id, valueExist);
          
        } else if (!valueExist) {
      
        } else {
          return;
        }
      } else {
            const data = await services.create(newPerson);
          const newData = persons.concat(data);
          setPersons(newData);
          console.log(data);
          console.log(persons);
          setPersons([...persons, newPerson]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filteredData = search
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(search.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter searching={searching} search={search} />

      <h2>Add New</h2>
      <Personform
        addperson={addperson}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        setNewName={setNewName}
        newName={newName}
      />
      <h2>Numbers</h2>
      <Person persons={filteredData} dele={del} />
    </div>
  );
};

export default App;
