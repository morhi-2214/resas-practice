import { useMemo, useState, useEffect } from "react";

import { Prefecture } from "@/pages/Home";

const useCheckbox = (initialState: Prefecture[] | undefined) => {
  const _initialState: Prefecture[] | undefined = useMemo(
    () =>
      initialState?.map((item) => ({
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
    () => items?.filter((item) => item.checked).map((item) => item.prefCode),
    [items]
  );

  return {
    items,
    set,
    checkedValue,
  };
};

export { useCheckbox };
