import SearchInput from './SearchInput.jsx';
import Filter from './Filter.jsx';

// Search bar component consisting of
// a search input and a filters dropdown
function SearchBar() {
  return (
    <div className='search flex flex-row flex-wrap justify-space-between align-center'>
      <SearchInput />
      <Filter />
    </div>
  );
}
export default SearchBar;
