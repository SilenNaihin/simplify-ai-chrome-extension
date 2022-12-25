import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import GPTResponse from './GPTResponse';
import { useOutsideAlerter } from './utils';

interface HighlightCard {
  phrase: string;
}

const HighlightCard = ({ phrase }: HighlightCard) => {
  const [clicked, setClicked] = useState<boolean>(true);

  const textRef = useRef(null);
  useOutsideAlerter(textRef, () => setClicked(false));

  return (
    <Span ref={textRef}>
      <OriginalText onClick={() => setClicked(!clicked)} click={clicked}>
        {phrase + ' '}
      </OriginalText>
      <HoverContainer show={clicked}>
        <Header>ChatGPT</Header>
        <GPTResponse phrase={phrase} clicked={clicked} />
      </HoverContainer>
    </Span>
  );
};

export default HighlightCard;

const Span = styled.span`
  position: relative;
`;

interface OriginalText {
  click: boolean;
}
const OriginalText = styled.span<OriginalText>`
  background-color: ${(p) => (p.click ? '#00d8ff' : '#55e1fa')} !important;
  cursor: pointer !important;
`;

const Header = styled.div`
  font-weight: bold !important;
  font-size: 14px !important;
  margin-bottom: -6px !important;
`;

interface HoverContainer {
  show: boolean;
}
const HoverContainer = styled.div<HoverContainer>`
  all: revert;
  line-height: 1.5 !important;
  text-align: left !important;
  font-size: 14px !important;
  text-decoration: none !important;
  color: #000 !important;
  overflow: auto !important;
  white-space: normal !important;

  @import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');
  font-family: font-family: 'Lato', sans-serif !important;

  position: fixed !important;
  
  border-radius: 8px !important;
  
  padding: 12px 10px !important;
  border: 1px solid black !important;
  
  z-index: 2147483647 !important;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px !important;

  display: ${(p) => (p.show ? '' : 'none')};

  @media (prefers-color-scheme: light) {
    border-color: #dadce0 !important;
    background-color: white !important;
  }

  @media (prefers-color-scheme: dark) {
    border-color: #3c4043 !important;
    background-color: #202124 !important;
  }

  @media (max-width: 768px) {
    width: 250px !important;
    max-height: 125px !important;
  }
  @media (max-width: 1000px) {
    width: 340px !important;
    max-height: 170px !important;
  }
  @media (max-width: 1200px) {
    width: 400px !important;
    max-height: 200px !important;
  }
  @media (min-width: 1200px) {
    width: 500px !important;
    max-height: 230px !important;
  }
`;
