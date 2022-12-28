import React from 'react';
import ReactDOM from 'react-dom';
import HighlightCard from './HighlightCard';
import { highlightText } from './highlightText';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('before message type', message);
  if (message.type === 'SIMPLIFY_GPT') {
    showLoadingCursor();
    console.log(message.data);
    const selection = document?.getSelection();
    const range = selection?.getRangeAt(0);
    const selectionString = selection?.toString();

    if (selection && range && selectionString) {
      let ancestor: any = range.commonAncestorContainer;
      // Sometimes the element will only be text. Get the parent in that case
      // TODO: Is this really necessary?
      while (!ancestor.innerHTML) {
        ancestor = ancestor.parentNode;
      }

      let highlightArray: number[] = [];

      chrome.storage.sync.get('highlightArray', (items) => {
        highlightArray = JSON.parse(items.myArray);
      });

      const key = highlightArray.length;
      highlightArray.push(key);

      chrome.storage.sync.set(
        { highlightArray: JSON.stringify(highlightArray) },
        () => {
          console.log('Array is stored in Chrome storage');
        }
      );

      // background-color: ${(p) => (p.click ? '#00d8ff' : '#55e1fa')} !important;
      const highlightColor = '#55e1fa';

      highlightText({
        selectionString,
        ancestor,
        selection,
        highlightColor,
        key,
      });

      //   const component = React.createElement(HighlightCard, {
      //     phrase: message.data.selectionText,
      //     highlightRect: range.getBoundingClientRect(),
      //   });
      //   const container = document.createElement('span');

      //   console.log(
      //     'component, range',
      //     component,
      //     range,
      //     range?.extractContents()
      //   );
      //   // render component into the container element
      //   ReactDOM.render(component, container);
      //   // insert container element into the DOM in place of the range object
      //   range.insertNode(container);
      // }

      // Deselect text
      if (selection.removeAllRanges) selection.removeAllRanges();

      // Attach mouse hover event listeners to display tools when hovering a highlight
      // const parent = ancestor.parent();
      // parent.find(`.${HIGHLIGHT_CLASS}`).each((_i, el) => {
      //   initializeHighlightEventListeners(el);
      // });

      restoreCursor();
    }
  }
});

const showLoadingCursor = () => {
  const style = document.createElement('style');
  style.id = 'corsor_wait';
  style.innerHTML = `* {cursor: wait;}`;
  document.head.insertBefore(style, null);
};

const restoreCursor = () => {
  document?.getElementById('corsor_wait')?.remove();
};
