import { useState } from "react";

const Name = ({ name }) => {
  return <p>{name}</p>;
};

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const changeHandler = (event) => {
    setNewName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const _person = {
      name: event.target[0].value,
    };

    const existingPerson = persons.find(
      (person) =>
        person.name.toLocaleLowerCase() === _person.name.toLocaleLowerCase()
    );
    if (existingPerson) {
      window.alert(`${existingPerson.name} is aleready added in the phonebook`);
      return;
    }
    setPersons((persons) => {
      const updatedPersons = [...persons];
      updatedPersons.push(_person);
      return updatedPersons;
    });

    setNewName("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onSubmit}>
        <div>
          name: <input value={newName} onChange={changeHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => {
        return <Name name={person.name} key={person.name} />;
      })}
    </div>
  );
};

export default App;
