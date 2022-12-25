import React from 'react';
import ReactDOM from 'react-dom';
import HighlightCard from './HighlightCard';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('before message type', message);
  if (message.type === 'SIMPLIFY_GPT') {
    showLoadingCursor();
    console.log(message.data);
    const selection = document?.getSelection();
    const range = selection?.getRangeAt(0);

    if (range) {
      const component = React.createElement(HighlightCard, {
        phrase: message.data.selectionText,
        // range: range,
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

      const ancestor = range.commonAncestorContainer;

      const checkParentsInterval = 6;
      let currentEl: any = ancestor;

      for (let x = 0; x < checkParentsInterval; x++) {
        // console.log(currentEl);
        if (currentEl.parentNode) {
          currentEl = currentEl.parentNode;

          const cssClasses = currentEl.classList;

          // console.log(cssClasses);

          cssClasses.forEach((className: any) => {
            const tempElement = document.createElement('div');
            tempElement.classList.add(className);

            const computedStyles = getComputedStyle(tempElement);

            // console.log(className, computedStyles);

            if (computedStyles.contain !== 'none') {
              currentEl.style.contain = 'none';
            }
          });
        }
      }
    }
    document.body.style.transform = 'scale(1)';

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
