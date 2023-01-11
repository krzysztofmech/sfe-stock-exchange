import React, { useEffect, useState } from "react";
import "./styles/chart.css";
import { SingleDatasetInterface } from "./interfaces/singleDataset";
import { Line } from "react-chartjs-2";
import { Chart as ChartJs, registerables } from "chart.js";
ChartJs.register(...registerables);
interface ChartProps {
  data?: SingleDatasetInterface;
  label: string;
}

export const Chart: React.FC<ChartProps> = ({ data, label }) => {
  const [chartData, setChartData] = useState<any>({ labels: [], datasets: [] });

  useEffect(() => {
    if (data) {
      buildChartData(data, label);
    }
  }, [data]);

  const buildChartData = (data: SingleDatasetInterface, label: string) => {
    const values = getCloseValues(data);
    const labels = getLabels(data);
    const builtChartData = {
      labels,
      datasets: [
        {
          label,
          data: values,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
        },
      ],
    };
    setChartData(builtChartData);
  };

  const getCloseValues = (data: SingleDatasetInterface) => {
    const closeColumnIndex = getColumnNameIndex(data);
    const closeValues = data.dataset_data.data.map(
      (item) => item[closeColumnIndex]
    );
    return closeValues;
  };

  const getColumnNameIndex = (data: SingleDatasetInterface) => {
    const columnNames = data.dataset_data.column_names.map((name: string) =>
      name.toLowerCase()
    );
    const closeColumnIndex = columnNames.indexOf("close");
    return closeColumnIndex;
  };

  const getLabels = (data: SingleDatasetInterface) => {
    const labels = data.dataset_data.data.map((item) => item[0]);
    return labels;
  };

  return (
    <>
      <Line data={chartData} />
    </>
  );
};
