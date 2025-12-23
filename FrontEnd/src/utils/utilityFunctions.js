// Abbrevia una stringa 
export const abbreviateText = (text, maxLength = 25) => {
    if (typeof text !== "string") {
        console.log("Add a strung")
    }
    if(text.length <= maxLength) {
        return text;
    }
    return text.slice(0, maxLength) + "..."
    // console.log(text)
}

// Rendi maiuscola la prima lettera di una stringa
export function capitalizeFirstLetter(str) {
  // Controlla se la stringa non è vuota
  if (str && str.length > 0) {
    // Prendi il primo carattere e mettilo in maiuscolo
    const firstChar = str.charAt(0).toUpperCase();
    // Prendi il resto della stringa (dal secondo carattere in poi)
    const restOfString = str.slice(1);
    // Unisci i due pezzi
    return firstChar + restOfString;
  } else {
    // Restituisce la stringa originale se è vuota o non valida
    return str;
  }
}
