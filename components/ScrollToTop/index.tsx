import React, { useEffect, useState } from "react";
import { BsArrowUpShort } from "react-icons/bs";
import styles from "./styles.module.scss";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
  }, []);

  return (
    <div
      style={{ display: visible ? "inline" : "none" }}
      className={styles["button"]}
    >
      <BsArrowUpShort onClick={scrollToTop} />
    </div>
  );
};

export default ScrollToTop;
