import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Personform from "./components/Personform";
import Person from "./components/Person";
import services from "./assets/services";
import { Notification } from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFind, setNewFind] = useState([]);
  const [search, newSeach] = useState("");
  const [message, setmessage] = useState(null);
  const [type, settype] = useState(null);
  const res = async () => {
    try {
      const data = await services.getAll();
      console.log(data);
      setPersons(data.data);
      return data;
    } catch (error) {
      console.log(error);

      setPersons([]);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setmessage(null);
      settype(null);
    }, 3000);
  }, [message, type]);

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
        const oldData = persons.filter((el) => el.id = id);
        setPersons(newData);
        console.log(oldData);

        setmessage(`Delete ${oldData[0].name}`);

        return data.data;
      }
    } catch (error) {
      if (error.response.status > 399 || error.response.status < 500) {
        console.log(error);
        settype("e");
        setmessage("Infomration do not exist in the server");
      }
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

  const addperson = async (e) => {
    let id = persons.length.toString();
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      id: id,
    };
    const valueExist = persons.find((el) => el.name == newName);
    console.log(valueExist);
    try {
      if (valueExist && valueExist.name == newName) {
        if (
          confirm(
            `${newName} is already added to phonebook, replace the old number with a new one`
          )
        ) {
          valueExist.number = newNumber;

          // const update = (id, valueExist) => {
          //   try {
          //   } catch (error) {
          //     console.log(error);
          //   }
          // };
          //       update(valueExist.id, valueExist)
          // ;

          services.update(valueExist.id, valueExist).then((resp) => {
            console.log(resp);
            setmessage(`Uptade ${valueExist.name}`);
            res();
          });
        }
      } else {
        const data = await services.create(newPerson);
        if (!data.data.name) {
          setmessage(`Added  ${data.data}`);
          settype("e");
        } else {
          const newData = persons.concat(data.data);
          setPersons(newData);
          setmessage(`Added  ${data.data.name}`);
          // settype("e")
          console.log(data);
          console.log(persons);
        }
      }
    } catch (error) {
      console.log(error);
      settype("e");
      setmessage(error.message);
    }
  };

  const filteredData = search
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(search.toLowerCase())
      )
    : persons;

  return (
    <div>
      <Notification message={message} type={type} />
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
