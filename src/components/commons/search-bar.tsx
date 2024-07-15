import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <input
      type="text"
      className='search-bar'
      placeholder="Search by name or domain"
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
    />
  );
};

export default SearchBar;
