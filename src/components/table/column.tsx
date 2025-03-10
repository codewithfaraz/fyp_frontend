import { createColumnHelper } from "@tanstack/react-table";
import { ActionIcon, Badge, Button, Modal, Popover, Text } from "rizzui";
import {
  EllipsisHorizontalIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { apiClient } from "../../../api/api.config";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
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

// Function to delete an idea
async function deleteOneIdea(id: string): Promise<void> {
  try {
    const response = await apiClient.delete(`/innovator/delete-idea/${id}`);
    console.log("API Response:", response.data); // Log response correctly
  } catch (error) {
    console.error("Error deleting idea:", error);
    throw error; // Re-throw for error handling
  }
}

// async function fetchOneIdea(id: string): Promise<Idea[]> {
//   const response = await apiClient.get(`/innovator/get-one-idea/${id}`);
//   console.log("API Response:", response); // Log the response for debugging
//   return response.data.data.data.map((idea: any) => {
//     return{idea

//     }
//   });
// }

//   const { data = [], isLoading, error } = useQuery({
//     queryKey: ["idea", id], // Include username in the query key
//     queryFn: () => fetchOneIdea(id), // Pass username to the fetch function
//   });

const columnHelper = createColumnHelper<Idea>();

type BadgeColor =
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "primary"
  | "secondary";

export const defaultColumns = [
  columnHelper.accessor("id", {
    size: 50,
    cell: ({ row }) => <span>{row.index + 1}</span>,
  }),

  columnHelper.accessor("projectTitle", {
    size: 280,
    header: "Title",
  }),

  columnHelper.accessor("category", {
    size: 180,
    header: "Category",
  }),

  columnHelper.accessor("amount", {
    size: 120,
    header: "Amount",
    cell: ({ row }) => (
      <span className="font-medium">$ {row.original.amount}</span>
    ),
  }),

  columnHelper.accessor("avatar", {
    size: 120,
    header: "",
    cell: ({ row }) => {
      const {
        id,
        projectTitle,
        category,
        amount,
        competitiveAnalysis,
        problemDescription,
        proposedSolution,
        marketNeeded,
        targetedAudience,
      } = row.original;
      const navigate = useNavigate();
      const [isEditing, setIsEditing] = useState(false);
      const [isModelOpen, setIsModelOpen] = useState(false);

      const mutation = useMutation({
        mutationFn: (id: string) => deleteOneIdea(id),
        onSuccess: () => {
          console.log("Idea deleted successfully");
          window.location.reload();
        },
        onError: (error) => {
          console.error("Error deleting idea:", error);
        },
      });

      const handleDelete = () => {
        mutation.mutate(id); // Trigger the mutation
      };

      const handleView = () => {
        setIsEditing(false);
        navigate("/view-idea", {
          state: {
            idea: {
              id,
              projectTitle,
              category,
              amount,
              competitiveAnalysis,
              problemDescription,
              proposedSolution,
              marketNeeded,
              targetedAudience,
            },
            isEditing: false,
          },
        });
      };

      const handleEdit = () => {
        setIsEditing(true);
        navigate("/view-idea", {
          state: {
            idea: {
              id,
              projectTitle,
              category,
              amount,
              competitiveAnalysis,
              problemDescription,
              proposedSolution,
              marketNeeded,
              targetedAudience,
            },
            isEditing: true,
          },
        });
      };

      return (
        <div className="w-full flex justify-center">
          <Popover shadow="sm" placement="bottom-end">
            <Popover.Trigger>
              <ActionIcon variant="text">
                <EllipsisHorizontalIcon strokeWidth={2} className="size-5" />
              </ActionIcon>
            </Popover.Trigger>
            <Popover.Content className="max-w-40 grid grid-cols-1 gap-1 p-1">
              <Button
                variant="text"
                className="hover:bg-gray-100 gap-2"
                onClick={handleView}
              >
                <EyeIcon className="size-4" /> View
              </Button>
              <Button
                variant="text"
                className="hover:text-red-600 gap-2"
                onClick={handleDelete}
              >
                <TrashIcon className="size-4" /> Delete
              </Button>

              <Button
                variant="text"
                className="hover:bg-gray-100 gap-2"
                onClick={handleEdit}
              >
                <PencilIcon className="size-4" /> Edit
              </Button>
            </Popover.Content>
          </Popover>
        </div>
      );
    },
  }),
  // columnHelper.accessor("status", {
  //   size: 120,
  //   header: "Status",
  //   cell: ({ getValue }) => {
  //     const status = getValue(); // Get the status value
  //     let badgeColor: BadgeColor; // Explicitly define the type for badgeColor

  //     // Define colors for different statuses
  //     switch (status) {
  //       case "refined":
  //         badgeColor = "success";
  //         break;
  //       case "In Progress":
  //         badgeColor = "warning";
  //         break;
  //       case "Delayed":
  //         badgeColor = "danger";
  //         break;
  //       case "Initial":
  //         badgeColor = "info";
  //         break;
  //       default:
  //         badgeColor = "primary";
  //     }

  //     return <Badge color={badgeColor}>{status}</Badge>;
  //   },
  // }),

  // columnHelper.accessor("projectTitle", {
  //   size: 120,
  //   header: "",
  //   cell: () => (
  //     <div className="w-full flex justify-center">
  //       <Popover
  //         shadow="sm"
  //         placement="bottom-end"
  //       >
  //         <Popover.Trigger>
  //           <ActionIcon variant="text">
  //             <EllipsisHorizontalIcon
  //               strokeWidth={2}
  //               className="size-5"
  //             />
  //           </ActionIcon>
  //         </Popover.Trigger>
  //         <Popover.Content className="max-w-40 grid grid-cols-1 gap-1 p-1">
  //           <Button
  //             variant="text"
  //             className="hover:bg-gray-100 gap-2"
  //           >
  //             <PencilIcon className="size-4" /> Edit
  //           </Button>
  //           <Button
  //             variant="text"
  //             className="hover:bg-gray-100 gap-2"
  //           >
  //             <EyeIcon className="size-4" /> View
  //           </Button>
  //           <Button
  //             variant="text"
  //             color="danger"
  //             className="hover:bg-gray-100 gap-2"
  //           >
  //             <TrashIcon className="size-4" /> Delete
  //           </Button>
  //         </Popover.Content>
  //       </Popover>
  //     </div>
  //   ),
  // }),
];
