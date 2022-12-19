chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'SIMPLIFY_GPT') {
    showLoadingCursor();
    console.log(message.data);
    const range = document?.getSelection()?.getRangeAt(0);
    const span = document.createElement('span');
    span.style.backgroundColor = 'yellow';
    if (range) {
      span.appendChild(range.extractContents());
      range.insertNode(span);
      //   range.deleteContents();
      //   range.insertNode(document.createTextNode('newValue'));
    }

    console.log('message', message.data.info.selectionText);

    chrome.runtime.sendMessage(
      message.data.tabID,
      {
        type: 'EXPLANATION',
        data: message.data.selectionText,
      },
      (response) => {
        console.log('response', response.data);
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
