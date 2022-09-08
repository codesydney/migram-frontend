import FilterTasksStyles from "../styles/FilterTasksStyle";

export default function FilterOffers({ status, setStatus }: any) {
  return (
    <FilterTasksStyles>
      <button disabled={status == ""} onClick={() => setStatus("")}>
        all
      </button>
      <button disabled={status == "open"} onClick={() => setStatus("open")}>
        open
      </button>
      <button
        disabled={status == "accepted"}
        onClick={() => setStatus("accepted")}
      >
        accepted
      </button>
      <button>completed</button>
    </FilterTasksStyles>
  );
}
