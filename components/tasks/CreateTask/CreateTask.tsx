import { useState } from "react";
import useForm from "../../../lib/useForm";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";
import Step5 from "./steps/Step5";
import Step6 from "./steps/Step6";
import Step7 from "./steps/Step7";
import SubmitForm from "./steps/SubmitForm";

import BodyStyles from "../../styles/BodyStyles";
import ButtonStyles from "../../styles/ButtonStyles";
import ProgressStyles from "../../styles/ProgressStyles";
import FormControlStyles from "../../styles/FormControlStyles";

export default function CreateTask() {
  const { inputs, handleChange, resetForm, clearForm }: any = useForm({
    category: "",
    details: "",
    budget: 0,
    location: "",
    date: "",
    time: "",
    photo: "",
  });
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 8;

  function nextStep() {
    setCurrentStep(currentStep + 1);
  }

  console.log(inputs);

  return (
    <BodyStyles alternate>
      <div className="primary">
        {currentStep != totalSteps ? (
          <>
            <h2>Post a job</h2>
            <p>
              Question {currentStep} of {totalSteps - 1}
            </p>
          </>
        ) : (
          <>
            <h2>Please confirm your details</h2>
            <div className="flex-container">
              <ButtonStyles onClick={() => setCurrentStep(1)}>
                Edit
              </ButtonStyles>
              <ButtonStyles primary>Submit</ButtonStyles>
            </div>
          </>
        )}
      </div>
      <div className="secondary">
        {/* TODO: Simplify by using a provider/consumer pattern */}
        <Step1
          currentStep={currentStep}
          handleChange={handleChange}
          category={inputs.category}
          increment={nextStep}
        />
        <Step2
          currentStep={currentStep}
          handleChange={handleChange}
          details={inputs.details}
          increment={nextStep}
        />
        <Step3
          currentStep={currentStep}
          handleChange={handleChange}
          location={inputs.location}
          increment={nextStep}
        />
        <Step4
          currentStep={currentStep}
          handleChange={handleChange}
          budget={inputs.budget}
          increment={nextStep}
        />
        <Step5
          currentStep={currentStep}
          handleChange={handleChange}
          date={inputs.date}
          increment={nextStep}
        />
        <Step6
          currentStep={currentStep}
          handleChange={handleChange}
          time={inputs.time}
          increment={nextStep}
        />
        <Step7
          currentStep={currentStep}
          handleChange={handleChange}
          photo={inputs.photo}
          increment={nextStep}
        />
        <SubmitForm formData={inputs} currentStep={currentStep}></SubmitForm>
        <FormControlStyles>
          <div className="bar">
            <label htmlFor="currentStep">{`${Math.floor(
              ((currentStep - 1) / (totalSteps - 1)) * 100
            )}% completed`}</label>
            <ProgressStyles
              id="currentStep"
              max={totalSteps - 1}
              value={currentStep - 1}
            ></ProgressStyles>
          </div>
          <button
            disabled={currentStep <= 1}
            onClick={() => setCurrentStep(currentStep - 1)}
          >
            {"<"}
          </button>
          <button
            disabled={currentStep >= totalSteps}
            onClick={() => setCurrentStep(currentStep + 1)}
          >
            {">"}
          </button>
        </FormControlStyles>
      </div>
    </BodyStyles>
  );
}

{
  /* <FormStyles>
          <label htmlFor="title">
            Title
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              value={inputs.title}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="budget">
            Budget
            <input
              type="number"
              id="budget"
              name="budget"
              placeholder="Budget"
              value={inputs.budget}
              onChange={handleChange}
            />
          </label>
          <button type="button" onClick={clearForm}>
            Clear Form
          </button>
          <button type="button" onClick={resetForm}>
            Reset Form
          </button>
        </FormStyles> */
}
