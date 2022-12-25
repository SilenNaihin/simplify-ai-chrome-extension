import React from 'react';
import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import { ResponseInt } from './ResponseInterface';

interface GPTResponse {
  phrase: string;
  clicked: boolean;
}

const GPTResponse = ({ phrase, clicked }: GPTResponse) => {
  const [answer, setAnswer] = useState<any>(null);
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    // const port = chrome.runtime.connect();
    // const listener = (msg: any) => {
    //   if (msg.text) {
    //     setAnswer(msg);
    //   } else if (msg.error) {
    //     setError(msg.error);
    //   } else {
    //     setError('EXCEPTION');
    //   }
    // };
    // port.onMessage.addListener(listener);
    // port.postMessage({ question: phrase });
    // return () => {
    //   port.onMessage.removeListener(listener);
    //   port.disconnect();
    // };
    setError('EXCEPTION');
  }, [phrase, retry]);

  // retry error on focus
  useEffect(() => {
    const onFocus = () => {
      if (error && error !== 'EXCEPTION') {
        setError('');
        setRetry(retry + 1);
      }
    };
    window.addEventListener('focus', onFocus);
    return () => {
      window.removeEventListener('focus', onFocus);
    };
  }, [error, clicked]);

  const styles = {
    general: {
      'line-height': '1.5 !important',
      'text-align': 'left !important',
      'font-size': '14px !important',
      'text-decoration': 'none !important',
      color: '#000 !important',
      overflow: 'auto !important',
      'white-space': 'normal !important',
    },
  };

  if (answer) {
    console.log(answer);
    return (
      <ReactMarkdown
        children={answer.text}
        components={{
          h1: ({ node, ...props }) => (
            <h1 style={{ all: 'revert', ...styles.general }} {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 style={{ all: 'revert', ...styles.general }} {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 style={{ all: 'revert', ...styles.general }} {...props} />
          ),
          h4: ({ node, ...props }) => (
            <h4 style={{ all: 'revert', ...styles.general }} {...props} />
          ),
          h5: ({ node, ...props }) => (
            <h5 style={{ all: 'revert', ...styles.general }} {...props} />
          ),
          h6: ({ node, ...props }) => (
            <h6 style={{ all: 'revert', ...styles.general }} {...props} />
          ),
          p: ({ node, ...props }) => (
            <p
              style={{
                all: 'revert',
                fontWeight: 'initial',
                ...styles.general,
              }}
              {...props}
            />
          ),
          pre: ({ node, ...props }) => (
            <pre style={{ all: 'revert', ...styles.general }} {...props} />
          ),
          span: ({ node, ...props }) => (
            <span style={{ all: 'revert', ...styles.general }} {...props} />
          ),
          em: ({ node, ...props }) => (
            <em style={{ all: 'revert', ...styles.general }} {...props} />
          ),
          a: ({ node, ...props }) => <a style={{ all: 'revert' }} {...props} />,
          img: ({ node, ...props }) => (
            <img style={{ all: 'revert' }} {...props} />
          ),
          hr: ({ node, ...props }) => (
            <hr style={{ all: 'revert', ...styles.general }} {...props} />
          ),
          li: ({ node, ...props }) => (
            <li style={{ all: 'revert', ...styles.general }} {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol style={{ all: 'revert', ...styles.general }} {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul style={{ all: 'revert', ...styles.general }} {...props} />
          ),
          strong: ({ node, ...props }) => (
            <strong style={{ all: 'revert', ...styles.general }} {...props} />
          ),
          code: ({ node, ...props }) => (
            <code
              style={{
                all: 'revert',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all',
                ...styles.general,
              }}
              {...props}
            />
          ),
        }}
        rehypePlugins={[[rehypeHighlight, { detect: true }]]}
      />
    );
  }

  if (error === 'UNAUTHORIZED' || error === 'CLOUDFLARE') {
    return (
      <ResponseText>
        Please login and pass Cloudflare check at{' '}
        <a href='https://chat.openai.com' target='_blank' rel='noreferrer'>
          chat.openai.com
        </a>
      </ResponseText>
    );
  }
  if (error == 'EXCEPTION') {
    return (
      <ResponseText>
        Failed to load response from ChatGPTFailed to load response from
        ChatGPTFailed to load response from ChatGPTFailed to load response from
        ChatGPTFailed to load response from ChatGPTFailed to load response from
        ChatGPT Failed to load response from ChatGPTFailed to load response from
        ChatGPTFailed to load response from ChatGPTFailed to load response from
        ChatGPTFailed to load response from ChatGPTFailed to load response from
        ChatGPT
      </ResponseText>
    );
  }

  if (error) {
    return <ResponseText>{error}</ResponseText>;
  }

  return <Loading>Waiting for ChatGPT response...</Loading>;
};

export default GPTResponse;

const pulseText = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
`;

const Loading = styled.div`
  all: revert;
  color: #b6b8ba !important;
  animation: ${pulseText} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  margin-bottom: 12px !important;
  margin-top: 8px !important;
  white-space: normal !important;
`;

const ResponseText = styled.div`
  all: revert;
  font-weight: normal !important;
  line-height: 1.5 !important;
  text-align: left !important;
  font-size: 14px !important;
  text-decoration: none !important;
  color: #000 !important;
  white-space: normal !important;
`;
