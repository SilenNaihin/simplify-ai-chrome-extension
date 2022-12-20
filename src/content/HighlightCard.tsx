import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
// import ReactMarkdown from 'react-markdown';
// import rehypeHighlight from 'rehype-highlight';
// import Browser from 'webextension-polyfill';
// import ChatGPTFeedback from './ChatGPTFeedback';

interface HighlightCar {
  phrase: string;
}

const HighlightCard = ({ phrase }: HighlightCar) => {
  const [answer, setAnswer] = useState(null);
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0);

  return <TextSpan>{phrase}</TextSpan>;
};

export default HighlightCard;

const TextSpan = styled.span`
  background-color: yellow;
  position: relative;
  cursor: pointer;
`;
