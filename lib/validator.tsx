const ERROR_MESSAGES = {
  customerId: {
    required:
      "This user needs to be made a customer in order to proceed with creating a task.",
  },
  category: {
    required: "A task category is required.",
  },
  title: {
    required: "Task name is required!",
    min: "A title must have at least 10 characters",
  },
  details: {
    required: "Task details are required.",
    min: "Details must have at least 25 characters",
  },
  budget: {
    required: "A budget is required.",
    min: "Budget should be at least a minimum of $5",
  },
  timeOfArrival: {
    required: "Time of arrival is required",
  },
  timeEstimate: {
    required: "Time estimate is required",
  },
  location: {
    required: "A task location address is required.",
  },
  date: {
    required: "Date is required",
    inFuture: "Due date cannot be lesser than today.",
  },
  email: {
    required: "Email is required",
    invalidEmail: "Email must be valid",
  },
  password: {
    required: "Password is required.",
    min: "Password must be at least 8 characters long",
  },
  passwordConfirm: {
    required: "Please confirm your password.",
    mustMatch: "Passwords must match.",
  },
  offerAmt: {
    required: "Offer amount is required.",
    min: "A minimum offer amount of $5 is required"
  },
  comments: {
    min: "Comments must have at least 25 characters.",
    max: "Comments must have at max of 1500 characters."
  }
};

const validate :any = {
  email(value:string) {
    function emailIsValid(email:string) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    value = value.trim();
    if (!value) return ERROR_MESSAGES.email.required;
    if (!emailIsValid(value)) return ERROR_MESSAGES.email.invalidEmail;
    return "";
  },
  password(value:any, checkRequiredOnly:any) {
    value = value.trim();
    if (value && checkRequiredOnly) return "";
    if (!value) return ERROR_MESSAGES.password.required;
    if (value.length < 8) return ERROR_MESSAGES.password.min;
    return ""
  },
  passwordConfirm(value:any, password:any) {
    value = value.trim();
    if (!value) return ERROR_MESSAGES.passwordConfirm.required;
    if (value !== password) return ERROR_MESSAGES.passwordConfirm.mustMatch

    return "";
  },
  category(value:any) {
    return !value.trim() ? ERROR_MESSAGES.category.required : "";
  },
  title(value:any) {
    value = value.trim();
    if (!value) return ERROR_MESSAGES.title.required;
    if (value.length < 10) return ERROR_MESSAGES.title.min;
    return "";
  },
  details(value:any) {
    value = value.trim();
    if (!value) return ERROR_MESSAGES.details.required;
    if (value.length < 25) return ERROR_MESSAGES.details.min;
    return "";
  },
  budget(value:any) {
    const invalidValue = Number.isNaN(value) || value === '';
    if (invalidValue) return ERROR_MESSAGES.budget.required;
    if (value < 5) return ERROR_MESSAGES.budget.min;
    return "";
  },
  location(value:any) {
    return !value.trim() ? ERROR_MESSAGES.location.required : "";
  },
  timeOfArrival(value:any) {
    return !value.trim() ? ERROR_MESSAGES.timeOfArrival.required : "";
  },
  timeEstimate(value:any) {
    return !value.trim() ? ERROR_MESSAGES.timeEstimate.required : "";
  },
  date(value:any) {
    const notInFuture = new Date(value) < new Date();
    if (!value) return ERROR_MESSAGES.date.required;
    if (notInFuture) return ERROR_MESSAGES.date.inFuture;
    return "";
  },
  offerAmt(value:any) {
    const invalidValue = Number.isNaN(value) || value === '';
    if (invalidValue) return ERROR_MESSAGES.offerAmt.required;
    if (value < 5) return ERROR_MESSAGES.offerAmt.min;
    return "";
  },
  comments(value:any) {
    value = value.trim();
    if (!value || value.length < 25) return ERROR_MESSAGES.comments.min;
    if (value.length > 1500) return ERROR_MESSAGES.comments.max;
    return "";
  }
};

function validateFields(fields:any, errors:any, values:any) {
  const newErrors = { ...errors };

  fields.forEach((name:any) => {
    const value = values[name];
    if (name === "passwordConfirm") {
      newErrors[name] = validate[name](value, values.password);
    } else {
      newErrors[name] = validate[name](value);
    }
  });

  return newErrors;
}

export default validateFields;
export { validate };
