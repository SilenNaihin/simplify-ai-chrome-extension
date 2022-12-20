import { fetchSSE } from './fetch-sse';
import { v4 as uuidv4 } from 'uuid';
import ExpiryMap from 'expiry-map';

export const KEY_ACCESS_TOKEN = 'accessToken';
export const cache = new ExpiryMap(10 * 1000);

export async function getAccessToken() {
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

export async function generateAnswers(question: string) {
  const accessToken = await getAccessToken();

  console.log(accessToken);

  const controller = new AbortController();

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
    onMessage(message: string) {
      console.log('SSE MESSAGE', message);
      if (message === '[DONE]') {
        console.log('MESSAGE DONE');
        return;
      }
      const data = JSON.parse(message);
      const text = data.message?.content?.parts?.[0];
      if (text) {
        console.log('TEXT FROM CHATGPT', text);
        return {
          text,
          messageId: data.message.id,
          conversationId: data.conversation_id,
        };
      }
    },
  });
}
