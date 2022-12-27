import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import GPTResponse from './GPTResponse';
import { useOutsideAlerter, useWindowSize, useCalcBoxDim } from './utils';

interface HighlightCard {
  phrase: string;
  rectRange: DOMRect;
  rootRect: DOMRect;
}

const HighlightCard = ({ phrase, rectRange, rootRect }: HighlightCard) => {
  const [clicked, setClicked] = useState<boolean>(true);
  const [width] = useWindowSize();
  const [boxWidth, boxMaxHeight] = useCalcBoxDim(width);
  const [leftSide, setLeftSide] = useState<number>(0);
  const [topSide, setTopSide] = useState<number>(0);

  const textRef = useRef(null);
  useOutsideAlerter(textRef, () => setClicked(false));

  useEffect(() => {
    `calculate the coordinates of the fixed box in relation to the bounding rect of the highlight `;
    const { left, top, right, bottom } = rectRange;
    const rootWidth = rootRect.width;
    const rootHeight = rootRect.height;

    // where the left side of the box will start
    let rangeMiddle = (left + right) / 2;

    // this means the box is going off of the screen
    while (rangeMiddle + boxWidth >= rootWidth) {
      rangeMiddle -= 1;
    }
    // add 10px of padding
    setLeftSide(rangeMiddle - 10);

    // calculate where the top of the box will start.
    if (bottom + boxMaxHeight < rootHeight) {
      // + 10 for min padding
      setTopSide(bottom + 10);
    } else {
      setTopSide(top + 10);
    }
  }, [width]);

  return (
    <Span ref={textRef}>
      <OriginalText onClick={() => setClicked(!clicked)} click={clicked}>
        {phrase}
      </OriginalText>
      <HoverContainer
        maxHeight={boxMaxHeight}
        width={boxWidth}
        leftSide={leftSide}
        top={topSide}
        show={clicked}
      >
        <Header>ChatGPT</Header>
        <GPTResponse phrase={phrase} clicked={clicked} />
      </HoverContainer>
    </Span>
  );
};

export default HighlightCard;

const Span = styled.span`
  all: inherit;
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
  margin-bottom: !important;
`;

interface HoverContainer {
  show: boolean;
  leftSide: number;
  top: number;
  width: number;
  maxHeight: number;
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
  contain: initial !important;

  @import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');
  font-family: font-family: 'Lato', sans-serif !important;

  position: fixed !important;
  left: ${(p) => p.leftSide}px !important;
  top: ${(p) => p.top}px !important;
  
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

  width: ${(p) => p.width}px !important;
  max-height: ${(p) => p.maxHeight}px !important;
`;
