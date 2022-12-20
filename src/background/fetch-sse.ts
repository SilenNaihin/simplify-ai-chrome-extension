import { createParser } from 'eventsource-parser';
import { streamAsyncIterable } from './stream-async-iterable';

export async function fetchSSE(resource: any, options: any) {
  const { onMessage, ...fetchOptions } = options;
  console.log(onMessage, fetchOptions);
  const resp = await fetch(resource, fetchOptions);
  console.log(resp);
  const parser = createParser((event) => {
    if (event.type === 'event') {
      onMessage(event.data);
    }
  });
  console.log(parser);
  for await (const chunk of streamAsyncIterable(resp.body)) {
    const str = new TextDecoder().decode(chunk);
    parser.feed(str);
  }
  console.log('done');
}
