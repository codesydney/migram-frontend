import useForm from "../../lib/useForm";

import BodyStyles from "../styles/BodyStyles";
import FormStyles from "../styles/FormStyles";
import ButtonStyles from "../styles/ButtonStyles";
import ProgressStyles from "../styles/ProgressStyles";

export default function CreateTask() {
  const { inputs, handleChange, resetForm, clearForm }: any = useForm({
    title: "Title",
    budget: 0,
    description: "",
  });

  return (
    <BodyStyles alternate>
      <div className="primary">
        <h2>Post a job</h2>
        <p>Question 1 of 7</p>
      </div>
      <div className="secondary">
        <h3>What type of job would you like to post?</h3>
        <FormStyles>
          <fieldset>
            <div className="radio">
              <input
                type="radio"
                id="cleaning"
                name="category"
                value="cleaning"
              />
              <div className="icon" />
              <label htmlFor="cleaning">Cleaning</label>
            </div>
            <div className="radio">
              <input
                type="radio"
                id="gardening"
                name="category"
                value="gardening"
              />
              <div className="icon" />
              <label htmlFor="cleaning">Gardening</label>
            </div>
            <div className="radio">
              <input
                type="radio"
                id="lawn-mowing"
                name="category"
                value="lawn-mowing"
              />
              <div className="icon" />
              <label htmlFor="cleaning">Lawn Mowing</label>
            </div>
            <div className="radio">
              <input
                type="radio"
                id="painting"
                name="category"
                value="painting"
              />
              <div className="icon" />
              <label htmlFor="cleaning">Painting</label>
            </div>
            <ButtonStyles primary fullWidth>
              next
            </ButtonStyles>
          </fieldset>
        </FormStyles>
        <label htmlFor="form-progress">% completed</label>
        <ProgressStyles id="form-progress" max="7" value="1"></ProgressStyles>
      </div>
    </BodyStyles>
  );
}

{
  /* <FormStyles>
          <label htmlFor="title">
            Title
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              value={inputs.title}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="budget">
            Budget
            <input
              type="number"
              id="budget"
              name="budget"
              placeholder="Budget"
              value={inputs.budget}
              onChange={handleChange}
            />
          </label>
          <button type="button" onClick={clearForm}>
            Clear Form
          </button>
          <button type="button" onClick={resetForm}>
            Reset Form
          </button>
        </FormStyles> */
}
