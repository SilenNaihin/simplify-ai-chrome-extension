import { createParser } from 'eventsource-parser';
import { streamAsyncIterable } from './stream-async-iterable';

export async function fetchSSE(
  resource: string,
  options: RequestInit & {
    onMessage: (message: string, error?: boolean) => void;
  }
) {
  const { onMessage, ...fetchOptions } = options;
  const resp = await fetch(resource, fetchOptions);
  if (!resp.ok) {
    const detail = (await resp.json().catch(() => ({}))).detail;
    const errMsg = detail || `${resp.status} ${resp.statusText}`;
    onMessage(errMsg, true);
    throw new Error(errMsg);
  }
  const parser = createParser((event) => {
    if (event.type === 'event') {
      onMessage(event.data);
    }
  });
  for await (const chunk of streamAsyncIterable(resp.body!)) {
    const str = new TextDecoder().decode(chunk);
    parser.feed(str);
  }
}
