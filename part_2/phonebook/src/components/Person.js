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

export default Person;
