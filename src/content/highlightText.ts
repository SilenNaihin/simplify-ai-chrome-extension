import HighlightInfo from './HighlightInfo';
import { HIGHLIGHT_CLASS, HIGHLIGHT_COLORS } from './utils';
import styled from 'styled-components';

interface HighlightText {
  selectionString: string;
  ancestor: HTMLElement;
  selection: Selection;
  key: number;
}

export const highlightText = ({
  selectionString,
  ancestor,
  selection,
  key,
}: HighlightText) => {
  const highlightInfo: HighlightInfo = {
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
    console.log('false', e);
    return false;
  }
};
interface RecursiveWrapper {
  ancestor: HTMLElement;
  highlightInfo: HighlightInfo;
  startFound: boolean;
  charsHighlighted: number;
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
    key,
    anchorOffset,
    focusOffset,
    selectionString,
  }: HighlightInfo = highlightInfo;
  const selectionLength = selectionString.length;

  console.log(
    'HIGHLIGHT_INFO',
    highlightInfo,
    'ancestor',
    ancestor,
    'startFound',
    startFound,
    'charsHighlighted',
    charsHighlighted
  );

  // get parent of ancestor
  // ORIGINAL: ancestor.contents().each((_index, element)
  // potential:
  // Array.from(ancestor.childNodes).forEach((element) => {
  //   const htmlElement = element as HTMLElement;

  // for (let x = 0; x < ancestor.childNodes.length; x++) {
  //   const element = ancestor.childNodes[x];

  Array.from(ancestor.childNodes).forEach((element, x) => {
    console.log('-------------------', x);
    console.log(
      'ancestor',
      ancestor,
      'ancestor.childNodes',
      ancestor.childNodes,
      'ancestor.childNodes[x]',
      ancestor.childNodes[x + 1],
      'typeof',
      typeof ancestor.childNodes[x + 1]
    );

    console.log('htmlElement', element);
    console.log(
      'charsHighlighted >= selectionLength',
      charsHighlighted >= selectionLength
    );
    if (charsHighlighted >= selectionLength) return; // Stop early if we are done highlighting

    console.log(
      'element.nodeType !== Node.TEXT_NODE',
      element.nodeType !== Node.TEXT_NODE,
      'element instanceof Element',
      element instanceof HTMLElement
    );
    if (element.nodeType !== Node.TEXT_NODE && element instanceof HTMLElement) {
      // Only look at visible nodes because invisible nodes aren't included in the selected text
      const style = getComputedStyle(element);
      if (style.display !== 'none' && style.visibility !== 'hidden') {
        // @ts-ignore
        [startFound, charsHighlighted] = recursiveWrapper({
          ancestor: element,
          highlightInfo,
          startFound,
          charsHighlighted,
        });
        console.log(startFound, charsHighlighted);
      }
      return;
    }

    // Step 1:
    // The first element to appear could be the anchor OR the focus node,
    // since you can highlight from left to right or right to left
    let startIndex = 0;
    if (!startFound) {
      console.log(
        'startFound',
        startFound,
        'element',
        element,
        'anchor',
        anchor,
        'focus',
        focus
      );
      if (element !== anchor && element !== focus) return; // If the element is not the anchor or focus, continue
      //  !(anchor instanceof HTMLElement) && !(focus instanceof HTMLElement);

      startFound = true;
      startIndex = Math.min(
        ...[
          ...(element === anchor ? [anchorOffset] : []),
          ...(element === focus ? [focusOffset] : []),
        ]
      );
      console.log('new startFound', startFound, 'new startIndex', startIndex);
    }

    console.log(
      'element',
      element,
      'nodeValue',
      element.nodeValue,
      'parentElement',
      element.parentElement
    );

    // Step 2:
    // If we get here, we are in a text node, the start was found and we are not done highlighting
    const { nodeValue } = element;
    let parentElement = element.parentElement;

    console.log(
      'nodeValue',
      nodeValue,
      'parentNode',
      parentElement,
      'startIndex',
      startIndex,
      'ancestor.childNodes',
      ancestor.childNodes[x + 1]
    );

    // if it's a whitespace text node
    if (ancestor.childNodes[x + 1]) {
      // FIXME: do I need this? how do I handle just whitespaces that need to be highlighted
      parentElement = ancestor.childNodes[x + 1].parentElement;
      console.log(
        'sometimes parentNode',
        '__________________________________',
        ancestor.childNodes[x + 1],
        ancestor.childNodes[x + 1].parentNode,
        ancestor.childNodes[x + 1].parentElement
      );
    }

    // FIXME: sometimes its null. need to check why
    if (nodeValue && parentElement) {
      if (startIndex > nodeValue.length) {
        // Start index is beyond the length of the text node, can't find the highlight
        // NOTE: we allow the start index to be equal to the length of the text node here just in case
        throw new Error(
          `No match found for highlight string '${selectionString}'`
        );
      }

      // Split the text content into three parts, the part before the highlight, the highlight and the part after the highlight:
      const textNode = element as Text;
      const highlightTextEl = textNode.splitText(startIndex);

      console.log('highlightTextEl', highlightTextEl, 'startIndex', startIndex);

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
      if (parentElement.classList.contains(HIGHLIGHT_CLASS)) return;

      const elementCharCount = i - startIndex; // Number of chars to highlight in this particular element
      const insertBeforeElement = highlightTextEl.splitText(elementCharCount);
      const highlightText = highlightTextEl.nodeValue;

      // If the text is all whitespace, ignore it
      if (highlightText?.match(/^\s*$/u)) {
        parentElement.normalize(); // Undo any 'splitText' operations
        return;
      }

      console.log(
        `${elementCharCount} chars highlighted in text node ${nodeValue}`
      );

      // If we get here, highlight!
      // Wrap the highlighted text in a span with the highlight class name
      const highlightNode = document.createElement('span');
      highlightNode.classList.add(HIGHLIGHT_CLASS);
      highlightNode.style.backgroundColor = HIGHLIGHT_COLORS.active;
      highlightNode.textContent = highlightTextEl.nodeValue;
      highlightTextEl.remove();
      parentElement.insertBefore(highlightNode, insertBeforeElement);
    }
  });

  return [startFound, charsHighlighted];
};
