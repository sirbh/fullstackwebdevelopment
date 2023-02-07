import { useEffect, useState } from "react";
import services from "./services";
import './index.css'
import Error from "./components/Error";
import Notification from "./components/Notification";
import Persons from "./components/Persons";
import SearchFilter from "./components/SearchFilter";
import AddPersonForm from "./components/AddPersonForm";




const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState(null);
  const [error,setError] = useState(null)

  useEffect(() => {
    services.getAll().then((resposne) => {
      setPersons(resposne.data);
    });
  }, []);

  const queryChangeHandler = (event) => {
    setQuery(event.target.value);
  };

  const nameChangeHandler = (event) => {
    setNewName(event.target.value);
  };

  const numberChangeHandler = (event) => {
    setNumber(event.target.value);
  };

  const deleteHandler = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      services.deletePerson(id).then((response) => {
        setPersons((persons) => {
          const filteredPersons = persons.filter((person) => person.id !== id);
          setPersons(filteredPersons);
        });
      }).catch((error)=>{
        const deletedPerson = persons.find(person=>person.id===id)
        setError(`Information of ${deletedPerson.name} has already been removed from server`)
        setTimeout(()=>{
          setError(null)
        },5000)
      })
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const _person = {
      name: event.target[0].value,
      number: event.target[1].value,
    };

    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === _person.name.toLowerCase()
    );
    if (existingPerson) {
      if (
        window.confirm(
          `${existingPerson.name} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        services.updatePerson(existingPerson.id, _person).then((response) => {
          const existingPersonIndex = persons.findIndex(
            (person) => person.id === existingPerson.id
          );
          setPersons((persons) => {
            const copyPersons = [...persons];
            copyPersons[existingPersonIndex].number = _person.number;
            return copyPersons;
          });
          setMessage(`Updated ${_person.name}`)
          setTimeout(()=>{
            setMessage(null)
          },5000)
          
        });
      }

      return;
    }
    services.addPerson(_person).then((response) => {
      setPersons((persons) => {
        const copyPersons = [...persons];
        copyPersons.push(response.data);
        return copyPersons;
      });
      setMessage(`Added ${_person.name}`)
      setTimeout(()=>{
        setMessage(null)
      },5000)
    });

    setNewName("");
    setNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Error message={error} />
      <Notification message={message} />
      <SearchFilter query={query} queryChangeHandler={queryChangeHandler} />
      <h2>add a new</h2>
      <AddPersonForm
        name={newName}
        nameChangeHandler={nameChangeHandler}
        number={number}
        numberChangeHandler={numberChangeHandler}
        onSubmit={onSubmit}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} query={query} handleDelete={deleteHandler} />
    </div>
  );
};

export default App;
