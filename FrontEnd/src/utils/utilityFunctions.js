export const abbreviateText = (text, maxLength = 25) => {
    if (typeof text !== "string") {
      return text
    }
    if(text.length <= maxLength) {
        return text;
    }
    return text.slice(0, maxLength) + "..."
}

export function getProgress(book) {
  if (!book.total_pages) return 0;
  return Math.round((book.current_page / book.total_pages) * 100);
}

export function capitalizeFirstLetter(str) {
  if (str && str.length > 0) {
    const firstChar = str.charAt(0).toUpperCase();
    const restOfString = str.slice(1);
    return firstChar + restOfString;
  } else {
    return str;
  }
}
