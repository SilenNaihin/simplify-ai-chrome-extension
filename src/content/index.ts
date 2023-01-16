import { highlightText } from './highlightText';
import ReactDOM from 'react-dom';
import HighlightCard from './HighlightCard';
import styled from 'styled-components';
import React from 'react';

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

      highlightText({
        selectionString,
        ancestor,
        selection,
        key,
      });

      // const highlightNode = React.createElement(HighlightCard, {
      //   phrase: highlightTextEl.nodeValue,
      //   key: key,
      // });

      // const container = document.createElement('span');

      // ReactDOM.render(highlightNode, container);

      // parentElement.insertBefore(container, insertBeforeElement);

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
