# SimplifyAI V1

![SimplifyAI V1](/v1.gif)

#### V1 still in development

- [x] Chrome extension skeleton with Typescript
- [x] Figure out Webpack and communication with content.ts and background.ts
- [x] Add extension to context menu
- [x] Only appear when selected text right click, on click get the contents of selection
- [x] Wrap with a span? to highlight the individual word
- [x] Connect to ChatGPT
  - [x] Add trigger to background.ts from content.ts
  - [x] Find a way to bypass the Cloudflare & Login
  - [x] Return data to log
- [x] A box pops up which will display the output from gpt
- [x] Style GPT text
- [x] On click, click outside box disappears
- Bug fixes for v1
  - [x] Selecting already selected text
  - Selecting across html elements. Selecting across different styles as you can see above destroys the formatting. Need to figure out how to maintain
    - [ ] styling
    - [ ] structure
  - [ ] Add !important to styles and don’t assume any default styled or box text will take parent page styles
  - [ ] Overflow hidden parent component hiding the gpt
  - [ ] Z index box under other stuff
  - [ ] No wrap text

### To install

1. Install dist folder (clone repo)
2. Go to extensions in Google. Enable developer mode in the top right, and click load unpacked in top left. Upload the dist folder

### To develop

1. Clone repo
2. npm install (for dependencies)
3. npm run build (to generate extension file)
4. Go to extensions in Google. Enable developer mode in the top right, and click load unpacked in top left. Upload the /dist folder that was generated when npm run build was run.

#### Future

- [ ] Basic prompt injection options with future expansion. Add popup.js on click of extension to app.
      [simplify-ai-chrome-extension/prompts.ts at main · SilenNaihin/simplify-ai-chrome-extension](https://github.com/SilenNaihin/simplify-ai-chrome-extension/blob/main/src/prompts.ts)
  - Defining complexity
    1. What is are complicated words? What is jargon?
    2. What is an acceptable elaboration?
    3. How can I get it to give an accurate definition with the context of where the word is?
    - Can their be tiers or levels of complexity?
      1. scientist, novice, baby
  - Plugins
    1. danny devito, the rock
    2. modifiers like minJargon, concise
  - ‘try again’ to get a new answer (too complicated, didn’t answer the question, rephrase)
- [ ] Talk to ChatGPT in small window to continue conversation
- [ ] Work for PDFs

  - Build separate PDF display tab on click when on a .pdf in Google where I can use the extension to modify pdf

    [https://github.com/SilenNaihin/simplify-ai-chrome-extension/blob/main/other/pdf.js](https://github.com/SilenNaihin/simplify-ai-chrome-extension/blob/main/other/pdf.js)

- [ ] On click also run 1 pass to read the text on the pdf (I’m not sure how much chatgpt could handle?) to find all complex words and highlight them. Then if highlight is clicked it gives a simplification (first just print it console, add ui after)
  1. If ChatGPT doesn’t know or there is a ‘I am a LLM trained by…’ error, highlight it anyways.
     1. For error words, add func to search Google or use other LLM
- [ ] Db storage. Ex: If jargon is liked, add it to the list of jargon with whatever tier level of complexity they are a part of to save processing across users. Then just insert definition and ask to fit to paragraph around it?
- [ ] Generate flashcard from word/concept
