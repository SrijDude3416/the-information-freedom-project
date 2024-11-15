// src/components/TextSummarizer.js
import React from 'react';

const splitIntoParagraphs = (content) =>
  content.split('\n\n').map((p) => p.trim());

const splitIntoSentences = (s) => {
  const sentences = s.split('.');
  sentences.pop();
  return sentences;
};

const formatSentence = (sent) => sent.replace(/\W+/g, "");

const uniqueSet = (arr) => Array.from(new Set(arr));

const intersection = (arr1, arr2) => 
  arr1.filter((item) => arr2.includes(item)).length;

const sentencesIntersection = (sent1, sent2) => {
  const s1 = uniqueSet(sent1.split(" "));
  const s2 = uniqueSet(sent2.split(" "));
  if (s1.length + s2.length === 0) return 0;
  return intersection(s1, s2) / ((s1.length + s2.length) / 2);
};

const getSentencesRank = (content) => {
  const sentences = splitIntoSentences(content);
  const len = sentences.length;
  const values = Array(len).fill().map(() => Array(len).fill(null));

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      values[i][j] = sentencesIntersection(sentences[i], sentences[j]);
    }
  }

  const dict = {};
  for (let i = 0; i < len; i++) {
    let score = 0;
    for (let j = 0; j < len; j++) {
      if (i !== j) score += values[i][j];
    }
    dict[formatSentence(sentences[i])] = score;
  }

  return dict;
};

const getBestSentence = (paragraph, dict) => {
  const sentences = splitIntoSentences(paragraph);
  if (sentences.length < 2) return "";

  let bestSentence = "";
  let maxScore = 0;

  sentences.forEach((sentence) => {
    const formatted = formatSentence(sentence);
    const score = dict[formatted] || 0;
    if (score > maxScore) {
      maxScore = score;
      bestSentence = sentence;
    }
  });

  return bestSentence;
};

const getSummary = (content) => {
  const paragraphs = splitIntoParagraphs(content);
  const dict = getSentencesRank(content);
  return paragraphs.map((p) => getBestSentence(p, dict)).join(". ");
};

const TextSummarizer = ({ content }) => {
  const summary = getSummary(content);
  
  return (
    <div>
      <h2>Summary</h2>
      <p>{summary}</p>
    </div>
  );
};

export default TextSummarizer;
