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
    const person = {
      name: event.target[0].value,
    };

    setPersons(persons=>{
      const updatedPersons = [...persons]
      updatedPersons.push(person)
      return updatedPersons
    })

    setNewName("")
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
