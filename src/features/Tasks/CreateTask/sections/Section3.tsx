import Image from "next/legacy/image";
import { faClock, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import FormStyles from "../../../../components/styles/FormStyles";

export default function Section2({
  currentStep,
  handleChange,
  selectedFile,
  setSelectedFile,
  handleFileChange,
}: any) {
  if (currentStep !== 3) {
    return null;
  }

  console.log(selectedFile);

  return (
    <FormStyles>
      <fieldset>
        <h4>
          Roughly, how much time do you think it will take to complete this job?
        </h4>
        {/* enum: ['1-3hrs', '4-6hrs', '6-8hrs', 'moreThan1Day'] */}
        <div className="icon-input">
          <div className="icon">
            <FontAwesomeIcon icon={faClock} color={"grey"} />
          </div>
          <select name="timeEstimate" id="timeEstimate" onChange={handleChange}>
            <option value="1-3hrs">1 - 3 hours</option>
            <option value="4-6hrs">4 - 6 hours</option>
            <option value="6-8hrs">6 - 8 hours</option>
            <option value="moreThan1Day">more than a day</option>
          </select>
        </div>
        <h4>Would you like to upload an image?</h4>
        <div className="image-upload">
          <label className="custom-file-upload">
            <input
              type="file"
              id="photo"
              name="photo"
              onChange={handleFileChange}
            />
            <FontAwesomeIcon icon={faPlusCircle} color={"grey"} />
          </label>
          {selectedFile && (
            <Image
              width="48"
              height="48"
              src={URL.createObjectURL(selectedFile)}
              alt="image to upload"
            />
          )}
        </div>
      </fieldset>
    </FormStyles>
  );
}
