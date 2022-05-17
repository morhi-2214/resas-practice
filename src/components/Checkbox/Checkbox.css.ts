import { style, globalStyle } from "@vanilla-extract/css";

export const styles = {
  wrapper: style({
    display: "flex",
    flexWrap: "wrap",
  }),
  unit: style({
    display: "flex",
    whiteSpace: "nowrap",
    marginRight: "10px",
    cursor: "pointer",
  }),
  input: style({
    cursor: "pointer",
    display: "none",
    ":checked": {},
  }),
  label: style({
    cursor: "pointer",
    boxSizing: "border-box",
    display: "inline-block",
    padding: "5px 30px",
    position: "relative",
    width: "auto",
    ":before": {
      background: "#fff",
      border: "1px solid #231815",
      content: "",
      display: "block",
      height: "16px",
      left: "5px",
      marginTop: "-8px",
      position: "absolute",
      top: "50%",
      width: "16px",
    },
    ":after": {
      borderRight: "3px solid #ed7a9c",
      borderBottom: "3px solid #ed7a9c",
      content: "",
      display: "block",
      height: "9px",
      left: "10px",
      marginTop: "-7px",
      opacity: 0,
      position: "absolute",
      top: "50%",
      transform: "rotate(45deg)",
      width: "5px",
    },
  }),
};

globalStyle(`${styles.input}:checked + ${styles.label}:after`, {
  opacity: 1,
});
