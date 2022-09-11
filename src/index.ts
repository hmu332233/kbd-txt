import { isIOS } from './utils';

type Token = string;
type ConvertOptions = {
  splitSeparator?: string;
  joinSeparator?: string;
  useMacSymbol?: boolean;
};

const MAC_KEY_MAP = {};

const WINDOW_SYMBOL_MAP = {};
const MAC_SYMBOL_MAP = {
  Meta: '⌘',
  Alt: '⌥',
  Control: '^',
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
  {
    splitSeparator = DEFAULT_SEPARATOR,
    joinSeparator = DEFAULT_SEPARATOR,
    useMacSymbol,
  }: ConvertOptions = {},
) {
  const tokens = parseToToken(str, splitSeparator);
  return normalizeToken(tokens, joinSeparator);
}

/**
 * shortcut string을 파싱하여, Token으로 변환한다.
 * KeyboardEvent.key와 같은 형태이며,
 * $mod는 OS에 타입에 따라 Meta/Control로 변환된다.
 *
 * @param str A Shortcut string
 * @param separator A string that identifies character or characters to use in separating the string
 * @returns Token[]
 */
export function parseToToken(
  str: string,
  separator: string = DEFAULT_SEPARATOR,
): Token[] {
  const mod = isIOS() ? 'meta' : 'control';
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

function normalizeToken(
  tokens: Token[],
  separator: string = DEFAULT_SEPARATOR,
  useSymbol?: boolean,
) {
  return tokens.join(separator);
}
