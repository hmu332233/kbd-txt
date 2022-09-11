# kbd-txt

mac/window 단축키 표기를 쉽게 할 수 있는 가벼운 라이브러리  
mac/window 여부를 판단해서 맞는 Keyboard Shortcut Text로 변환해준다.

## Installation

```bash
npm install --save kbd-txt
yarn add kbd-txt
```

## Quick Usage

```js
import { convert } from 'kbd-txt';

const shortcutText = 'Ctrl+S';

// Basic Usage
convert(shortcutText);
// Results
//   mac: Command+K
//   window: Ctrl+K

// Symbol Usage
const options = { normalizeOptions: { useSymbol: true } };
convert(shortcutText, options);
// Results
//   mac: ⌘+K
//   window: Ctrl+K
```

## 동작 컨셉

```
단축키 str --(parse)--> Token(KeyboardEvent.key) --(normalize)--> OS에 맞는 단축키 표기

parse: 단축키를 받아 Token 형태로 변환
normalize: Token을 옵션에 따라 병합하여 표기
```

## Roadmaps

- [ ] CDN version
- [ ] OS 버전을 고정으로 볼 수 있는 기능 (Mac 버전으로만 보기, Window 버전으로만 보기)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

Distributed under the MIT License. See `LICENSE` for more information.
