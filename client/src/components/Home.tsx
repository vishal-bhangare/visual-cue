import {
  Box,
  Heading,
  ListItem,
  UnorderedList,
  Text,
  OrderedList,
} from "@chakra-ui/react";

const Home = () => {
  return (
    <Box p={8}>
      <Heading textAlign={"center"} h={"64px"}>
        Visualization dashboard
      </Heading>
      <Box w="100%">
        <Text fontSize={22} fontWeight={700}>
          Panels :
        </Text>
        <UnorderedList spacing={3}>
          <ListItem fontSize={18} fontWeight={600}>
            Records
          </ListItem>
          <OrderedList spacing={2}>
            <ListItem>Display all records</ListItem>
            <ListItem>
              Filter by country, region, topic, sector, pestle, source
            </ListItem>
            <ListItem>
              Sort by all fields ascending and descending order
            </ListItem>
            <ListItem>Search box{"(not implemented functionality)"}</ListItem>
          </OrderedList>
          <ListItem fontSize={18} fontWeight={600}>
            Analysis
          </ListItem>
          <OrderedList spacing={2}>
            <ListItem>Line Chart: Topic and their Intensity per year</ListItem>
            <ListItem>Pie Chart: Pestle and their Likelihood</ListItem>
            <ListItem>
              Doughnut Chart: Frequencies of Pestles as per Region
            </ListItem>
            <ListItem>
              Vertical Bar Graph/Chart: Pestles and their Intensity
            </ListItem>
            <ListItem>
              Horizontal Bar Graph/Chart: Sectors and their Relevance
            </ListItem>
          </OrderedList>
        </UnorderedList>
      </Box>
    </Box>
  );
};

export default Home;
