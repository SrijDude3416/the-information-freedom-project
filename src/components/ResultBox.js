// src/components/ResultBox.js
import React from 'react';
import LoadingCircle from './LoadingCircle';

const ResultBox = ({ result, onSummarize, isLoading, summary }) => {
  return (
    <div className="result-box">
      <h3>
        {result.orientation}.{' '}
        <a href={result.link} target="_blank" rel="noopener noreferrer">
          {result.title}
        </a>
      </h3>
      <p>{result.description}</p>
      <button onClick={() => onSummarize(result.link, result.description)}>
        Summarize
      </button>
      {isLoading && <LoadingCircle />}
      {summary && (
        <div className="summary-box">
          <h4>Summary:</h4>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default ResultBox;
