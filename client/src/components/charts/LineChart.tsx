import { Text } from "@chakra-ui/react";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect } from "react";
import { Line } from "react-chartjs-2";
import useAllRecords from "../../hooks/useAllRecords";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const options = {
  responsive: true,
  scales: {
    x: {
      title: {
        display: true,
        text: "Years",
      },
    },
    y: {
      title: {
        display: true,
        text: "Intensity",
      },
    },
  },
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      text: "Topic and their Intensity per year",
    },
  },
};
const LineChart = ({ topic }: { topic: string }) => {
  const { data, refetch } = useAllRecords(
    "linechart",
    ["intensity", "start_year"],
    {
      topic: topic,
    }
  );
  const years = [
    ...new Set(
      data?.records?.map((item: { start_year: any }) => item.start_year)
    ),
  ];
  const yearIntensityMap: any = {};
  let max = -Infinity;
  const len = years.length;
  data?.records?.forEach(
    (record: { intensity: number; start_year: number }) => {
      const { intensity, start_year } = record;
      if (!yearIntensityMap[start_year]) {
        yearIntensityMap[start_year] = intensity / len;
      } else yearIntensityMap[start_year] += intensity / len;
      if (intensity > max) max = intensity;
    }
  );

  const labels = Object.keys(yearIntensityMap);
  const chartData = {
    labels,
    datasets: [
      {
        label: topic,
        data: yearIntensityMap,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  useEffect(() => {
    refetch();
  }, [data, topic]);
  return (
    <>
      {labels.length > 1 ? (
        <Line options={options} data={chartData} />
      ) : (
        <Text>Insufficient data</Text>
      )}
    </>
  );
};

export default LineChart;
