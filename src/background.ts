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
  active = !active;
  const color = active ? 'orange' : 'white';
  console.log(info.selectionText);
  if (tab?.id) {
    chrome.tabs.executeScript(tab.id, {
      code: `document.designMode = "on";
             document.execCommand("HiliteColor", false, "yellow");
             document.designMode = "off";`,
    });
    chrome.scripting
      .executeScript({
        target: { tabId: tab.id },
        func: makeOrange,
        args: [color],
      })
      .then();
  }

  // if (info.menuItemId === 'simplify-gpt') {
  //   // Send a message to the content script
  //   chrome.tabs.sendMessage(tab.id, { type: 'SIMPLIFY_GPT' });
  // }
});
