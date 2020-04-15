import merge from "lodash.merge";

interface EscapeOptions {
  quotes: "single" | "double";
}

const generateEscape = (escapeSeq: string, options: EscapeOptions) => {
  // assign proper quotes
  const quotes = options.quotes === "double" ? '"' : "'";

  const opening = `(${quotes}.+)`;
  const closing = `(.*${quotes})`;

  return {
    regex: RegExp(opening + escapeSeq + closing, "g"),
    replace: escapeSeq,
  };
};

const escapeChars = [
  "\\n", // newline
  "\\r", // carriage return
  "\\t", // horizontal tab
  "\\v", // vertical tab
];

const escapeString = (stringToEscape: string, options?: EscapeOptions): string => {
  const escapeStringParams: EscapeOptions = {
    quotes: "double",
  };

  // merge provided options into the defaults
  merge(escapeStringParams, options);

  escapeChars.forEach((esc) => {
    const replacer = generateEscape(esc, escapeStringParams);
    stringToEscape = stringToEscape.replace(replacer.regex, (_, openQuote, closeQuote) => {
      return `${openQuote}${replacer.replace}${closeQuote}`;
    });
  });
  return stringToEscape;
};

export default escapeString;
