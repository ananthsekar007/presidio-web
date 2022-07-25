import { replaceAll } from "./string";

describe("Testing string utils", () => {
  it("Testing replaceAll function", () => {
    expect(replaceAll("ABCABC", "ABC", "BCA")).toBe("BCABCA");
    expect(replaceAll("{ABC} word {ABC}", "{ABC}", "BCA")).toBe("BCA word BCA");
    expect(replaceAll("{ABC} word {ABC}", "word", "BCA")).toBe(
      "{ABC} BCA {ABC}"
    );
  });
  it("Testing replaceAll with special characters", () => {
    expect(replaceAll("ABCABC?/", "?/", "BCA")).toBe("ABCABCBCA");
    expect(replaceAll("*abc*", "*", "BCA")).toBe("BCAabcBCA");
  });
});
