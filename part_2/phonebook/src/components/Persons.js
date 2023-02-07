import Person from "./Person";

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

export default Persons;
