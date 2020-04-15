# string-escape-spacing

## Background

A small javascript package for escaping special characters interpreted as spacing in strings.

Imagine you're writing a code snippet in a template string.

```js
const code = `fmt.Printf("%06d\n",1)`;
```

If you then did a `console.log` (or any other outputting), you'd get

```
fmt.Printf("%06d
",1)
```

Hey, that's not what you wanted! 😭

Obviously, you could escape the backslash (`\n` → `\\n`) but that's not how you'd actually write the code.

_Enter **string-escape-spacing**_! It works by looking for unescaped spacing characters (i.e. `\n`, `\r`, `\t`, `\v` ) enclosed in string characters (`"The\tdog\twas\tlazy"`) whilst ignoring the string if it had no quotes around it (`The\tdog\twas\tlazy`).

## Usage

### Installation

```
yarn add string-escape-spacing
npm install string-escape-spacing
```

### Example

```js
import escapeString from "string-escape-spacing";

const string = `"The\tdog\twas\tlazy"`;
console.log(escapeString(string));
// output:`"The\\tdog\\twas\\tlazy"`
```

### API

```js
const escaped = escapeString(stringToEscape, options);
```

**Options**

```js
options = {
  quotes: "single" | "double",
};
```
