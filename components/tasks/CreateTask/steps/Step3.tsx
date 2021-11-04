import ButtonStyles from "../../../styles/ButtonStyles";
import FormStyles from "../../../styles/FormStyles";

// LOCATION
export default function Step3({
  currentStep,
  handleChange,
  location,
  increment,
}: any) {
  if (currentStep !== 3) {
    return null;
  }
  return (
    <FormStyles>
      <h3>What is the location?</h3>
      <fieldset>
        <input
          type="text"
          name="location"
          placeholder="location"
          value={location}
          onChange={handleChange}
        />
        <ButtonStyles onClick={increment} primary fullWidth>
          next
        </ButtonStyles>
      </fieldset>
    </FormStyles>
  );
}
