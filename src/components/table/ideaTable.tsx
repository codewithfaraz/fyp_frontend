import MainTable from "./table";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { defaultColumns } from "./column";
import TableToolbar from "./toolbar";
import TablePagination from "./pagination";
import { apiClient } from "../../../api/api.config";

type Idea = {
  id: string;
  projectTitle: string;
  amount: string;
  category: string;
  competitiveAnalysis: string;
  problemDescription: string;
  proposedSolution: string;
  marketNeeded: string;
  targetedAudience: string;
};

async function fetchAllIdeasOfUser(username: string): Promise<Idea[]> {
  const response = await apiClient.get(`/profile/get-ideas/${username}`);
  console.log("API Response:", response); // Log the response for debugging
  return response.data.data.data.map((idea: any) => {
    return {
      id: idea._id,
      projectTitle: idea.title,
      amount: idea.funds,
      category: idea.category,
      competitiveAnalysis: idea.competitiveAnalysis,
      problemDescription: idea.problemDescription,
      proposedSolution: idea.proposedSolution,
      marketNeeded: idea.marketNeeded,
      targetedAudience: idea.targetedAudience,
    };
  });
}

export default function IdeaTable({ username }: { username: string }) {
  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["ideas", username],
    queryFn: () => fetchAllIdeasOfUser(username),
  });

  const table = useReactTable({
    data,
    columns: defaultColumns,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 5,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) return <div>Loading ideas...</div>;
  if (error) return <div>Error loading ideas.</div>;

  return (
    <>
      <TableToolbar table={table} />
      <MainTable table={table} />
      <TablePagination table={table} />
    </>
  );
}
