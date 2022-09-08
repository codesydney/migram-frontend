import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faCalendarDay,
} from "@fortawesome/free-solid-svg-icons";

import ErrorMessage from "../../../common/ErrorMessage";
import FormStyles from "../../../styles/FormStyles";

export default function Section2({
  currentStep,
  handleChange,
  location,
  date,
  errors
}: any) {
  if (currentStep !== 2) {
    return null;
  }

  return (
    <FormStyles>
      <fieldset>
        <h4>What is the location for the job?</h4>
        <div className="icon-input">
          <div className="icon">
            <FontAwesomeIcon icon={faMapMarkerAlt} color={"grey"} />
          </div>
          <div className="input-container">
            <input
              type="text"
              name="location"
              className={errors["location"] && "error"}
              placeholder="enter suburb or postcode"
              value={location}
              onChange={handleChange}
            ></input>
            {errors.location && <ErrorMessage message={errors.location}/>}
          </div>
        </div>
        <h4>What date would you like to book?</h4>
        <div className="icon-input">
          <div className="icon">
            <FontAwesomeIcon icon={faCalendarDay} color={"grey"} />
          </div>
          <div className="input-container">
            <input
              type="date"
              name="date"
              className={errors["date"] && "error"}
              value={date}
              onChange={handleChange}
            ></input>
            {errors.date && <ErrorMessage message={errors.date}/>}
        </div>
        </div>
        <h4>What time of arrival do you expect?</h4>
        {/* enum: ['7am-10am', '10am-1pm', '1pm-4pm', '4pm-7pm'] */}
        <div className="input-container">
          <select
            // value="7am-10am"
            name="timeOfArrival"
            className={errors["timeOfArrival"] && "error"}
            id="timeOfArrival"
            onChange={handleChange}
          >
            <option value="7am-10am">7am - 10am</option>
            <option value="10am-1pm">10am - 1pm</option>
            <option value="1pm-4pm">1pm - 4pm</option>
            <option value="4pm-7pm">4pm - 7pm</option>
          </select>
          {errors.timeOfArrival && <ErrorMessage message={errors.timeOfArrival}/>}
        </div>
      </fieldset>
    </FormStyles>
  );
}
