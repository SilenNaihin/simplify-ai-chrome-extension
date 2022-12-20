import React from 'react';
import ReactDOM from 'react-dom';
import HighlightCard from './HighlightCard';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('before message type', message);
  if (message.type === 'SIMPLIFY_GPT') {
    showLoadingCursor();
    console.log(message.data);
    const range = document?.getSelection()?.getRangeAt(0);
    const component = React.createElement(HighlightCard, {
      phrase: message.data.selectionText,
    });
    const container = document.createElement('span');

    console.log('component, range', component, range, range?.extractContents());
    if (range) {
      // render component into the container element
      ReactDOM.render(component, container);
      // insert container element into the DOM in place of the range object
      range.insertNode(container);
    }

    console.log('message', message.data.selectionText);

    restoreCursor();

    // chrome.runtime.sendMessage(
    //   {
    //     type: 'EXPLANATION',
    //     data: { text: message.data.selectionText },
    //   },
    //   (response) => {
    //     console.log('response', response);

    //   }
    // );
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
