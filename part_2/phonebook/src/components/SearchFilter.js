const SearchFilter = ({ query, queryChangeHandler }) => {
  return (
    <div>
      name: <input value={query} onChange={queryChangeHandler} />
    </div>
  );
};

export default SearchFilter;
