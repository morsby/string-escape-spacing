import escapeString from "./index";

describe("escaping newlines", () => {
  test("escapes newline char in double quotes", () => {
    expect(escapeString(`"hej\ndig"`)).toBe(`"hej\\ndig"`);
  });

  test("escapes newline char in single quotes", () => {
    expect(escapeString(`'hej\ndig'`, { quotes: "single" })).toBe(`'hej\\ndig'`);
  });
});

describe("escaping carriage returns", () => {
  test("escapes carriage return in double quotes", () => {
    expect(escapeString(`"hej\rdig"`)).toBe(`"hej\\rdig"`);
  });

  test("escapes carriage return in single quotes", () => {
    expect(escapeString(`'hej\rdig'`, { quotes: "single" })).toBe(`'hej\\rdig'`);
  });
});

describe("escaping horizontal tabs", () => {
  test("escapes horizontal tabs in double quotes", () => {
    expect(escapeString(`"hej\tdig"`)).toBe(`"hej\\tdig"`);
  });

  test("escapes horizontal tabs in single quotes", () => {
    expect(escapeString(`'hej\tdig'`, { quotes: "single" })).toBe(`'hej\\tdig'`);
  });
});

describe("escaping vertical tabs", () => {
  test("escapes vertical tabs in double quotes", () => {
    expect(escapeString(`"hej\vdig"`)).toBe(`"hej\\vdig"`);
  });

  test("escapes vertical tabs in single quotes", () => {
    expect(escapeString(`'hej\vdig'`, { quotes: "single" })).toBe(`'hej\\vdig'`);
  });
});

describe("conflict checks", () => {
  test("respects single quotes in double quotes", () => {
    expect(escapeString(`"1.\t'Hi!'"`)).toBe(`"1.\\t'Hi!'"`);
  });

  test("respects double quotes in single quotes", () => {
    expect(escapeString(`'1.\t"Hi!''`, { quotes: "single" })).toBe(`'1.\\t"Hi!''`);
  });
});

describe("code examples", () => {
  test("single line code", () => {
    expect(escapeString(`fmt.Printf("%02d\n", 1)`)).toBe(`fmt.Printf("%02d\\n", 1)`);
  });

  test("multiline code", () => {
    const inputMultilineCode = `
    for a:=0; a < 10; a++ {
      fmt.Printf("%02d\n", a)
    }
    `.trim();

    const expectedMultilineCode = `
    for a:=0; a < 10; a++ {
      fmt.Printf("%02d\\n", a)
    }
    `.trim();
    expect(escapeString(inputMultilineCode)).toBe(expectedMultilineCode);
  });

  test("large block with no enclosed spaces", () => {
    const input = `
    <Flex bg="black">
    <Sidebar bg="primary">
      <ul>
        <li>1.\nNewline</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
      </ul>
    </Sidebar>
    <Main bg="secondary">Woop de doop</Main>
  </Flex>`.trim();
    expect(escapeString(input)).toBe(input);
  });

  test("large block WITH enclosed spaces", () => {
    const input = `
    <Flex bg="black">
    <Sidebar bg="primary">
      <ul>
        <li>1. "\nNo newline"</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
      </ul>
    </Sidebar>
    <Main bg="secondary">Woop de doop</Main>
  </Flex>`.trim();

    const expected = `
    <Flex bg="black">
    <Sidebar bg="primary">
      <ul>
        <li>1. "\\nNo newline"</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
      </ul>
    </Sidebar>
    <Main bg="secondary">Woop de doop</Main>
  </Flex>`.trim();
    expect(escapeString(input)).toBe(expected);
  });
});

describe("ignores non-enclosed strings", () => {
  test("newlines", () => {
    expect(escapeString(`Hello\nthere\nfriend`)).toBe(`Hello\nthere\nfriend`);
  });
  test("carriage returns", () => {
    expect(escapeString(`Hello\rthere\rfriend`)).toBe(`Hello\rthere\rfriend`);
  });
  test("tabs", () => {
    expect(escapeString(`Hello\tthere\tfriend`)).toBe(`Hello\tthere\tfriend`);
  });
  test("vertical tabs", () => {
    expect(escapeString(`Hello\vthere\vfriend`)).toBe(`Hello\vthere\vfriend`);
  });
});

describe("surrogate pairs in strings", () => {
  test("emojis", () => {
    expect(escapeString("Hello, 🐒")).toBe("Hello, 🐒");
  });

  test("emojis in quotes", () => {
    expect(escapeString('fmt.Printf("🐒\n")')).toBe('fmt.Printf("🐒\\n")');
  });
});
