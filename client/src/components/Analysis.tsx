import { Box, Heading, Select, Text } from "@chakra-ui/react";
import { useState } from "react";
import useColumns from "../hooks/useColumns";
import DoughnutChart from "./charts/DoughnutChart";
import HorizontalBarChart from "./charts/HorizontalBarChart";
import LineChart from "./charts/LineChart";
import PieChart from "./charts/PieChart";
import VerticalBarChart from "./charts/VerticalBarChart";

const Analysis = () => {
  const { data: columnsData, isLoading: loadingFilters } = useColumns(true);

  const [topic, setTopic] = useState("");
  const [region, setRegion] = useState("");
  return (
    <Box w={"100%"} h={"100%"} overflowY={"scroll"} p={6}>
      <Heading height={"64px"} textAlign={"center"}>
        Charts and Graphs
      </Heading>
      <Box display={"flex"} flexWrap={"wrap"} gap={10}>
        <Box
          flex={1}
          flexBasis={"100%"}
          border="1px"
          borderColor={"gray.200"}
          borderRadius={"md"}
          p={2}
        >
          <Text
            w={"100%"}
            textAlign={"center"}
            py={2}
            fontSize={14}
            color="gray.600"
            fontWeight={700}
          >
            Topic and their Intensity per year
          </Text>
          <Select
            w={"fit-content"}
            ml={"auto"}
            onChange={(e) => {
              setTopic(e.target.value);
            }}
          >
            {columnsData?.distinctValues
              ?.find((col: { columnName: string }) => col.columnName == "topic")
              ?.values.map(
                (column: string, i: number) =>
                  column && <option key={i}>{column}</option>
              )}
          </Select>
          <Box h={400}>
            <LineChart topic={topic} />
          </Box>
        </Box>
        <Box
          flex={1}
          flexBasis={{ sm: "100%", md: "45%" }}
          h={400}
          border="1px"
          borderColor={"gray.200"}
          borderRadius={"md"}
          p={2}
        >
          <PieChart />
        </Box>
        <Box
          flex={1}
          flexBasis={{ sm: "100%", md: "45%" }}
          h={400}
          border="1px"
          borderColor={"gray.200"}
          borderRadius={"md"}
          p={2}
        >
          <Select
            w={"fit-content"}
            ml={"auto"}
            onChange={(e) => {
              setRegion(e.target.value);
            }}
          >
            {columnsData?.distinctValues
              ?.find(
                (col: { columnName: string }) => col.columnName == "region"
              )
              ?.values.map(
                (column: string, i: number) =>
                  column && <option key={i}>{column}</option>
              )}
          </Select>
          <DoughnutChart region={region} />
        </Box>
        <Box
          flex={1}
          flexBasis={"100%"}
          h={{ sm: "300px", md: "400px" }}
          border="1px"
          borderColor={"gray.200"}
          borderRadius={"md"}
          p={2}
        >
          <VerticalBarChart />
        </Box>

        <Box
          flex={1}
          flexBasis={"100%"}
          h={{ sm: "350px", md: "400px" }}
          border="1px"
          borderColor={"gray.200"}
          borderRadius={"md"}
          p={2}
        >
          <HorizontalBarChart />
        </Box>
      </Box>
    </Box>
  );
};

export default Analysis;
