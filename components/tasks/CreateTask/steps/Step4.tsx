import ButtonStyles from "../../../styles/ButtonStyles";
import FormStyles from "../../../styles/FormStyles";

// LOCATION
export default function Step4({
  currentStep,
  handleChange,
  budget,
  increment,
}: any) {
  if (currentStep !== 4) {
    return null;
  }
  return (
    <FormStyles>
      <h3>What is your budget?</h3>
      <fieldset>
        <input
          type="number"
          name="budget"
          placeholder="0"
          value={budget}
          onChange={handleChange}
        />
        <ButtonStyles onClick={increment} primary fullWidth>
          next
        </ButtonStyles>
      </fieldset>
    </FormStyles>
  );
}
