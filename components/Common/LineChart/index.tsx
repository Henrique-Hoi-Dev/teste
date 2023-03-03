import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  defaults,
} from "chart.js";
import { Line } from "react-chartjs-2";
import styles from "./styles.module.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const { font } = defaults;
font.family = "Spoqa Han Sans Neo, Inter, sans-serif";
font.size = 12;
font.weight = "400";
font.style = "normal";

interface Props {
  title: string;
  labels: Array<string>;
  datasets: Array<dataset>;
}

interface dataset {
  legendLabel: string;
  data: Array<{
    label: string;
    value: number;
  }>;
  borderColor?: string;
  backgroundColor?: string;
}

export function LineChart(props: Props) {
  const { datasets, title, labels } = props;

  const datasetsFormated = datasets.map((dataset) => {
    return {
      label: dataset.legendLabel,
      data: dataset.data.map((data) => data.value),
      borderColor: dataset.borderColor || "#063B72",
      backgroundColor: dataset.backgroundColor || "#063B72",
      fill: true,
    };
  });

  const options: ChartOptions<"line"> = {
    plugins: {
      legend: {
        position: "top" as const,
        align: "end",
      },
      title: {
        display: true,
        text: title,
        align: "start",
        color: "#000000",
        font: {
          size: 16,
          family: "Spoqa Han Sans Neo, Inter, sans-serif",
          weight: "400",
          style: "normal",
        },
      },
    },
    maintainAspectRatio: false,
    layout: {
      padding: 0,
    },
    borderColor: "#84888B",
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  const data: ChartData<"line"> = {
    labels,
    datasets: datasetsFormated,
  };

  return (
    <div className={styles["line-chart-container"]}>
      <Line data={data} options={options} />
    </div>
  );
}
