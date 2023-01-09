import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import GPTResponse from './GPTResponse';
import {
  useOutsideAlerter,
  useWindowSize,
  useCalcBoxDim,
  useScrollPosition,
  HIGHLIGHT_COLORS,
  HIGHLIGHT_CLASS,
} from './utils';

interface HighlightCard {
  phrase: any;
  key: any;
}

const HighlightCard = ({ phrase, key }: HighlightCard) => {
  const [clicked, setClicked] = useState<boolean>(true);
  const [width] = useWindowSize();
  const [boxWidth, boxMaxHeight] = useCalcBoxDim(width);
  const [leftSide, setLeftSide] = useState<number>(0);
  const [prevLeftSide, setPrevLeftSide] = useState<number>(0);
  const [topSide, setTopSide] = useState<number>(0);

  const scrollPosition = useScrollPosition();

  const textRef = useRef<HTMLInputElement>(null);
  useOutsideAlerter(textRef, () => setClicked(false));

  const highlightRef = useRef<HTMLInputElement>(null);

  const updatePosition = () => {
    const root = document.documentElement;
    const rootRect = root.getBoundingClientRect();

    const highlightRect = highlightRef?.current?.getBoundingClientRect();

    if (highlightRect) {
      `calculate the coordinates of the fixed box in relation to the bounding rect of the highlight `;
      const { left, top, right, bottom, width } = highlightRect;
      const rootWidth = rootRect.width;
      const rootHeight = rootRect.height;
      const rootClientWidth = root.clientWidth;

      // where the left side of the box will start
      let leftAdjustment = left;

      if (right < rootClientWidth) {
        // this means the box is going off of the screen, adjust it to the left
        while (leftAdjustment + boxWidth >= rootWidth) {
          leftAdjustment -= 1;
        }
        // add 25px of padding for scrollbar
        setLeftSide(leftAdjustment - 25);
        setPrevLeftSide(leftAdjustment - 25);
      } else {
        // if it's greater that means it is off screen even if it is still within
        // the width of hte page. Snap to the right side of the highlight
        setLeftSide(prevLeftSide);
      }

      // calculate where the top of the box will start.
      if (bottom + boxMaxHeight < rootHeight) {
        // + 10 for min padding
        setTopSide(bottom + 10);
      } else {
        setTopSide(top + 10);
      }
    }
  };

  useEffect(() => {
    const startTime = performance.now();

    const update = () => {
      updatePosition();
      window.requestAnimationFrame(update);
    };
    update();

    const endTime = performance.now();
    const elapsedTime = endTime - startTime;
    console.log(`Elapsed time: ${elapsedTime}ms`);
  }, [scrollPosition, width]);

  return (
    <Span className={HIGHLIGHT_CLASS} ref={textRef}>
      <OriginalText
        ref={highlightRef}
        key={key}
        onClick={() => setClicked(!clicked)}
        click={clicked}
        color={HIGHLIGHT_COLORS}
      >
        {phrase}
      </OriginalText>
      <HoverContainer
        maxHeight={boxMaxHeight}
        width={boxWidth}
        show={clicked}
        leftSide={leftSide}
        top={topSide}
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
  color: any;
}

const OriginalText = styled.span<OriginalText>`
  background-color: ${(p) =>
    p.click ? p.color.active : p.color.inactive} !important;
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
const HoverContainer = React.memo(styled.div<HoverContainer>`
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
  left: ${(p) => (p.leftSide ? `${p.leftSide}px` : 'unset')} !important;
  top: ${(p) => p.top}px !important;
  transition: all 0.001s ease-out;
  
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
`);
