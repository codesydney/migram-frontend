import Image from "next/image";

import ButtonStyles from "../../../styles/ButtonStyles";
import FormStyles from "../../../styles/FormStyles";

export default function Step7({
  currentStep,
  handleChange,
  photo,
  increment,
}: any) {
  if (currentStep !== 7) {
    return null;
  }
  return (
    <FormStyles>
      <h3>Any images you would like to upload?</h3>
      <fieldset>
        <div style={{ paddingBottom: 32 }}>
          {photo && (
            <Image
              width="200px"
              height="200px"
              src={URL.createObjectURL(photo)}
              alt="Job Photo"
            />
          )}
        </div>
        <input type="file" id="photo" name="photo" onChange={handleChange} />
        <ButtonStyles onClick={increment} primary fullWidth>
          next
        </ButtonStyles>
      </fieldset>
    </FormStyles>
  );
}
