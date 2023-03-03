import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import styles from "./styles.module.scss";

interface SearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export function SearchInput(props: SearchInputProps) {
  return (
    <div className={styles["search-input-container"]}>
      <input {...props} />
      <AiOutlineSearch />
    </div>
  );
}
