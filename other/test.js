import logo from './logo.svg';
import './App.css';

import { getDocument, Annotation } from 'pdf.js';
import { getAnnotations } from 'pdf.js-extract';

// Load the PDF file and extract the text and annotations from it
async function loadPDF(url) {
  const doc = await getDocument(url);
  const annotations = await getAnnotations(doc);
  const text = await doc.getTextContent();
  return { annotations, text };
}

// Create the highlights and overlay them on top of the PDF
function createHighlights(annotations, text, keyword) {
  // Your code to create the highlights goes here
}

// Function to highlight a specific word or phrase in the PDF
function highlightText(keyword) {
  // Load the PDF file and extract the text and annotations from it
  const url = window.location.href;
  loadPDF(url).then((data) => {
    // Create the highlights and overlay them on top of the PDF
    createHighlights(data.annotations, data.text, keyword);
  });
}

// Listen for messages from the background script
chrome.extension.onMessage.addListener((message) => {
  if (message.highlight) {
    // Highlight the specified word or phrase in the PDF
    highlightText(message.highlight);
  }
});

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
