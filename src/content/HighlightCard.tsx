import React, { useState, useRef } from 'react';
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
        <GPTResponse phrase={phrase} />
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
  background-color: ${(p) => (p.click ? '#00d8ff' : '#55e1fa')};
  cursor: pointer;
`;

const Header = styled.div`
  font-weight: bold;
  font-size: 14px;
  margin-bottom: -6px;
`;

interface HoverContainer {
  show: boolean;
}
const HoverContainer = styled.div<HoverContainer>`
  @import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');

  font-family: font-family: 'Lato', sans-serif;
  position: absolute;
  border-radius: 8px;
  line-height: 1.5;
  padding: 12px 10px 0px 10px;
  overflow: auto;
  border: 1px solid black;
  text-align: left;
  font-size: 14px;

  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  display: ${(p) => (p.show ? '' : 'none')};

  @media (prefers-color-scheme: light) {
    border-color: #dadce0;
    background-color: white;
  }

  @media (prefers-color-scheme: dark) {
    border-color: #3c4043;
    background-color: #202124;
  }

  @media (max-width: 768px) {
    width: 250px;
    max-height: 125px;
  }
  @media (max-width: 1000px) {
    width: 340px;
    max-height: 170px;
  }
  @media (max-width: 1200px) {
    width: 400px;
    max-height: 200px;
  }
  @media (min-width: 1200px) {
    width: 500px;
    max-height: 230px;
  }
`;
