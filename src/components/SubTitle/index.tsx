import { FC } from "react";

type Props = {
  title: string;
  disabled?: boolean;
};

const SubTitle: FC<Props> = ({ title, disabled }) => {
  return (
    <>
      <h2>{title}</h2>
    </>
  );
};

export { SubTitle };
