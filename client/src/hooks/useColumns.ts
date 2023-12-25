import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api.client";
import ms from "ms";

const apiClient = new APIClient("/dataset/columns");

const useColumns = (isDistinct?: boolean) =>
  useQuery({
    queryKey: ["columns"],
    queryFn: () => apiClient.getColumns(isDistinct),
    staleTime: ms("1h"),
  });
export default useColumns;
