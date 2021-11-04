import ButtonStyles from "../../../styles/ButtonStyles";
import FormStyles from "../../../styles/FormStyles";

// CATEGORY
export default function Step1({
  currentStep,
  handleChange,
  category,
  increment,
}: any) {
  if (currentStep !== 1) {
    return null;
  }

  return (
    <FormStyles>
      <h3>What type of job would you like to post?</h3>
      <fieldset>
        <div className="radio">
          <input
            checked={category == "cleaning"}
            type="radio"
            id="Cleaning"
            name="category"
            value="Cleaning"
            onChange={handleChange}
          />
          <div className="icon" />
          <label htmlFor="cleaning">Cleaning</label>
        </div>
        <div className="radio">
          <input
            checked={category == "Gardening"}
            type="radio"
            id="Gardening"
            name="category"
            value="Gardening"
            onChange={handleChange}
          />
          <div className="icon" />
          <label htmlFor="cleaning">Gardening</label>
        </div>
        <div className="radio">
          <input
            checked={category == "lawn-mowing"}
            type="radio"
            id="lawn-mowing"
            name="category"
            value="lawn-mowing"
            onChange={handleChange}
          />
          <div className="icon" />
          <label htmlFor="cleaning">Lawn Mowing</label>
        </div>
        <div className="radio">
          <input
            checked={category == "painting"}
            type="radio"
            id="Painting"
            name="category"
            value="Painting"
            onChange={handleChange}
          />
          <div className="icon" />
          <label htmlFor="cleaning">Painting</label>
        </div>
        <ButtonStyles onClick={increment} primary fullWidth>
          next
        </ButtonStyles>
      </fieldset>
    </FormStyles>
  );
}
