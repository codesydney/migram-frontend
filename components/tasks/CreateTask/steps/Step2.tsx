import ButtonStyles from "../../../styles/ButtonStyles";
import FormStyles from "../../../styles/FormStyles";

// BUDGET
export default function Step2({
  currentStep,
  handleChange,
  details,
  increment,
}: any) {
  if (currentStep !== 2) {
    return null;
  }

  const sizes = [
    "Less than 100m²",
    "Between 100m² and 200m²",
    "Between 200m² and 500m²",
    "More than 500m²",
  ];

  return (
    <FormStyles>
      <h3>How big is the job?</h3>
      <fieldset>
        <div className="radio">
          <input
            checked={details == sizes[0]}
            type="radio"
            id={sizes[0]}
            name="details"
            value={sizes[0]}
            onChange={handleChange}
          />
          <label htmlFor={sizes[0]}>{sizes[0]}</label>
        </div>
        <div className="radio">
          <input
            checked={details == sizes[1]}
            type="radio"
            id={sizes[1]}
            name="details"
            value={sizes[1]}
            onChange={handleChange}
          />
          <label htmlFor={sizes[1]}>{sizes[1]}</label>
        </div>
        <div className="radio">
          <input
            checked={details == sizes[2]}
            type="radio"
            id={sizes[2]}
            name="details"
            value={sizes[2]}
            onChange={handleChange}
          />
          <label htmlFor={sizes[2]}>{sizes[2]}</label>
        </div>
        <div className="radio">
          <input
            checked={details == sizes[3]}
            type="radio"
            id={sizes[3]}
            name="details"
            value={sizes[3]}
            onChange={handleChange}
          />
          <label htmlFor={sizes[3]}>{sizes[3]}</label>
        </div>
        <ButtonStyles onClick={increment} primary fullWidth>
          next
        </ButtonStyles>
      </fieldset>
    </FormStyles>
  );
}
