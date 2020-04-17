import merge from "lodash.merge";

interface EscapeOptions {
  quotes: "single" | "double";
}

const escapeString = (stringToEscape: string, options?: EscapeOptions): string => {
  const escapeStringParams: EscapeOptions = {
    quotes: "double",
  };

  // merge provided options into the defaults
  merge(escapeStringParams, options);

  let escaped = "";
  let openQuote = false;
  const quotes = escapeStringParams.quotes === "double" ? '"' : "'";
  for (let letter of stringToEscape) {
    if (letter === quotes) openQuote = !openQuote;
    if (openQuote) {
      switch (letter) {
        case "\n":
          letter = "\\n";
          break;
        case "\r":
          letter = "\\r";
          break;
        case "\t":
          letter = "\\t";
          break;
        case "\v":
          letter = "\\v";
          break;
      }
    }
    escaped += letter;
  }

  return escaped;
};

export default escapeString;
