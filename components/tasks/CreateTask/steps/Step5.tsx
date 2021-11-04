import ButtonStyles from "../../../styles/ButtonStyles";
import FormStyles from "../../../styles/FormStyles";

// LOCATION
export default function Step5({
  currentStep,
  handleChange,
  date,
  increment,
}: any) {
  if (currentStep !== 5) {
    return null;
  }
  return (
    <FormStyles>
      <h3>What date?</h3>
      <fieldset>
        <input type="date" name="date" value={date} onChange={handleChange} />
        <ButtonStyles onClick={increment} primary fullWidth>
          next
        </ButtonStyles>
      </fieldset>
    </FormStyles>
  );
}
