import { Text } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from "chart.js/auto";
import { useEffect } from "react";
import { Radar } from "react-chartjs-2";
import useAllRecords from "../../hooks/useAllRecords";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);
const options = {
  responsive: true,

  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Frequencies of Pestles as per Region",
    },
  },
};
const DoughnutChart = ({ region }: { region: string }) => {
  const { data, refetch, isLoading } = useAllRecords(
    "doughnutchart",
    ["pestle"],
    {
      region: region,
    }
  );
  var regionPestleMap: { [key: string]: number } = {};

  data?.records?.forEach((record: { pestle: string }) => {
    const { pestle } = record;
    if (pestle)
      if (!regionPestleMap[pestle]) {
        regionPestleMap[pestle] = 1;
      } else regionPestleMap[pestle] += 1;
  });
  const chartData = {
    labels: Object.keys(regionPestleMap),
    datasets: [
      {
        label: "# of frequencies",
        data: Object.values(regionPestleMap),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    refetch();
  }, [region]);
  return (
    <>
      {Object.keys(regionPestleMap).length > 2 ? (
        <Radar options={options} data={chartData} />
      ) : (
        <Text>Insufficient data</Text>
      )}
    </>
  );
};

export default DoughnutChart;
