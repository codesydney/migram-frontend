import { useEffect, useState } from "react";
import validateFields, { validate } from "./validator";

export default function useForm(initial = {}) {
  // create a state object for our inputs
  const [inputs, setInputs]: any = useState(initial);
  const initialValues = Object.values(initial).join("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // This function runs when the things we are watching change
    setInputs(initial);
  }, [initialValues]);

  function handleChange(e: any) {
    let { value, name, type } = e.target;

    if (type === "number") {
      value = parseInt(value);
    }
    if (type === "file") {
      value = e.target.files[0];
    }

    updateError(name, value);
    
    setInputs({
      // copy the existing state
      ...inputs,
      [name]: value,
    });
  }

  function updateError(name: any, value: any) {
    const inputsLength = Object.keys(inputs).length;
    if (validate.hasOwnProperty(name)) {
      if (name === "passwordConfirm") {
        setErrors({ 
          ...errors,
          [name]: validate[name](value, inputs.password)
        });
      } else if (name === "password" && inputs.passwordConfirm) {
        const password = inputs.password;
        const passwordConfirm = inputs.passwordConfirm;
        setErrors({
          ...errors,
          [name]: validate[name](value, password),
          passwordConfirm: validate.passwordConfirm(passwordConfirm, value)
        });
      } else if (name === "password" && inputsLength === 2) {
        setErrors({
          ...errors,
          password: validate.password(value, 'requiredOnly')
        });
      } else {
        setErrors({ ...errors, [name]: validate[name](value) });
      }
    }
  }

  function updateErrors(fields: any) {
    setErrors(validateFields(fields, errors, inputs));
  }

  function resetForm() {
    setInputs(initial);
    setErrors({});
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ""])
    );
    setInputs(blankState);
    setErrors({});
  }

  // return the things we want to surface from this custom hook
  return {
    inputs,
    errors,
    handleChange,
    updateErrors,
    resetForm,
    clearForm,
  };
}
