import { FieldErrorsImpl, UseFormRegister } from "react-hook-form";
import { AddressSchema } from "../../types/schemas";

interface AddressFormSegmentProps<T extends AddressSchema> {
  register: UseFormRegister<T>;
  errors: Partial<FieldErrorsImpl<T>>;
}

/**
 *
 * @prop register - React Hook Form Register Utility
 * @prop errors - React Hook Form Errors
 * @returns
 */
export const AddressFormSegment = <T extends AddressSchema>({
  register,
  errors,
}: AddressFormSegmentProps<T>) => {
  const addressRegister = register as UseFormRegister<AddressSchema>;

  return (
    <>
      <div className="labelled-input">
        <label htmlFor="line1">Address Line 1</label>
        <input id="line1" {...addressRegister("line1")} />
        <label htmlFor="line1" className="error">
          {errors.line1?.message}
        </label>
      </div>

      <div className="labelled-input">
        <label htmlFor="line2">Address Line 2</label>
        <input id="line2" {...addressRegister("line2")} />
        <label htmlFor="line2" className="error">
          {errors.line2?.message}
        </label>
      </div>

      <div className="labelled-input">
        <label htmlFor="city">City</label>
        <input id="city" {...addressRegister("city")} />
        <label htmlFor="city" className="error">
          {errors.city?.message}
        </label>
      </div>

      <div className="labelled-input">
        <label htmlFor="state">State</label>
        <select id="state" {...addressRegister("state")}>
          <option value="ACT">ACT</option>
          <option value="NSW">NSW</option>
          <option value="NT">NT</option>
          <option value="QLD">QLD</option>
          <option value="SA">SA</option>
          <option value="TAS">TAS</option>
          <option value="VIC">VIC</option>
          <option value="WA">WA</option>
        </select>
        <label htmlFor="state" className="error">
          {errors.state?.message}
        </label>
      </div>

      <div className="labelled-input">
        <label htmlFor="postcode">Postcode</label>
        <input id="postcode" {...addressRegister("postal_code")} />
        <label htmlFor="postcode" className="error">
          {errors.postal_code?.message}
        </label>
      </div>
    </>
  );
};
