import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js/auto";
import { useEffect } from "react";
import { Pie } from "react-chartjs-2";
import useAllRecords from "../../hooks/useAllRecords";
ChartJS.register(ArcElement, Tooltip, Legend);
const options = {
  responsive: true,

  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Pestle and their Likelihood",
    },
  },
};
const PieChart = () => {
  const { data } = useAllRecords("piechart", ["pestle", "likelihood"], {});

  const pestleLikelihoodMap: { [key: string]: number } = {};

  data?.records?.forEach((record: { pestle: string; likelihood: number }) => {
    const { pestle, likelihood } = record;
    if (pestle != "")
      if (!pestleLikelihoodMap[pestle]) {
        pestleLikelihoodMap[pestle] = likelihood;
      } else pestleLikelihoodMap[pestle] += likelihood;
  });
  const total = Object.values(pestleLikelihoodMap).reduce(
    (prev: any, cur: any) => prev + cur,
    0
  );
  for (const [key, value] of Object.entries(pestleLikelihoodMap)) {
    pestleLikelihoodMap[key] = Math.round((value / total) * 100);
  }
  const chartData = {
    labels: Object.keys(pestleLikelihoodMap),
    datasets: [
      {
        label: "% of Likelihood",
        data: Object.values(pestleLikelihoodMap),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(55, 152, 192, 0.2)",
          "rgba(113, 152, 255, 0.2)",
          "rgba(225, 12, 164, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(55, 152, 192,1)",
          "rgba(113, 152, 255, 1)",
          "rgba(225, 12, 164, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {}, [data]);
  return <Pie options={options} data={chartData} />;
};

export default PieChart;
