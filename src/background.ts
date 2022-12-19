import { ChatGPTAPI, getOpenAIAuth } from 'chatgpt';

chrome.contextMenus.create({
  id: 'simplify-gpt',
  title: 'SimplifyGPT',
  contexts: ['selection'], // Display the menu item when text is highlighted
});

// const getResponse = async (text: string) => {
//   //   chrome.storage.sync.set(
//   //     {
//   //       email: 'your_email@example.com',
//   //       password: 'your_password',
//   //     },
//   //     () => {
//   //       console.log('Values saved to storage');
//   //     }
//   //   );

//   //   const { email, password } = await chrome.storage.sync.get([
//   //     'email',
//   //     'password',
//   //   ]);

//   const openAIAuth = await getOpenAIAuth({
//     email: 'brotherband3@gmail.com',
//     password: 'openAI$ilen1',
//   });
//   const gptApi = new ChatGPTAPI({
//     ...openAIAuth,
//   });

//   await gptApi.ensureAuth();

//   // send a message and wait for the response
//   const response = await gptApi.sendMessage(
//     'Explain what this term or phrase is using simple, concise, and understandable language.' +
//       text
//   );

//   // response is a markdown-formatted string
//   return response;
// };

// Listen for when the user clicks on the context menu item

const getResponse = async (text: string) => {
  console.log('getRsponse', text + 'hello world');
  return text + 'hello world';
};

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (tab?.id) {
    // info.menuItemId === 'simplify-gpt' &&
    // Send a message to the content script
    chrome.tabs.sendMessage(tab.id, {
      type: 'SIMPLIFY_GPT',
      data: { info, tabId: tab.id },
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
