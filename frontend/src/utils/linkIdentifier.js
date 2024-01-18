export const linkIdentifier = (text) => {
  // Regular expression to identify URLs
  const urlRegex =
    /(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?([^\s]*)/g;

  // Split the text into words
  const words = text.split(' ');

  // Process each word
  const processedWords = words.map((word) => {
    // Check if the word matches the URL pattern
    const isLink = word.match(urlRegex);

    // If it's a link, wrap it in an <a> tag, otherwise leave it unchanged
    return isLink ? `<a href="${isLink[0]}" target="_blank">${word}</a>` : word;
  });

  // Join the processed words back into a string
  const result = processedWords.join(' ');

  return result;
};