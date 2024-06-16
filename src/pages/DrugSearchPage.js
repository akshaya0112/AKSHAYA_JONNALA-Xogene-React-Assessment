import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';

const DrugSearchPage = () => {
  const [drugs, setDrugs] = useState([]);
  const [error, setError] = useState('');

  const searchDrugs = async (query) => {
    try {
      const response = await axios.get(`https://rxnav.nlm.nih.gov/REST/drugs.json?name=${query}`);
      if (response.data.drugGroup.conceptGroup) {
        setDrugs(response.data.drugGroup.conceptGroup.flatMap(group => group.conceptProperties || []));
        setError('');
      } else {
        getSpellingSuggestions(query);
      }
    } catch (err) {
      setError('Error fetching drugs.');
    }
  };

  const getSpellingSuggestions = async (query) => {
    try {
      const response = await axios.get(`https://rxnav.nlm.nih.gov/REST/spellingsuggestions.json?name=${query}`);
      if (response.data.suggestionGroup.suggestionList) {
        setDrugs(response.data.suggestionGroup.suggestionList.suggestion.map(suggestion => ({ name: suggestion })));
        setError('');
      } else {
        setError('No results found.');
      }
    } catch (err) {
      setError('Error fetching spelling suggestions.');
    }
  };

  return (
    <div>
      <h1>Drug Search</h1>
      <SearchBar onSearch={searchDrugs} />
      {error && <p>{error}</p>}
      <ul>
        {drugs.map((drug) => (
          <li key={drug.rxcui || drug.name}>
            <a href={`/drugs/${drug.name}`}>{drug.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DrugSearchPage;
