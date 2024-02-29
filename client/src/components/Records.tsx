import {
  Box,
  Button,
  Center,
  Divider,
  HStack,
  Heading,
  Icon,
  Input,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Select,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import Record from "../entities/record";
import useColumns from "../hooks/useColumns";
import useRecords from "../hooks/useRecords";

export interface Filters {
  country?: string;
  region?: string;
  topic?: string;
  sector?: string;
  pestle?: string;
  source?: string;
}

const Records = () => {
  const { data: columnsData, isLoading: loadingFilters } = useColumns(true);
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    country: "",
    region: "",
    topic: "",
    sector: "",
    pestle: "",
    source: "",
  });

  const { data, isLoading, isFetching, refetch } = useRecords(
    page,
    sortBy,
    !sortOrder ? "desc" : "asc",
    filters
  );
  useEffect(() => {}, [data, page, sortBy]);
  return (
    <Box w="100%" h="100%" overflow={"hidden"} >
      <Box w="100%" h="100%"  overflowY={'auto'} p={4}>
      <Center>
        <Heading h={"64px"}>Records</Heading>
      </Center>
      <Box overflow={"hidden"}>
        <HStack w="100%">
          <Input type="text" placeholder="Search" />
          <Button>Search</Button>
          <Divider orientation="vertical" />
          <Select
            w={"40%"}
            placeholder="Sort By"
            onChange={(e) => {
              setSortBy(() => e.target.value);
              refetch();
            }}
          >
            {columnsData?.columns?.map((column: string, i: number) => (
              <option key={i}>{column}</option>
            ))}
          </Select>
          <Button
            onClick={() => {
              setSortOrder(!sortOrder);
              refetch();
            }}
          >
            {sortOrder ? "desc" : "asc"}
          </Button>
        </HStack>
        <TableContainer overflow={"auto"} p={5}>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>sr.no</Th>
                <Th>Title</Th>
                <Th>Topic</Th>
                <Th>Pestle</Th>
                <Th>Source</Th>
                <Th>Region</Th>
                <Th>Country</Th>
                <Th>Start year</Th>
                <Th>End Year</Th>
                <Th>Added</Th>
                <Th>Published</Th>
                <Th>Intensity</Th>
                <Th>Likelihood</Th>
                {/* {Object.keys(records[0]).map(
                      (key: any, i: React.Key | null | undefined) => (
                        <Th key={i}>{key}</Th>
                      )
                    )} */}
              </Tr>
            </Thead>
            <Tbody>
              {!isLoading &&
                !isFetching &&
                data?.records?.map((record: Record, i: number) => (
                  <Tr key={i}>
                    <Td>{page * 10 + (i + 1)}</Td>
                    <Td>
                      <Link href={record.url}>
                        {record.title.length > 50
                          ? record.title.slice(0, 47) + "..."
                          : record.title}
                      </Link>
                      {}
                    </Td>
                    <Td>{record.topic}</Td>
                    <Td>{record.pestle}</Td>
                    <Td>{record.source}</Td>
                    <Td>{record.region}</Td>
                    <Td>{record.country}</Td>
                    <Td>{record.start_year}</Td>
                    <Td>{record.end_year}</Td>
                    <Td>{record.added?.toString()}</Td>
                    <Td>{record?.published?.toString()}</Td>
                    <Td>{record.intensity}</Td>
                    <Td>{record.likelihood}</Td>
                    {/* {Object.values(record).map((value: any, i) => (
                        <Td key={i}>{value}</Td>
                      ))} */}
                  </Tr>
                ))}
              {isFetching && (
                <Tr>
                  <Td colSpan={11}>
                    <Center>Fetching records...</Center>
                  </Td>
                </Tr>
              )}
              {!data?.records && (
                <Tr>
                  <Td colSpan={11}>
                    <Center>No data found</Center>
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
        {!isLoading && data && (
          <Box
            w={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={2}
            py={2}
          >
            <Button
              size="sm"
              onClick={() => setPage(page - 1)}
              isDisabled={page == 0}
            >
              <Icon as={IconArrowLeft} boxSize={6} />
            </Button>
            <Text>
              {page + 1} of {data?.totalPages}
            </Text>
            <Button
              size="sm"
              onClick={() => setPage(page + 1)}
              isDisabled={page == data?.totalPages}
            >
              <Icon as={IconArrowRight} boxSize={6} />
            </Button>
          </Box>
        )}
        <Box position={"absolute"} bottom={0} right={0} m={4}>
          <Popover placement="top-end">
            <PopoverTrigger>
              <Button>Filters</Button>
            </PopoverTrigger>
            <Portal>
              <PopoverContent minW={"150px"} w={"fit-content"} maxW={"200px"}>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Filters : </PopoverHeader>
                <PopoverBody>
                  <Stack align={"start"} mb={4}>
                    {!loadingFilters &&
                      columnsData?.distinctValues?.map(
                        (column: any, i: number) => (
                          <Select
                            key={i}
                            placeholder={column.columnName}
                            name={column.columnName}
                            size="sm"
                            onChange={(e) => {
                              setFilters((filters) => ({
                                ...filters,
                                [column.columnName]: e.target.value,
                              }));
                            }}
                          >
                            {column.values.map(
                              (value: any, i: number) =>
                                value && (
                                  <option
                                    key={i}
                                    selected={Object.values(filters).includes(
                                      value
                                    )}
                                  >
                                    {value}
                                  </option>
                                )
                            )}
                          </Select>
                        )
                      )}
                  </Stack>
                  <PopoverFooter display="flex">
                    <Button
                      size={"sm"}
                      colorScheme="teal"
                      variant="solid"
                      onClick={() => refetch()}
                    >
                      {" "}
                      Apply
                    </Button>{" "}
                    <Button
                      size={"sm"}
                      onClick={() => {
                        setFilters({
                          country: "",
                          region: "",
                          topic: "",
                          sector: "",
                          pestle: "",
                          source: "",
                        });
                        refetch();
                      }}
                    >
                      {" "}
                      Clear
                    </Button>{" "}
                  </PopoverFooter>
                </PopoverBody>
              </PopoverContent>
            </Portal>
          </Popover>
        </Box>
      </Box>
      </Box>
    </Box>
  );
};

export default Records;
