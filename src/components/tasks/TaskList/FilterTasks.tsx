import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

export enum TaskStatus {
  ALL = "",
  OPEN = "open",
  ASSIGNED = "assigned",
  COMPLETED = "completed",
  PAID = "paid",
}

export enum TaskCategory {
  ALL = "",
  CLEANING = "Cleaning",
  GARDENING = "Gardening",
  PAINTING = "Painting",
  LAWN_MOWING = "Lawn mowing",
}

const FilterTasksStyles = styled.div`
  height: 100px;
  margin-left: var(--side);
  display: flex;
  align-items: center;
  gap: 24px;
  button {
    font-size: 16px;
    height: 24px;
    border: none;
    border-radius: var(--border-radius);
  }
  button:disabled,
  button[disabled] {
    background-color: var(--black);
    color: var(--white);
  }
`;

interface FilterTasksProps {
  setCurrentPage: Dispatch<SetStateAction<number>>;
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
  filterItems: string[];
}

export function FilterTasks({
  setCurrentPage,
  filter,
  setFilter,
  filterItems,
}: FilterTasksProps) {
  return (
    <FilterTasksStyles>
      {filterItems.map((filterItem: any) => (
        <button
          key={filterItem}
          disabled={filter == filterItem}
          onClick={() => {
            setCurrentPage(1);
            setFilter(filterItem);
          }}
        >
          {filterItem ? filterItem : "all"}
        </button>
      ))}
    </FilterTasksStyles>
  );
}
