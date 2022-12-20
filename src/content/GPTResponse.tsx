import React from 'react';
import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';

interface GPTResponse {
  phrase: string;
}

const GPTResponse = ({ phrase }: GPTResponse) => {
  const [answer, setAnswer] = useState<any>(null);
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const port = chrome.runtime.connect();
    const listener = (msg: any) => {
      if (msg.text) {
        setAnswer(msg);
      } else if (msg.error === 'UNAUTHORIZED' || msg.error === 'CLOUDFLARE') {
        setError(msg.error);
      } else {
        setError('EXCEPTION');
      }
    };
    port.onMessage.addListener(listener);
    port.postMessage({ question: phrase });
    return () => {
      port.onMessage.removeListener(listener);
      port.disconnect();
    };
  }, [phrase, retry]);

  // retry error on focus
  useEffect(() => {
    const onFocus = () => {
      if (error && error !== 'EXCEPTION') {
        setError('');
        setRetry((r) => r + 1);
      }
    };
    window.addEventListener('focus', onFocus);
    return () => {
      window.removeEventListener('focus', onFocus);
    };
  }, [error]);

  if (answer) {
    return (
      <div>
        <Header>ChatGPT</Header>
        <ReactMarkdown rehypePlugins={[[rehypeHighlight, { detect: true }]]}>
          {answer.text}
        </ReactMarkdown>
      </div>
    );
  }

  if (error === 'UNAUTHORIZED' || error === 'CLOUDFLARE') {
    return (
      <p>
        Please login and pass Cloudflare check at{' '}
        <a href='https://chat.openai.com' target='_blank' rel='noreferrer'>
          chat.openai.com
        </a>
      </p>
    );
  }
  if (error) {
    return <p>Failed to load response from ChatGPT</p>;
  }

  return <Loading>Waiting for ChatGPT response...</Loading>;
};

export default GPTResponse;

const pulseText = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0.5;
  }
}
`;

const Loading = styled.div`
  color: #b6b8ba;
  animation: ${pulseText} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

const Header = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`;
