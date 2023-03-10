const prompts: any = {
  complexity: {
    child:
      'Explain what this term or phrase is assuming I am a 12 year old. Provide the prerequisites in order for me to understand.',
    default:
      'Explain what this term or phrase is using simple, concise, and understandable language.',
    advanced:
      'Define this term or phrase, assuming I am a scientist in the industry. I can understand most jargon but need to fill in the missing pieces.',
  },
  addOns: {
    minJargon: 'Make sure to minimize jargon.',
    resources: 'Give me 3 links for further exploration and understanding.',
    synonym: 'Give me a related synonym to connect to other contexts.',
  },
  size: {
    simple: 'Max 1 sentence.',
    small: 'Max 3 sentences.',
    medium: 'Max 1 paragraph.',
    large: 'Max 3 paragraphs.',
    unlimited: 'Explain in depth.',
  },
  followUps: {
    tryAgain: {
      tooComplicated:
        'This explanation is too complicated for me to understand. Please explain in a simpler way.',
      provideContext:
        'Your answer was not what I was looking for. Please try again with this provided context: ',
      rephrase:
        'Can you please rephrase? Try not to use phrases or words you used previously unless necessary.',
    },
    elaborate: {
      ties: 'How does this tie in with other concepts in the field?',
    },
  },
};

export default prompts;
