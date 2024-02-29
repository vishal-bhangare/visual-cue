import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import useAllRecords from "../../hooks/useAllRecords";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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
        text: "Pestles",
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
      display: true,
      text: "Pestles and thier Intensity",
    },
  },
};
const VerticalBarChart = () => {
  const { data } = useAllRecords(
    "VerticalBarChart",
    ["pestle", "intensity"],
    {}
  );
  const pestleIntensityMap: { [key: string]: number } = {};

  data?.records?.forEach((record: { pestle: string; intensity: number }) => {
    const { pestle, intensity } = record;
    if (pestle) {
      if (!pestleIntensityMap[pestle]) {
        pestleIntensityMap[pestle] = intensity;
      } else pestleIntensityMap[pestle] += intensity;
    }
  });

  const chartData = {
    labels: Object.keys(pestleIntensityMap),
    datasets: [
      {
        label: "Dataset 1",
        data: Object.values(pestleIntensityMap),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={chartData} />;
};

export default VerticalBarChart;
