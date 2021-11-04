import ButtonStyles from "../../../styles/ButtonStyles";
import FormStyles from "../../../styles/FormStyles";

export default function Step6({
  currentStep,
  handleChange,
  time,
  increment,
}: any) {
  if (currentStep !== 6) {
    return null;
  }
  return (
    <FormStyles>
      <h3>At what time?</h3>
      <fieldset>
        <input type="time" name="time" value={time} onChange={handleChange} />
        <ButtonStyles onClick={increment} primary fullWidth>
          next
        </ButtonStyles>
      </fieldset>
    </FormStyles>
  );
}
