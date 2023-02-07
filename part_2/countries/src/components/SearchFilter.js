const SearchFilter = ({ query, queryChangeHandler }) => {
  return (
    <div>
      find countries: <input value={query} onChange={queryChangeHandler} />
    </div>
  );
};

export default SearchFilter;
