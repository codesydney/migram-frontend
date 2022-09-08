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
};

function emailIsValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const validate = {
  email(value) {
    function emailIsValid(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    value = value.trim();
    if (!value) return ERROR_MESSAGES.email.required;
    if (!emailIsValid(value)) return ERROR_MESSAGES.email.invalidEmail;
    return "";
  },
  password(value) {
    console.log("from password");
    value = value.trim();
    if (!value) return ERROR_MESSAGES.password.required;
    if (value.length < 8) return ERROR_MESSAGES.password.min;

    return "";
  },
  passwordConfirm(value) {},
  category(value) {
    return !value.trim() ? ERROR_MESSAGES.category.required : "";
  },
  title(value) {
    value = value.trim();
    if (!value) return ERROR_MESSAGES.title.required;
    if (value.length < 10) return ERROR_MESSAGES.title.min;
    return "";
  },
  details(value) {
    value = value.trim();
    if (!value) return ERROR_MESSAGES.details.required;
    if (value.length < 25) return ERROR_MESSAGES.details.min;
    return "";
  },
  budget(value) {
    const invalidValue = Number.isNaN(value) || value === 0;
    if (invalidValue) return ERROR_MESSAGES.budget.required;
    if (value < 5) return ERROR_MESSAGES.budget.min;
    return "";
  },
  location(value) {
    return !value.trim() ? ERROR_MESSAGES.location.required : "";
  },
  timeOfArrival(value) {
    return !value.trim() ? ERROR_MESSAGES.timeOfArrival.required : "";
  },
  timeEstimate(value) {
    return !value.trim() ? ERROR_MESSAGES.timeEstimate.required : "";
  },
  date(value) {
    const notInFuture = new Date(value) < new Date();
    if (!value) return ERROR_MESSAGES.date.required;
    if (notInFuture) return ERROR_MESSAGES.date.inFuture;
    return "";
  },
};

function validateFields(fields, errors, values, newValue) {
  const newErrors = { ...errors };

  fields.forEach(name => {
    const value = values[name];
    newErrors[name] = validate[name](value);
  });

  return newErrors;
}

export default validateFields;
export { validate };

// function validateFields(fields, errors, values, newValue) {
//   const newErrors = { ...errors };

//   fields.forEach(name => {
//     // const value = values[name];
//     // const invalidValue =
//     // Number.isNaN(value) || value === 0 || String(value).trim() === "";
//     console.log(validate[name]("admin"));
//     console.log(validate[name]("admin@domain.com"));

//     if (name === "email") {
//       if (invalidValue) {
//         newErrors[name] = ERROR_MESSAGES[name];
//       } else if (!emailIsValid(value)) {
//         newErrors[name] = ERROR_MESSAGES.invalidEmail;
//       } else {
//         newErrors[name] = "";
//       }
//     } else if (name === "password") {
//       if (invalidValue) {
//         newErrors[name] = ERROR_MESSAGES[name];
//       } else if (newValue !== values.passwordConfirm) {
//         newErrors.passwordConfirm = ERROR_MESSAGES.passwordMustMatch;
//       } else if (newValue === values.passwordConfirm) {
//         newErrors.passwordConfirm = "";
//       } else {
//         newErrors[name] = "";
//       }
//     } else if (name === "passwordConfirm") {
//       if (invalidValue) {
//         newErrors[name] = ERROR_MESSAGES[name];
//       } else if (newValue !== values.password) {
//         newErrors[name] = ERROR_MESSAGES.passwordMustMatch;
//       } else {
//         newErrors[name] = "";
//       }
//     } else if (invalidValue) {
//       newErrors[name] = ERROR_MESSAGES[name];
//     } else {
//       newErrors[name] = "";
//     }
//   });

//   return newErrors;
// }
