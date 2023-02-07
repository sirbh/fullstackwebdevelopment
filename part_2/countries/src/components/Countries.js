import Country from "./Country";

const Countries = ({ countries, showHandler }) => {
  if (countries.length > 10) {
    return <div>Too many matches specify another filter</div>;
  }

  if (countries.length === 1) {
    return <Country country={countries[0]} />;
  }
  return (
    <div>
      {countries.map((country, i) => {
        return (
          <p key={country.name.official}>
            {country.name.official}{" "}
            <button
              onClick={() => {
                showHandler(i);
              }}
            >
              show
            </button>
          </p>
        );
      })}
    </div>
  );
};

export default Countries;
