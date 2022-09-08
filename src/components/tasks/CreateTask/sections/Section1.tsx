import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faDollarSign } from "@fortawesome/free-solid-svg-icons";

import ErrorMessage from "../../../common/ErrorMessage";
import FormStyles from "../../../styles/FormStyles";

export default function Section1({
  currentStep,
  handleChange,
  details,
  budget,
  errors
}: any) {
  if (currentStep !== 1) {
    return null;
  }

  return (
    <FormStyles>
      <fieldset>
        <h4>What type of job would you like to post?</h4>
        <div className="input-container">
          <select
            name="category"
            id="category" 
            onChange={handleChange} 
            className={errors["category"] && "error"}>
            <option value="Cleaning">cleaning</option>
            <option value="Gardening">gardening</option>
            <option value="Lawn Mowing">lawn mowing</option>
            <option value="Painting">painting</option>
          </select>
          {errors.category && <ErrorMessage message={errors.category}/>}
        </div>
        <h4>Add a brief description</h4>
        <div className="icon-input">
          <div className="icon">
            <FontAwesomeIcon icon={faInfo} color={"grey"} />
          </div>
          <div className="input-container">
            <input
              type="text"
              name="details"
              className={errors["details"] && "error"}
              placeholder="eg. I need housework done"
              value={details}
              onChange={handleChange}
            ></input>
            {errors.details && <ErrorMessage message={errors.details}/>}
          </div>
        </div>
        <h4>What is your budget?</h4>
        <p>this is only an estimate that can be negotiated later</p>
        <div className="icon-input">
          <div className="icon">
            <FontAwesomeIcon icon={faDollarSign} color={"grey"} />
          </div>
          <div className="input-container">
            <input
              type="number"
              name="budget"
              className={errors["budget"] && "error"}
              placeholder="0"
              value={budget}
              onChange={handleChange}
            />
            {errors.budget && <ErrorMessage message={errors.budget}/>}
          </div>
        </div>
      </fieldset>
    </FormStyles>
  );
}