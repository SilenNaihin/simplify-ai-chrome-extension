import HighlightInfo from './HighlightInfo';
import styled from 'styled-components';
import React from 'react';
import { HIGHLIGHT_CLASS } from './utils';

interface HighlightText {
  selectionString: string;
  ancestor: HTMLElement;
  selection: Selection;
  highlightColor: string;
  key: number;
}

export const highlightText = ({
  selectionString,
  ancestor,
  selection,
  highlightColor,
  key,
}: HighlightText) => {
  const highlightInfo: HighlightInfo = {
    color: highlightColor,
    selectionString: selectionString,
    anchor: selection.anchorNode,
    anchorOffset: selection.anchorOffset,
    focus: selection.focusNode,
    focusOffset: selection.focusOffset,
    key,
  };

  /**
   * STEPS:
   * 1 - Use the offset of the anchor/focus to find the start of the selected text in the anchor/focus element
   *     - Use the first of the anchor of the focus elements to appear
   * 2 - From there, go through the elements and find all Text Nodes until the selected text is all found.
   *     - Wrap all the text nodes (or parts of them) in a custom span DOM element
   */

  // Step 1 & 2
  try {
    recursiveWrapper({
      ancestor,
      highlightInfo,
      startFound: false,
      charsHighlighted: 0,
    });
  } catch (e) {
    return false;
  }
};
interface RecursiveWrapper {
  ancestor: HTMLElement;
  highlightInfo: HighlightInfo;
  startFound: any;
  charsHighlighted: any;
}

export const recursiveWrapper = ({
  ancestor,
  highlightInfo,
  startFound,
  charsHighlighted,
}: RecursiveWrapper) => {
  const {
    anchor,
    focus,
    anchorOffset,
    focusOffset,
    color,
    key,
    selectionString,
  }: HighlightInfo = highlightInfo;
  const selectionLength = selectionString.length;

  // get parent of ancestor
  // ORIGINAL: ancestor.contents().each((_index, element)
  // potential:
  //   for (let i = 0; i < ancestor.children.length; i++) {
  //     let element = ancestor.children[i];
  //     // logic here
  //   }
  Array.from(ancestor.childNodes).forEach((element) => {
    const htmlElement = element as HTMLElement;
    if (charsHighlighted >= selectionLength) return; // Stop early if we are done highlighting

    if (element.nodeType !== Node.TEXT_NODE) {
      // Only look at visible nodes because invisible nodes aren't included in the selected text
      const style = getComputedStyle(htmlElement);
      if (style.display !== 'none' && style.visibility !== 'hidden') {
        [startFound, charsHighlighted] = recursiveWrapper({
          ancestor: htmlElement,
          highlightInfo,
          startFound,
          charsHighlighted,
        });
      }
      return;
    }

    // Step 1:
    // The first element to appear could be the anchor OR the focus node,
    // since you can highlight from left to right or right to left
    let startIndex = 0;
    if (!startFound) {
      if (element !== anchor && element !== focus) return; // If the element is not the anchor or focus, continue
      //  !(anchor instanceof HTMLElement) && !(focus instanceof HTMLElement);

      startFound = true;
      startIndex = Math.min(
        ...[
          ...(element === anchor ? [anchorOffset] : []),
          ...(element === focus ? [focusOffset] : []),
        ]
      );
    }

    // Step 2:
    // If we get here, we are in a text node, the start was found and we are not done highlighting
    const { nodeValue, parentElement: parent }: any = htmlElement;

    if (startIndex > nodeValue.length) {
      // Start index is beyond the length of the text node, can't find the highlight
      // NOTE: we allow the start index to be equal to the length of the text node here just in case
      throw new Error(
        `No match found for highlight string '${selectionString}'`
      );
    }

    // Split the text content into three parts, the part before the highlight, the highlight and the part after the highlight:
    const highlightTextEl = nodeValue.splitText(startIndex);

    // Instead of simply blindly highlighting the text by counting characters,
    // we check if the text is the same as the selection string.
    let i = startIndex;
    for (; i < nodeValue.length; i++) {
      // Skip any whitespace characters in the selection string as there can
      // be more than in the text node:
      while (
        charsHighlighted < selectionLength &&
        selectionString[charsHighlighted].match(/\s/u)
      )
        charsHighlighted++;

      if (charsHighlighted >= selectionLength) break;

      const char = nodeValue[i];
      if (char === selectionString[charsHighlighted]) {
        charsHighlighted++;
      } else if (!char.match(/\s/u)) {
        // FIXME: Here, this is where the issue happens
        // Similarly, if the char in the text node is a whitespace, ignore any differences
        // Otherwise, we can't find the highlight text; throw an error
        throw new Error(
          `No match found for highlight string '${selectionString}'`
        );
      }
    }

    // If textElement is wrapped in a .highlighter--highlighted span, do not add this highlight
    // as it is already highlighted, but still count the number of charsHighlighted
    if (parent.classList.contains(HIGHLIGHT_CLASS)) return;

    const elementCharCount = i - startIndex; // Number of chars to highlight in this particular element
    const insertBeforeElement = highlightTextEl.splitText(elementCharCount);
    const highlightText = highlightTextEl.nodeValue;

    // If the text is all whitespace, ignore it
    if (highlightText.match(/^\s*$/u)) {
      parent.normalize(); // Undo any 'splitText' operations
      return;
    }

    // If we get here, highlight!
    // Wrap the highlighted text in a span with the highlight class name
    const highlightNode = React.createElement(
      OriginalText,
      { key: key, backgroundColor: color, className: HIGHLIGHT_CLASS },
      highlightTextEl.nodeValue
    );

    highlightTextEl.remove();
    parent.insertBefore(highlightNode, insertBeforeElement);
  });

  return [startFound, charsHighlighted];
};

// const OriginalText = styled.span<OriginalText>`
//   background-color: ${(p) =>
//     p.click || hover ? '#00d8ff' : '#55e1fa'} !important;
//   cursor: pointer !important;
// `;

interface OriginalText {
  backgroundColor: string;
}
const OriginalText = styled.span<OriginalText>`
  background-color: ${(p) => p.backgroundColor} !important;
  cursor: pointer !important;
`;
