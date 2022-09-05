'use strict';
const { convert } = require('./dist/index.js');

describe('test', () => {
  test("text2", () => {
    expect(convert('A')).toBe('a');
  });
  test("text2", () => {
    expect(convert('A')).not.toBe('A');
  });
})