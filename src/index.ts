import { isIOS, toUpperFirst } from './utils';

/**
 * KeyboardEvent.key와 같은 의미를 나타낸다.
 */
type Token = string;

type ConvertOptions = {
  parseOptions?: ParseOptions;
  normalizeOptions?: NormalizeOptions;
};

type ParseOptions = {
  separator?: string;
};

type NormalizeOptions = {
  useSymbol?: boolean;
  separator?: string;
};

type KeyDisplayMapType = {
  [key: string]: {
    [key: string]: string;
  };
};
const KEY_DISPLAY_MAP: KeyDisplayMapType = {
  mac: {
    Meta: 'Command',
    Alt: 'Option',
    Control: 'Control',
  },
  macSymbol: {
    Meta: '⌘',
    Alt: '⌥',
    Control: '^',
  },
  window: {
    Alt: 'Alt',
    Control: 'Ctrl',
  },
  windowSymbol: {
    Alt: 'Alt',
    Control: 'Ctrl',
  },
};

const KEY_MAP = {
  Meta: ['command', 'cmd', '⌘'],
  Alt: ['alt', 'option', '⌥'],
  Control: ['control', 'ctrl', '^'],
  Shift: ['shift'],
};

type InvertedKeyMapType = {
  [key: string]: string;
};
const INVERTED_KEY_MAP: InvertedKeyMapType = Object.entries(KEY_MAP).reduce(
  (ret, entry) => {
    const [key, values] = entry;
    const valuesRet = values.reduce((valueRet, value) => {
      return {
        ...valueRet,
        [value]: key,
      };
    }, {});

    return {
      ...ret,
      ...valuesRet,
    };
  },
  {},
);

const DEFAULT_SEPARATOR = '+';

/**
 * convert
 * window, mac 여부를 판단해서 OS에 맞는 keyboard shortcuts 표기로 변환해준다.
 * Ctrl+C -> Cmd+C, ⌘C, Command+C
 * 제공 예정 옵션
 * OS 버전 고정: Mac 버전으로만 보기, Window 버전으로만 보기
 * Mac 아이콘 표기: Command (or Cmd) ⌘, Shift ⇧, Option (or Alt) ⌥, Control (or Ctrl) ⌃, Caps Lock ⇪
 *
 * 구현 방향
 * parse -> token 리턴 -> token을 옵션에 맞춰서 변경 후 join -> 결과 리턴
 */
export function convert(
  str: string,
  { parseOptions, normalizeOptions }: ConvertOptions = {},
) {
  const tokens = parseToToken(str, parseOptions);
  return normalizeToken(tokens, normalizeOptions);
}

/**
 * shortcut string을 파싱하여, Token으로 변환한다.
 * KeyboardEvent.key와 같은 형태이며,
 * $mod는 OS에 타입에 따라 Meta/Control로 변환된다.
 *
 * @param str A Shortcut string
 * @param separator A string that identifies characters to use in separating the string
 * @returns Token[]
 */
export function parseToToken(
  str: string,
  { separator = DEFAULT_SEPARATOR }: ParseOptions = {},
): Token[] {
  const mod = isIOS() ? 'Meta' : 'Control';
  return str
    .trim()
    .split(separator)
    .map((v) => v.toLowerCase())
    .map((key) => {
      if (key === '$mod') {
        return mod;
      }
      return INVERTED_KEY_MAP[key] || key;
    });
}

/**
 * Token[]을 option에 맞춰서 text로 변환한다.
 *
 * @param tokens parseToToken으로부터 받은 Token[] / string[]와 동일
 * @param separator A string used to separate one element of the array from the next in the resulting string.
 * @param useSymbol If true, Display as a symbol.
 * @returns
 */
export function normalizeToken(
  tokens: Token[],
  { separator = DEFAULT_SEPARATOR, useSymbol }: NormalizeOptions = {},
) {
  const typeKey = isIOS() ? 'mac' : 'window';
  const symbolKey = useSymbol ? 'Symbol' : '';
  const keyDisplayMap = KEY_DISPLAY_MAP[`${typeKey}${symbolKey}`];

  return tokens
    .map((v) => keyDisplayMap[v] || v)
    .map((v) => toUpperFirst(v))
    .join(separator);
}
