import { type Person } from "..//..//..//data/table";
import { ActionIcon, Badge, Button, Checkbox, Popover, Text } from "rizzui";
import { createColumnHelper } from "@tanstack/react-table";
import {
  EllipsisHorizontalIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const columnHelper = createColumnHelper<Person>();

export const defaultColumns = [
  columnHelper.accessor("id", {
    size: 50,
    cell: ({ row }) => <span>{row.index + 1}</span>, 
  }),

  columnHelper.accessor("projectTitle", {
    size: 280,
    header: "Title",
    }),

  columnHelper.accessor("dueDate", {
    size: 180,
    header: "Due Date",
  }),

  columnHelper.accessor("amount", {
    size: 120,
    header: "Amount",
    cell: ({ row }) => <span className="font-medium">$ {row.original.amount}</span>,
  }),

  columnHelper.accessor("status", {
    size: 120,
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue(); // Get the status value
      let badgeColor;

      // Define colors for different statuses
      switch (status) {
        case "Done":
          badgeColor = "success";
          break;
        case "In Progress":
          badgeColor = "warning";
          break;
        case "Delayed":
          badgeColor = "danger";
          break;
        case "Initial":
          badgeColor = "info";
          break;
        default:
          badgeColor = "primary";
      }

      return <Badge color={badgeColor}>{status}</Badge>;
    },
  }),

  columnHelper.accessor("projectTitle", {
    size: 120,
    header: "",
    cell: () => (
      <div className="w-full flex justify-center">
        <Popover
          shadow="sm"
          placement="bottom-end"
        >
          <Popover.Trigger>
            <ActionIcon variant="text">
              <EllipsisHorizontalIcon
                strokeWidth={2}
                className="size-5"
              />
            </ActionIcon>
          </Popover.Trigger>
          <Popover.Content className="max-w-40 grid grid-cols-1 gap-1 p-1">
            <Button
              variant="text"
              className="hover:bg-gray-100 gap-2"
            >
              <PencilIcon className="size-4" /> Edit
            </Button>
            <Button
              variant="text"
              className="hover:bg-gray-100 gap-2"
            >
              <EyeIcon className="size-4" /> View
            </Button>
            <Button
              variant="text"
              color="danger"
              className="hover:bg-gray-100 gap-2"
            >
              <TrashIcon className="size-4" /> Delete
            </Button>
          </Popover.Content>
        </Popover>
      </div>
    ),
  }),
];
