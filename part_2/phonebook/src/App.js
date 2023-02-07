import { useEffect, useState } from "react";
import services from "./services";

const Person = ({ person, handleDelete }) => {
  return (
    <p>
      {person.name} {person.number}{" "}
      <button
        onClick={() => {
          handleDelete(person.id, person.name);
        }}
      >
        delete
      </button>
    </p>
  );
};

const Persons = ({ persons, query, handleDelete }) => {
  return (
    <div>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(query.toLowerCase())
        )
        .map((person) => {
          return (
            <Person
              person={person}
              handleDelete={handleDelete}
              key={person.id}
            />
          );
        })}
    </div>
  );
};

const SearchFilter = ({ query, queryChangeHandler }) => {
  return (
    <div>
      name: <input value={query} onChange={queryChangeHandler} />
    </div>
  );
};

const AddPersonForm = ({
  name,
  nameChangeHandler,
  number,
  numberChangeHandler,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={name} onChange={nameChangeHandler} />
      </div>
      <div>
        number: <input value={number} onChange={numberChangeHandler} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [query, setQuery] = useState("");

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
      });
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
      if(window.confirm(`${existingPerson.name} is already added to the phonebook, replace the old number with a new one?`)){
        services.updatePerson(existingPerson.id,_person).then(response=>{
          const existingPersonIndex = persons.findIndex(person=>person.id===existingPerson.id)
          setPersons(persons=>{
            const copyPersons = [...persons]
            copyPersons[existingPersonIndex].number = _person.number
            return copyPersons
          })
        })
      }

      return
    }
    services.addPerson(_person).then((response) => {
      setPersons((persons) => {
        const copyPersons = [...persons];
        copyPersons.push(response.data);
        return copyPersons;
      });
    });

    setNewName("");
    setNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
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
