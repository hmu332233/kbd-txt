export const OS_ITEMS = {
  auto: {
    text: 'Auto',
    value: '',
  },
  window: {
    text: 'Window',
    value: 'window',
  },
  mac: {
    text: 'Mac',
    value: 'mac',
  },
} as const;

export type OS_KEY = keyof typeof OS_ITEMS;
export type OS_VALUE = typeof OS_ITEMS[OS_KEY]['value'];
