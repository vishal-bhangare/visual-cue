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
  indexAxis: "y" as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  scaleShowValues: true,
  scales: {
    x: {
      ticks: {
        autoSkip: false,
      },
      title: {
        display: true,
        text: "Relevance",
      },
    },
    y: {
      ticks: {
        autoSkip: false,
      },
      title: {
        display: true,
        text: "Sectors",
      },
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right" as const,
    },
    title: {
      display: true,
      text: "Sectors and their Relevance",
    },
  },
};
const HorizontalBarChart = () => {
  const { data } = useAllRecords(
    "HorizontalBarChart",
    ["sector", "relevance"],
    {}
  );
  const sectorRelevanceMap: { [key: string]: number } = {};

  data?.records?.forEach((record: { sector: string; relevance: number }) => {
    const { sector, relevance } = record;
    if (sector) {
      if (!sectorRelevanceMap[sector]) {
        sectorRelevanceMap[sector] = relevance;
      } else sectorRelevanceMap[sector] += relevance;
    }
  });

  const chartData = {
    labels: Object.keys(sectorRelevanceMap),
    datasets: [
      {
        label: "Dataset 1",
        data: Object.values(sectorRelevanceMap),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  console.log(sectorRelevanceMap);
  return <Bar options={options} data={chartData} />;
};

export default HorizontalBarChart;
