import React from 'react';
import styled from 'styled-components';
import GPTResponse from './GPTResponse';

interface HighlightCard {
  phrase: string;
}

const HighlightCard = ({ phrase }: HighlightCard) => {
  return (
    <TextSpan>
      {phrase + ' '}
      <HoverContainer>
        <GPTResponse phrase={phrase} />
      </HoverContainer>
    </TextSpan>
  );
};

export default HighlightCard;

const TextSpan = styled.span`
  background-color: yellow;
  position: relative;
  cursor: pointer;
`;

const HoverContainer = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');

  font-family: font-family: 'Lato', sans-serif;
  position: absolute;
  border-radius: 6px;
  line-height: 1.5;
  padding: 30px 15px;
  scroll: auto;

  @media (prefers-color-scheme: light) {
    border-color: #dadce0;
    background-color: white;
  }

  @media (prefers-color-scheme: dark) {
    border-color: #3c4043;
    background-color: #202124;
  }

  @media (max-width: 768px) {
    max-width: 40%;
    max-height: 100px;
    font-size: 14px;
  }
  @media (max-width: 1000px) {
    max-width: 20%;
    max-height: 200px;
    font-size: 16px;
  }
  @media (max-width: 1200px) {
    max-width: 15%;
    max-height: 220px;
    font-size: 18px;
  }
  @media (min-width: 1200px) {
    max-width: 12%;
    max-height: 250px;
    font-size: 20px;
  }
`;
