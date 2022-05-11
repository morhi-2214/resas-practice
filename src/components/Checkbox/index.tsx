import { FC } from "react";

import { Prefecture } from "@/pages/Home";

type Props = {
  items: Prefecture[];
};

const Checkbox: FC<Props> = ({ items }) => {
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
              // checked={item.checked}
            />
            <label htmlFor={item.prefName}>{item.prefName}</label>
          </div>
        );
      })}
    </>
  );
};

export { Checkbox };
