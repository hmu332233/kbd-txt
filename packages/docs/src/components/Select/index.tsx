import React from 'react';
import { RadioGroup } from '@headlessui/react';

type Item = {
  text: string;
  value: any;
};

type Props<T extends Item> = {
  label: string;
  items: Array<T>;
  value: T['value'];
  onChange: (v: T['value']) => void;
};
function Select<T extends Item>({
  label,
  items,
  value,
  onChange,
}: Props<T>): JSX.Element {
  return (
    <RadioGroup value={value} onChange={onChange}>
      <RadioGroup.Label>
        <strong>{label}</strong>
      </RadioGroup.Label>
      {Object.values(items).map((item) => (
        <RadioGroup.Option value={item.value}>
          {({ checked }) => (
            <label className="label cursor-pointer">
              <input type="radio" checked={checked} />
              <span className="label-text">{item.text}</span>
            </label>
          )}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
}

export default Select;
