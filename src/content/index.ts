import React from 'react';
import ReactDOM from 'react-dom';
import HighlightCard from './HighlightCard';
import { removeContain } from './removeContain';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('before message type', message);
  if (message.type === 'SIMPLIFY_GPT') {
    showLoadingCursor();
    console.log(message.data);
    const selection = document?.getSelection();
    const range = selection?.getRangeAt(0);

    const rootRect = document.documentElement.getBoundingClientRect();

    if (range) {
      const component = React.createElement(HighlightCard, {
        phrase: message.data.selectionText,
        rectRange: range.getBoundingClientRect(),
        rootRect,
      });
      const container = document.createElement('span');

      console.log(
        'component, range',
        component,
        range,
        range?.extractContents()
      );
      // render component into the container element
      ReactDOM.render(component, container);
      // insert container element into the DOM in place of the range object
      range.insertNode(container);

      let ancestor = range.commonAncestorContainer;

      removeContain({ ancestor, checkParentsInterval: 6 });

      let parent: any = ancestor.parentNode;

      while (!parent.innerHTML) {
        parent = ancestor.parentNode;
      }
    }

    selection?.removeAllRanges();

    restoreCursor();
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
