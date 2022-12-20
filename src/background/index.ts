import { KEY_ACCESS_TOKEN, cache, generateAnswers } from './generate-answers';

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

// chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
//   if (message.type === 'EXPLANATION') {
//     console.log('before getresponse', message, sender);
//     try {
//       const response = await generateAnswers(message.data.text);
//       return response;
//     } catch (err: any) {
//       console.error(err);
//       sendResponse({ error: err.message });
//       cache.delete(KEY_ACCESS_TOKEN);
//     }
//   }
// });

chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener(async (msg) => {
    console.debug('received msg', msg);
    try {
      await generateAnswers(port, msg.question);
    } catch (err: any) {
      console.error(err);
      port.postMessage({ error: err.message });
      cache.delete(KEY_ACCESS_TOKEN);
    }
  });
});
