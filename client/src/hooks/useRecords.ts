import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api.client";
import ms from "ms";
import { Filters } from "../components/Records";

const apiClient = new APIClient("/dataset");

const useRecords = (
  page: number,
  sortBy?: string,
  sortOrder?: string,
  filters?: Filters
) =>
  useQuery({
    queryKey: ["records", page],
    queryFn: () => apiClient.getRecords(page, sortBy, sortOrder, filters),
    staleTime: ms("1h"),
  });
export default useRecords;
