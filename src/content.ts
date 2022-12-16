chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'SIMPLIFY_GPT') {
    console.log(message.data);
  }
});
