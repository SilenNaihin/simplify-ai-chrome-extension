import './index.css';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('before message type', message);
  if (message.type === 'SIMPLIFY_GPT') {
    showLoadingCursor();
    console.log(message.data);
    const range = document?.getSelection()?.getRangeAt(0);
    const span = document.createElement('span');
    span.classList.add('highlight');
    if (range) {
      span.appendChild(range.extractContents());
      range.insertNode(span);
      //   range.deleteContents();
      //   range.insertNode(document.createTextNode('newValue'));
    }

    console.log('message', message.data.selectionText);

    chrome.runtime.sendMessage(
      {
        type: 'EXPLANATION',
        data: { text: message.data.selectionText },
      },
      (response) => {
        console.log('response', response);
        restoreCursor();
      }
    );
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
