import { isIOS, toUpperFirst } from './utils';

/**
 *  Same meaning as KeyboardEvent.key
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
    Shift: 'Shift',
  },
  macSymbol: {
    Meta: '⌘',
    Alt: '⌥',
    Control: '^',
    Shift: '⇧',
    CapsLock: '⇪',
  },
  window: {
    Alt: 'Alt',
    Control: 'Ctrl',
    Shift: 'Shift',
  },
  windowSymbol: {
    Alt: 'Alt',
    Control: 'Ctrl',
    Shift: 'Shift',
  },
};

const KEY_MAP = {
  Meta: ['command', 'cmd', '⌘'],
  Alt: ['alt', 'option', '⌥'],
  Control: ['control', 'ctrl', '^'],
  Shift: ['shift'],
};

type KeysType = keyof typeof KEY_MAP;

type InvertedKeyMapType = {
  [key: string]: string;
};
const INVERTED_KEY_MAP: InvertedKeyMapType = Object.keys(KEY_MAP).reduce(
  (ret, key) => {
    const values = KEY_MAP[key as KeysType];
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
 * Convert shortcut text depending on the type of OS (window/linux/mac).
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
 * Parse the shortcut text and convert to Token(KeyboardEvent.key) format.
 * $mod is converted to Meta/Control depending on the type of OS.
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
      return INVERTED_KEY_MAP[key] || key;
    });
}

/**
 * Merge Token[] to text according to the option.
 *
 * @param tokens Token[]
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
