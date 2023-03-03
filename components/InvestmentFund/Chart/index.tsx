import { InvestmentFundPageData } from "@/endpoints/index";
import { Box, LineChart, Table } from "@/components/Common";

import styles from "./styles.module.scss";
import { GetScreenType } from "@/utils/hooks/getScreenType";

type Graphic = InvestmentFundPageData["data"]["attributes"]["graphic"];

interface Props {
  title: string;
  graphic: Graphic;
}

export function Chart(props: Props) {
  const { graphic, title } = props;

  const screen = GetScreenType();

  const graphDataset = {
    legendLabel: graphic?.title3,
    data: graphic?.months2,
  };

  const graphDataset2 = {
    legendLabel: graphic?.title2,
    data: graphic?.months,
    backgroundColor: "#F58220",
    borderColor: "#F58220",
  };

  const graphLabels = graphic?.months.map((data) => data.label);

  const tableRows = graphic?.data.map((data) => [
    data.label,
    `${data.value}%`,
    `${data.value2}%`,
    `${data.value3}%`,
  ]);

  return (
    <Box className={styles["private-pension-chart"]}>
      <h3>{title.toUpperCase()} </h3>

      {graphic?.data && (
        <LineChart
          title={graphic.title}
          datasets={[graphDataset2, graphDataset]}
          labels={graphLabels}
        />
      )}

      {screen === "mobile" &&
        tableRows.map((items) => (
          <li
            className={styles["private-pension-chart__table-mobile"]}
            key={items[0]}
          >
            <header> {items[0]} </header>
            <div
              className={styles["private-pension-chart__table-mobile__content"]}
            >
              {items.slice(1, items.length).map((item, index) => (
                <div
                  key={Math.floor(Math.random() * 1000)}
                  className={
                    styles["private-pension-chart__table-mobile__item"]
                  }
                >
                  <strong>{graphic.tableHeader[index + 1].title} </strong>
                  <span> {item} </span>
                </div>
              ))}
            </div>
          </li>
        ))}

      {tableRows && screen !== "mobile" && (
        <Table
          className={styles["private-pension-chart__table"]}
          header={graphic.tableHeader.map((data) => data.title)}
          rows={tableRows}
        />
      )}
    </Box>
  );
}
