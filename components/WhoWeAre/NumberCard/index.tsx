import React, { useEffect, useRef } from "react";
import { AnimatePresence, animate, motion } from "framer-motion";
import styles from "./styles.module.scss";

interface NumberCardProps {
  backgroundColor: string;
  number: string;
  description: string;
  numberLabel?: string;
  numberColor?: string;
  descriptionColor?: string;
}

interface CounterProps {
  from: number;
  to: number;
  customColor: ICustomColor | {};
}

interface ICustomColor {
  style: {
    color: string;
  };
}

const Counter = ({ from, to, customColor }: CounterProps) => {
  const ref = useRef() as any;

  useEffect(() => {
    const controls = animate(from, to, {
      duration: 1,

      onUpdate(value) {
        ref.current.textContent = value.toFixed(0);
      }
    });
    return () => controls.stop();
  }, [from, to]);

  return <motion.h1 ref={ref} {...customColor} />;
};

export default function NumbersCards({
  number,
  numberLabel,
  numberColor,
  description,
  backgroundColor,
  descriptionColor
}: NumberCardProps) {
  function styleWrapper(color: string) {
    if (!color) return {};

    return {
      style: {
        color
      }
    };
  }

  const numberColorStyle = styleWrapper(numberColor!);
  const descriptionColorStyle = styleWrapper(descriptionColor!);

  const filteredNumber = parseInt(number.replace(/\D/g, ""));
  const filteredNumberChar = number.replace(/\d+/g, "");

  return (
    <section className={styles["number-card"]} style={{ backgroundColor }}>
      <div className={styles["number-card__top-container"]}>
        <h1 {...numberColorStyle}>{filteredNumberChar}</h1>
        <Counter from={0} to={filteredNumber} customColor={numberColorStyle} />
        {numberLabel && <label {...numberColorStyle}>{numberLabel}</label>}
      </div>
      <div className={styles["number-card__bottom-container"]}>
        <p {...descriptionColorStyle}>{description}</p>
      </div>
    </section>
  );
}
