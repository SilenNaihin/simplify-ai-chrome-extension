chrome.contextMenus.create({
  id: 'simplify-gpt',
  title: 'SimplifyGPT',
  contexts: ['all'],
});

// Listen for when the user clicks on the context menu item
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'simplify-gpt') {
    // Send a message to the content script
    chrome.tabs.sendMessage(tab.id, { type: 'SIMPLIFY_GPT' });
  }
});
