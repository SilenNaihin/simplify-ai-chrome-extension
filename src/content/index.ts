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

      // sync for syncing across dvices for the google account. add storage to manifest
      // chrome.storage.local.get('highlightArray', (items) => {
      //   highlightArray = items.highlightArray
      //     ? JSON.parse(items.highlightArray)
      //     : [];
      // });
      const storageValue = window.sessionStorage.getItem('highlightArray');
      if (storageValue) {
        highlightArray = JSON.parse(storageValue);
      } else {
        highlightArray = [];
      }

      console.log('got highlightArray', highlightArray);

      const key = highlightArray.length;
      highlightArray.push(key);

      // chrome.storage.local.set(
      //   { highlightArray: JSON.stringify(highlightArray) },
      //   () => {
      //     console.log('Array is stored in Chrome storage');
      //   }
      // );
      window.sessionStorage.setItem(
        'highlightArray',
        JSON.stringify(highlightArray)
      );
      console.log('Array is stored in Chrome storage', highlightArray);

      // background-color: ${(p) => (p.click ? '#00d8ff' : '#55e1fa')} !important;
      const highlightColor = '#55e1fa';

      highlightText({
        selectionString,
        ancestor,
        selection,
        highlightColor,
        key,
      });

      const component = React.createElement(HighlightCard, {
        phrase: message.data.selectionText,
        highlightRect: range.getBoundingClientRect(),
      });
      const container = document.createElement('span');

      // console.log(
      //   'component, range',
      //   component,
      //   range,
      //   range?.extractContents()
      // );
      // render component into the container element
      ReactDOM.render(component, container);

      document.body.insertBefore(container, document.body.firstChild);

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

window.addEventListener('beforeunload', () => {
  window.sessionStorage.setItem('highlightArray', JSON.stringify([]));
});
