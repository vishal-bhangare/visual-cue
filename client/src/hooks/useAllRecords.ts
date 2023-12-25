import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api.client";
import ms from "ms";
import { Filters } from "../components/Records";
const apiClient = new APIClient("/dataset");

const useAllRecords = (key: string, filters?: string[], queries?: Filters) =>
  useQuery({
    queryKey: ["records", key],
    queryFn: () => apiClient.getAllRecords(filters, queries),
    staleTime: ms("1h"),
  });

export default useAllRecords;
