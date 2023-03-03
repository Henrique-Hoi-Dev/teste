import styles from "./styles.module.scss";

interface Props {
  suitability: number;
  mobile: boolean;
  children: React.ReactNode;
}

const suitabilityBorderColor = {
  0: "none",
  1: "#717171",
  2: "#0044bb",
  3: "#f08202",
};

export const FundRiskIndicator = ({ suitability, mobile, children }: Props) => {
  const getSuitabilityBorderColor = () => {
    const borderColor = suitabilityBorderColor[suitability] || "none";

    return borderColor;
  };

  return mobile ? (
    <th
      className={styles["funds-table-row__row2__title"]}
      style={{
        borderLeft: `3px solid ${getSuitabilityBorderColor()}`,
      }}
    >
      {children}
    </th>
  ) : (
    <th
      className={styles["funds-table-row__row2__title"]}
      style={{
        borderLeft: `3px solid ${getSuitabilityBorderColor()}`,
      }}
    >
      {children}
    </th>
  );
};
