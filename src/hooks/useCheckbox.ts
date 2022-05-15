import { useMemo, useState, useEffect } from "react";

import { Item } from "@/components/Checkbox";

const useCheckbox = (initialState: Item[]) => {
  const _initialState: Item[] = useMemo(
    () =>
      initialState.map((item) => ({
        ...item,
        checked: item.checked || false,
      })),
    [JSON.stringify(initialState)]
  );

  const [items, set] = useState(_initialState);

  useEffect(() => {
    set(_initialState);
  }, [_initialState]);

  /**
   * チェックしたチェックボックスの都道府県コードを返す
   */
  const checkedValue = useMemo(
    () => items.filter((item) => item.checked).map((item) => item.prefCode),
    [items]
  );

  return {
    items,
    set,
    checkedValue,
  };
};

export { useCheckbox };
