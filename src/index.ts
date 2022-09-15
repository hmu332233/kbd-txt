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

const TOKEN_NAME = {
  META: 'Meta',
  ALT: 'Alt',
  CONTROL: 'Control',
  SHIFT: 'Shift',
  CAPSLOCK: 'CapsLock',
} as const;

const TOKEN_MAP = {
  [TOKEN_NAME.META]: ['command', 'cmd', '⌘'],
  [TOKEN_NAME.ALT]: ['alt', 'option', '⌥'],
  [TOKEN_NAME.CONTROL]: ['control', 'ctrl', '^'],
  [TOKEN_NAME.SHIFT]: ['shift', '⇧'],
};

type TokenDisplayMapType = {
  [key: string]: {
    [key: string]: string;
  };
};

const TOKEN_DISPLAY_MAP: TokenDisplayMapType = {
  mac: {
    [TOKEN_NAME.META]: 'Command',
    [TOKEN_NAME.ALT]: 'Option',
    [TOKEN_NAME.CONTROL]: 'Control',
    [TOKEN_NAME.SHIFT]: 'Shift',
  },
  macSymbol: {
    [TOKEN_NAME.META]: '⌘',
    [TOKEN_NAME.ALT]: '⌥',
    [TOKEN_NAME.CONTROL]: '^',
    [TOKEN_NAME.SHIFT]: '⇧',
    [TOKEN_NAME.CAPSLOCK]: '⇪',
  },
  window: {
    [TOKEN_NAME.ALT]: 'Alt',
    [TOKEN_NAME.CONTROL]: 'Ctrl',
    [TOKEN_NAME.SHIFT]: 'Shift',
  },
  windowSymbol: {
    [TOKEN_NAME.ALT]: 'Alt',
    [TOKEN_NAME.CONTROL]: 'Ctrl',
    [TOKEN_NAME.SHIFT]: 'Shift',
  },
};

type TokenNames = keyof typeof TOKEN_MAP;

type TokenSynonymMapType = {
  [key: string]: string;
};
const TOKEN_SYNONYM_MAP: TokenSynonymMapType = Object.keys(TOKEN_MAP).reduce(
  (ret, key) => {
    const values = TOKEN_MAP[key as TokenNames];
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
 * window, mac 여부를 판단해서 OS에 맞는 keyboard shortcuts 표기로 변환해준다.
 * @param str A Shortcut string.
 * @param parseOptions
 * @param normalizeOptions
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
 * @param str A Shortcut string.
 * @param separator A string that identifies characters to use in separating the string.
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
      return TOKEN_SYNONYM_MAP[key] || key;
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
  const keyDisplayMap = TOKEN_DISPLAY_MAP[`${typeKey}${symbolKey}`];

  return tokens
    .map((v) => keyDisplayMap[v] || v)
    .map((v) => toUpperFirst(v))
    .join(separator);
}
