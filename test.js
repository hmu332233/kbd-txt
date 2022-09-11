'use strict';
const { convert, parseToToken } = require('./dist/index.js');
const { isIOS } = require('./dist/utils.js');

jest.mock('./dist/utils.js');

describe('parseToToken', () => {
  test('platform이 Mac일 경우, $mod가 meta로 변환된다.', () => {
    isIOS.mockImplementation(() => true);
    expect(parseToToken('$mod')).toEqual(['meta']);
  });
  test('platform이 Window일 경우, $mod가 control로 변환된다.', () => {
    isIOS.mockImplementation(() => false);
    expect(parseToToken('$mod')).toEqual(['control']);
  });
  test('Meta를 나타내는 키워드들이 Meta로 변환된다.', () => {
    expect(parseToToken('command+cmd+⌘')).toEqual(['Meta', 'Meta', 'Meta']);
    expect(parseToToken('Command+Cmd+⌘')).toEqual(['Meta', 'Meta', 'Meta']);
    expect(parseToToken('COMMAND+CMD+⌘')).toEqual(['Meta', 'Meta', 'Meta']);
  });
  test('Alt를 나타내는 키워드들이 Alt로 변환된다.', () => {
    expect(parseToToken('alt+option+⌥')).toEqual(['Alt', 'Alt', 'Alt']);
    expect(parseToToken('Alt+Option+⌥')).toEqual(['Alt', 'Alt', 'Alt']);
    expect(parseToToken('ALT+OPTION+⌥')).toEqual(['Alt', 'Alt', 'Alt']);
  });
  test('Control을 나타내는 키워드들이 Control로 변환된다.', () => {
    expect(parseToToken('control+ctrl+^')).toEqual([
      'Control',
      'Control',
      'Control',
    ]);
    expect(parseToToken('Control+Ctrl+^')).toEqual([
      'Control',
      'Control',
      'Control',
    ]);
    expect(parseToToken('CONTROL+CTRL+^')).toEqual([
      'Control',
      'Control',
      'Control',
    ]);
  });
  test('meta, alt, control 외의 키워드들은 소문자로 변환된다.', () => {
    expect(parseToToken('A+B+c+d+!+@+#+1+2+3')).toEqual([
      'a',
      'b',
      'c',
      'd',
      '!',
      '@',
      '#',
      '1',
      '2',
      '3',
    ]);
  });
});

// describe('convert - platform이 Mac일 경우', () => {
//   test('Mac shortcut 표기법에 맞게 표시된다.', () => {
//     isIOS.mockImplementation(() => true);
//     expect(convert('$mod')).toBe('Command');
//     expect(convert('Shift+K')).toBe('Shift+K');
//     expect(convert('$mod+Shift+K')).toBe('Command+Shift+K');
//   });
//   test('splitSeparator가 존재할 경우, 해당 문자열 기준으로 잘라낸다.', () => {
//     isIOS.mockImplementation(() => true);
//     const options = {
//       splitSeparator: '-',
//     };
//     expect(convert('Shift-K', options)).toBe('Shift+K');
//     expect(convert('$mod-Shift-K', options)).toBe('Command+Shift+K');
//   });
//   test('joinSeparator가 존재할 경우, 해당 문자열을 사용해서 병합된다.', () => {
//     isIOS.mockImplementation(() => true);
//     const options = {
//       joinSeparator: '-',
//     };
//     expect(convert('Shift+K', options)).toBe('Shift-K');
//     expect(convert('$mod+Shift+K', options)).toBe('Command-Shift-K');
//   });
// });

// describe('convert - platform이 Window/Server일 경우', () => {
//   test('window shortcut 표기법에 맞게 표시된다.', () => {
//     isIOS.mockImplementation(() => false);
//     expect(convert('$mod')).toBe('Ctrl');
//     expect(convert('Shift+K')).toBe('Shift+K');
//     expect(convert('$mod+Shift+K')).toBe('Ctrl+Shift+K');
//   });
// });
