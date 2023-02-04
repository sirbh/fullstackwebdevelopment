import { useState } from "react";

const Person = ({ person }) => {
  return (
    <p>
      {person.name} {person.number}
    </p>
  );
};

const Persons = ({ persons, query }) => {
  return (
    <div>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(query.toLowerCase())
        )
        .map((person) => {
          return <Person person={person} key={person.name} />;
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
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [query, setQuery] = useState("");

  const queryChangeHandler = (event) => {
    setQuery(event.target.value);
  };

  const nameChangeHandler = (event) => {
    setNewName(event.target.value);
  };

  const numberChangeHandler = (event) => {
    setNumber(event.target.value);
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
      window.alert(`${existingPerson.name} is already added in the phonebook`);
      return;
    }
    setPersons((persons) => {
      const updatedPersons = [...persons];
      updatedPersons.push(_person);
      return updatedPersons;
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
      <Persons persons={persons} query={query} />
    </div>
  );
};

export default App;