import FilterTasksStyles from "../../styles/FilterTasksStyle";

export default function FilterTasks({
  category,
  setCategory,
  status,
  setStatus,
  myTasks,
  setCurrentPage,
}: any) {
  return (
    <FilterTasksStyles>
      {myTasks ? (
        // Filter by Status for MY TASKS
        <>
          <button disabled={status == ""} onClick={() => setStatus("")}>
            all
          </button>
          <button disabled={status == "open"} onClick={() => setStatus("open")}>
            open
          </button>
          <button
            disabled={status == "assigned"}
            onClick={() => setStatus("assigned")}
          >
            assigned
          </button>
          <button
            disabled={status == "completed"}
            onClick={() => setStatus("completed")}
          >
            completed
          </button>
          <button disabled={status == "paid"} onClick={() => setStatus("paid")}>
            paid
          </button>
        </>
      ) : (
        // Filter by Category for BROWSE TASKS
        <>
          <button
            disabled={category == ""}
            onClick={() => {
              setCurrentPage(1);
              setCategory("");
            }}
          >
            all
          </button>
          <button
            disabled={category == "Cleaning"}
            onClick={() => {
              setCurrentPage(1);
              setCategory("Cleaning");
            }}
          >
            cleaning
          </button>
          <button
            disabled={category == "Gardening"}
            onClick={() => {
              setCurrentPage(1);
              setCategory("Gardening");
            }}
          >
            gardening
          </button>
          <button
            disabled={category == "Painting"}
            onClick={() => {
              setCurrentPage(1);
              setCategory("Painting");
            }}
          >
            painting
          </button>
          <button
            disabled={category == "Lawn Mowing"}
            onClick={() => {
              setCurrentPage(1);
              setCategory("Lawn Mowing");
            }}
          >
            lawn mowing
          </button>
        </>
      )}
    </FilterTasksStyles>
  );
}
