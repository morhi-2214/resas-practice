import { FC, ReactNode } from "react";

import { styles } from "./DefaultLayout.css";

type Props = {
  children: ReactNode;
};

const DefaultLayout: FC<Props> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1>都道府県別の人口構成</h1>
      </header>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export { DefaultLayout };
