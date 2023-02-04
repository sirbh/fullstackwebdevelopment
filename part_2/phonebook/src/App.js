import { useState } from "react";

const Person = ({ person }) => {
  return (
    <p>
      {person.name} {person.number}
    </p>
  );
};

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", number:"040-1234567" }]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");

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
      number: event.target[1].value
    };

    const existingPerson = persons.find(
      (person) =>
        person.name.toLocaleLowerCase() === _person.name.toLocaleLowerCase()
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
    setNumber("")
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onSubmit}>
        <div>
          name: <input value={newName} onChange={nameChangeHandler} />
        </div>
        <div>
          number: <input value={number} onChange={numberChangeHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => {
        return (
          <Person person={person} key={person.name} />
        );
      })}
    </div>
  );
};

export default App;
