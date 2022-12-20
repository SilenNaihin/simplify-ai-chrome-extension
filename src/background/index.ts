import { getResponse } from './aiResponse';

chrome.contextMenus.create({
  id: 'simplify-gpt',
  title: 'SimplifyGPT',
  contexts: ['selection'], // Display the menu item when text is highlighted
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  console.log(info, tab);
  // info.menuItemId === 'simplify-gpt' &&
  // Send a message to the content script
  if (tab?.id) {
    chrome.tabs.sendMessage(tab.id, {
      type: 'SIMPLIFY_GPT',
      data: info,
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('beforeIf');
  if (message.type === 'EXPLANATION') {
    console.log('before getresponse', message, sender);
    getResponse(message.data.text).then((explanation) => {
      console.log('hey', explanation);
      sendResponse({ data: explanation });
    });
    return true; // indicate that a response will be sent asynchronously
  }
});
