'use strict';
const { convert } = require('./dist/index.js');
const { isIOS } = require('./dist/utils.js');

jest.mock('./dist/utils.js');

describe('convert', () => {
  test('Platform이 Mac일 경우, Mac shortcut 표기법에 맞게 표시된다.', () => {
    isIOS.mockImplementation(() => true);
    expect(convert('$mod')).toBe('Command');
    expect(convert('Shift+K')).toBe('Shift+K');
    expect(convert('$mod+Shift+K')).toBe('Command+Shift+K');
  });
  test('Platform이 Window일 경우, window shortcut 표기법에 맞게 표시된다.', () => {
    isIOS.mockImplementation(() => false);
    expect(convert('$mod')).toBe('Ctrl');
    expect(convert('Shift+K')).toBe('Shift+K');
    expect(convert('$mod+Shift+K')).toBe('Ctrl+Shift+K');
  });
});
