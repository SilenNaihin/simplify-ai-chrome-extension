import { fetchSSE } from './fetch-sse';
import { v4 as uuidv4 } from 'uuid';
import ExpiryMap from 'expiry-map';
import { setConversationProperty } from './connection';

export const KEY_ACCESS_TOKEN = 'accessToken';
export const cache = new ExpiryMap(10 * 1000);

async function getAccessToken(): Promise<string> {
  if (cache.get(KEY_ACCESS_TOKEN)) {
    return cache.get(KEY_ACCESS_TOKEN);
  }
  const resp = await fetch('https://chat.openai.com/api/auth/session');
  if (resp.status === 403) {
    throw new Error('CLOUDFLARE');
  }
  const data = await resp.json().catch(() => ({}));
  if (!data.accessToken) {
    throw new Error('UNAUTHORIZED');
  }
  cache.set(KEY_ACCESS_TOKEN, data.accessToken);
  return data.accessToken;
}

export async function generateAnswers(
  port: chrome.runtime.Port,
  question: string
) {
  const accessToken = await getAccessToken();

  let conversationId: string | undefined;
  const deleteConversation = () => {
    if (conversationId) {
      setConversationProperty(accessToken, conversationId, {
        is_visible: false,
      });
    }
  };

  const controller = new AbortController();
  port.onDisconnect.addListener(() => {
    controller.abort();
  });

  console.log(accessToken);

  await fetchSSE('https://chat.openai.com/backend-api/conversation', {
    method: 'POST',
    signal: controller.signal,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      action: 'next',
      messages: [
        {
          id: uuidv4(),
          role: 'user',
          content: {
            content_type: 'text',
            parts: [question],
          },
        },
      ],
      model: 'text-davinci-002-render',
      parent_message_id: uuidv4(),
    }),
    onMessage(message: string, error?: boolean) {
      if (error) {
        console.log('SSE ERROR', message);
        port.postMessage({
          message,
        });
        return;
      } else {
        if (message === '[DONE]') {
          console.log('SSE MESSAGE DONE', message);
          deleteConversation();
          return;
        }
        const data = JSON.parse(message);
        const text = data.message?.content?.parts?.[0];
        conversationId = data.conversation_id;
        if (text) {
          console.log('TEXT FROM CHATGPT', text);
          port.postMessage({
            text,
            messageId: data.message.id,
            conversationId: data.conversation_id,
          });
        }
      }
    },
  });
}
