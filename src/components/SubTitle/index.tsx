import { FC } from "react";

import { styles } from "@/components/SubTitle/SubTitle.css";

type Props = {
  title: string;
  disabled?: boolean;
};

const SubTitle: FC<Props> = ({ title, disabled }) => {
  return (
    <>
      <h2 className={styles.title}>{title}</h2>
    </>
  );
};

export { SubTitle };
