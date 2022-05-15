import { FC } from "react";

export type Item = {
  prefName: string;
  prefCode: number;
  checked?: boolean;
};

type Props = {
  items: Item[];
  onChange?: (items: Item[]) => void;
};

const Checkbox: FC<Props> = ({
  items,
  onChange = () => {
    return;
  },
}) => {
  const handleChange = (index: number) => {
    //操作されたチェックボックスの `checked` を反転
    const _items = items.map((item, i) =>
      i === index ? { ...item, checked: !item.checked } : item
    );
    onChange(_items);
  };

  return (
    <>
      {items.map((item, i) => {
        return (
          <div key={i}>
            <input
              id={item.prefName}
              type="checkbox"
              name={item.prefName}
              value={item.prefCode}
              onChange={() => handleChange(i)}
              checked={item.checked}
            />
            <label htmlFor={item.prefName}>{item.prefName}</label>
          </div>
        );
      })}
    </>
  );
};

export { Checkbox };
