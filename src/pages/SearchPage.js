// src/pages/SearchPage.js
import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import ResultBox from '../components/ResultBox';
import LoadingCircle from '../components/LoadingCircle';
import TextSummarizer from '../components/Summarizer';
import { pythonURI } from '../assets/js/api/config.js';

import '../styles/SearchPage.css';

const SearchPage = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [summaries, setSummaries] = useState({});
  const [isSearched, setIsSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingSummarize, setLoadingSummarize] = useState(null);

  const search = async () => {
    setIsLoading(true);
    setIsSearched(true); 
    const URL_search = pythonURI + '/search';
    const response = await fetch(URL_search, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input }),
    });
    const results = await response.json();
    setResults(results);
    setIsLoading(false);
  };

  const summarize = async (link, title) => {
    setLoadingSummarize(link);
    const URL_summarize = pythonURI + '/summarize';
    const response = await fetch(URL_summarize, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ link }),
    });
    const data = await response.json();
    setSummaries((prevSummaries) => ({
      ...prevSummaries,
      [link]: { title, summary: data.summary },
    }));
    setLoadingSummarize(null);
  };

  console.log(results);

  // Filter results by type and remove duplicates
  const seenLinks = new Set();
  const counterResults = results.filter((result) => {
    if (result.orientation === 'Counter:' && !seenLinks.has(result.link)) {
      seenLinks.add(result.link);
      return true;
    }
    return false;
  });

  const supportResults = results.filter((result) => {
    if (result.orientation === 'Support:' && !seenLinks.has(result.link)) {
      seenLinks.add(result.link);
      return true;
    }
    return false;
  });

  return (
    <div className="search-page">
      <div className="search-results-title">
        <h1>{isSearched ? 'Search Results' : 'Search Anything'}</h1>
      </div>

      <div className="search-bar-container">
        <SearchBar input={input} onChange={(e) => setInput(e.target.value)} onSearch={search} />
      </div>

      {isLoading && <LoadingCircle />}

      {isSearched && (
        <div className="results-container">
          <div className="results-box counter-results">
            <h2>Counter Sources</h2>
            {counterResults.length > 0 ? (
              counterResults.map((result, index) => (
                <ResultBox
                  key={index}
                  result={result}
                  onSummarize={() => summarize(result.link, result.title)}
                  isLoading={loadingSummarize === result.link}
                  summary={summaries[result.link]?.summary}
                />
              ))
            ) : (
              <p>No counter sources found.</p>
            )}
          </div>

          <div className="results-box support-results">
            <h2>Support Sources</h2>
            {supportResults.length > 0 ? (
              supportResults.map((result, index) => (
                <ResultBox
                  key={index}
                  result={result}
                  onSummarize={() => summarize(result.link, result.title)}
                  isLoading={loadingSummarize === result.link}
                  summary={summaries[result.link]?.summary}
                />
              ))
            ) : (
              <p>No support sources found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );  
};

export default SearchPage;
