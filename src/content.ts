chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'SIMPLIFY_GPT') {
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
  }
});
