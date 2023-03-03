import { useState } from "react";
import { PrivatePrevidenciaData } from "@/endpoints/index";
import { Box, LineChart, Table } from "@/components/Common";
import styles from "./styles.module.scss";

type graphData = PrivatePrevidenciaData["data"]["attributes"]["graphData"];

interface Props {
  title: string;
  graphData: graphData;
}

export function Chart(props: Props) {
  const { graphData, title } = props;

  const [activeDataType, setActiveDataType] = useState<string>(
    graphData[0].type
  );

  const changeActiveDataType = (type: string) => {
    setActiveDataType(type);
  };

  const activeGraphData =
    graphData.find((data) => data.type === activeDataType) || graphData[0];

  const graphDataset = {
    legendLabel: activeGraphData?.legendLabel,
    data: activeGraphData?.data,
  };
  const graphLabels = activeGraphData?.data.map((data) => data.label);

  const tableRows = activeGraphData?.data.map((data) => [
    data.label,
    `${data.value}%`,
  ]);

  return (
    <Box className={styles["private-pension-chart"]}>
      <h3>{title.toUpperCase()} </h3>
      <header>
        {graphData.map((data) => (
          <button
            key={data.id}
            onClick={() => changeActiveDataType(data.type)}
            aria-pressed={activeDataType === data.type}
          >
            {data.type}
          </button>
        ))}
      </header>

      {activeGraphData?.data && (
        <LineChart
          title={activeGraphData.title}
          datasets={[graphDataset]}
          labels={graphLabels}
        />
      )}

      <p className={styles["private-pension-chart__description"]}>
        {activeGraphData?.description}
      </p>

      {tableRows && activeGraphData && (
        <Table
          className={styles["private-pension-chart__table"]}
          header={activeGraphData.tableHeader.map((data) => data.title)}
          rows={tableRows}
        />
      )}
    </Box>
  );
}
