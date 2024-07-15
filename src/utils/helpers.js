export const sortAlphabetically = (array, key) => {
    return array.sort((a, b) => a[key].localeCompare(b[key]));
  };
  
export const filterByTerm = (array, term, key) => {
return array.filter(item => item[key].toLowerCase().includes(term.toLowerCase()));
};
