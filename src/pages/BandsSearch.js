import React, { useState, useEffect } from 'react';
import './search-styles.scss'; // Import the search styles
import band from '../band.txt';

const BandsSearch = () => {
  const [selectedCriteria, setSelectedCriteria] = useState([]);
  const [filteredLines, setFilteredLines] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const criteriaList = [
    'Pop',
    'Rock',
    'Jazz',
    'Country',
    'Ethnic',
    'Original music',
    'Covers',
    'Folk',
    'Metal',
    'Funk',
    'Punk',
    'Reggaton',
    'Weddind Music',
    'Bar Mitzvah Music',
    'singing',
    'Acoustic guitar',
    'Electric Guitar',
    'Bass',
    'Drums',
    'Saxophone',
    'Keyboards',
    'Piano',
    'Percussion',
    'Flute',
    'Violin',
    'Male Singer',
    'Female Singer'
  ];

  useEffect(() => {
    fetch(band)
      .then(response => response.text())
      .then(data => {
        const lines = data.split('\n');
        const filteredLines = lines.filter(line => {
          return selectedCriteria.every(c => line.includes(c)) &&
                 (searchQuery === '' || line.toLowerCase().includes(searchQuery.toLowerCase()));
        });
        setFilteredLines(filteredLines);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, [selectedCriteria, searchQuery]);

  const handleCheckboxChange = (criteria) => {
    if (selectedCriteria.includes(criteria)) {
      setSelectedCriteria(selectedCriteria.filter(c => c !== criteria));
    } else {
      setSelectedCriteria([...selectedCriteria, criteria]);
    }
  };

  return (
    <div className="pageContainer">
      <div className="background"></div>
      <h2>Band Search</h2>
      <div className="searchContainer">
        <div className="searchForm">
          <input
            type="text"
            placeholder="Search bands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="button">&#128269;</button>
        </div>
        <form className="criteriaForm">
          {criteriaList.map((criteria, index) => (
            <label key={index}>
              <input
                type="checkbox"
                value={criteria}
                checked={selectedCriteria.includes(criteria)}
                onChange={() => handleCheckboxChange(criteria)}
              />
              {criteria}
            </label>
          ))}
        </form>
      </div>
      <div className="resultsContainer">
        <h3>Results</h3>
        <table className="resultsTable">
          <thead>
            <tr>
              <th>Band Name</th>
              <th>Link</th>
              <th>Genres</th>
            </tr>
          </thead>
          <tbody>
            {filteredLines.map((line, index) => {
              const [bandName, website, genres] = line.split('|');
              return (
                <tr key={index}>
                  <td>{bandName}</td>
                  <td><a href={website} target="_blank" rel="noopener noreferrer">{website}</a></td>
                  <td>{genres}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <button className="backButton" onClick={() => window.history.back()}>Go Back</button>
    </div>
  );
};

export default BandsSearch;
