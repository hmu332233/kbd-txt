### convert

Convert shortcut text depending on the type of OS (window/linux/mac).

```ts
const options = { normalizeOptions: { useSymbol: true } };
convert('$mod+s', options);
// Results
//   mac: ⌘+S
//   window: Ctrl+S
```

**Options**

```ts
parseOptions: {
  separator?: string; // A string that identifies characters to use in separating the string.
}
normalizeOptions: {
  separator?: string; // A string used to separate one element of the array from the next in the resulting string.
  useSymbol?: boolean; // If true, Display as a symbol.
  os?: 'window' | 'mac' // If set, Display a shortcut text that fits OS.
}
```

### parseToToken

Parse the shortcut text and convert to Token(KeyboardEvent.key) format.  
It's the same form as the `Keyboard Event.key`.  
`$mod` is converted to Meta/Control depending on the type of OS.

```ts
parseToToken('$mod+S');
// Results
//   mac: ['Meta', 's']
//   window: ['Control', 's']
```

**Options**

```ts
separator?: string; // A string that identifies characters to use in separating the string.
```

### normalizeToken

Merge Token[] to text according to the option.

```ts
normalizeToken(['Alt', 's']);
// Results
//   mac: Option+S
//   window: Alt+S
```

**Options**

```ts
separator?: string; // A string used to separate one element of the array from the next in the resulting string.
useSymbol?: boolean; // If true, Display as a symbol.
os?: 'window' | 'mac' // If set, Display a shortcut text that fits OS.
```
