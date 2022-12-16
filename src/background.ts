let active = false;

function makeOrange(color: string): void {
  document.body.style.backgroundColor = color;
}

chrome.contextMenus.create({
  id: 'simplify-gpt',
  title: 'SimplifyGPT',
  contexts: ['selection'], // Display the menu item when text is highlighted
});

// Listen for when the user clicks on the context menu item
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'simplify-gpt' && tab?.id) {
    // Send a message to the content script
    chrome.tabs.sendMessage(tab.id, { type: 'SIMPLIFY_GPT', data: info });
  }
});
