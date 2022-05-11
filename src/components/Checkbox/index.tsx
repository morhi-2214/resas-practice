import { FC } from "react";

type Props = {
  name?: string;
  items: any;
  disabled?: boolean;
};

const Checkbox: FC<Props> = ({ items, name = "", disabled = false }) => {
  //   console.log(items);
  return (
    <>
      {items.map((item: any, i: any) => {
        return (
          <div key={i}>
            <input
              id={name}
              type="checkbox"
              name={item.prefName}
              value={item.prefName}
              checked={item.checked}
              disabled={disabled}
            />
            <label htmlFor={name}>{item.prefName}</label>
          </div>
        );
      })}
    </>
  );
};

export { Checkbox };
