import React from 'react';
import { RadioGroup } from '@headlessui/react';
import { OS_ITEMS, OS_VALUE } from '@site/src/types';

type Props = {
  value: OS_VALUE;
  onChange: () => OS_VALUE;
};
function OsSelect({ value, onChange }: Props): JSX.Element {
  return (
    <RadioGroup value={value} onChange={onChange}>
      <RadioGroup.Label>OS Type</RadioGroup.Label>
      {Object.values(OS_ITEMS).map((item) => (
        <RadioGroup.Option value={item.value}>
          {({ checked }) => (
            <label className="label cursor-pointer">
              <input type="radio" name="os-select" checked={checked} />
              <span className="label-text">{item.text}</span>
            </label>
          )}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
}

export default OsSelect;
