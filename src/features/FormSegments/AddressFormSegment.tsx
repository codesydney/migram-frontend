import { FieldErrorsImpl, UseFormRegister } from "react-hook-form";
import { TextInput } from "../../components/common/TextInput";
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
  const addressErrors = errors as Partial<FieldErrorsImpl<AddressSchema>>;

  return (
    <>
      <TextInput
        id="line1"
        label="Address Line 1"
        error={addressErrors.line1?.message}
        {...addressRegister("line1")}
      />
      <TextInput
        id="line2"
        label="Address Line 2"
        error={addressErrors.line2?.message}
        {...addressRegister("line2")}
      />
      <TextInput
        id="city"
        label="City"
        error={addressErrors.city?.message}
        {...addressRegister("city")}
      />

      <div className="labelled-input">
        <label htmlFor="state" className="primary-label">
          State
        </label>
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
        <label htmlFor="state" className="error-label">
          {errors.state?.message}
        </label>
      </div>

      <TextInput
        id="postal_code"
        label="Postcode"
        error={addressErrors.postal_code?.message}
        {...addressRegister("postal_code")}
      />
    </>
  );
};
