import { ChatGPTAPI, getOpenAIAuth } from 'chatgpt';

// export const getResponse = async (text: string) => {
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

export const getResponse = async (text: string) => {
  console.log('getRsponse', text + 'hello world');
  return text + 'hello world';
};
