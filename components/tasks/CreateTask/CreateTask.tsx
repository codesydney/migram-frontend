import { useState } from "react";
import useForm from "../../../lib/useForm";
import Section1 from "./sections/Section1";
import Section2 from "./sections/Section2";
import Section3 from "./sections/Section3";

import SubmitForm from "./SubmitForm";
import {validate} from "../../../lib/validator";

import BodyStyles from "../../styles/BodyStyles";
import ButtonStyles from "../../styles/ButtonStyles";
import ProgressStyles from "../../styles/ProgressStyles";
import FormControlStyles from "../../styles/FormControlStyles";

export default function CreateTask() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const {
    inputs,
    errors,
    handleChange,
    updateErrors,
    resetForm,
    clearForm,
  }: any = useForm({
    category: "Cleaning",
    details: "",
    budget: 0,
    location: "",
    date: "",
    time: "",
    photo: "",
    timeOfArrival: "7am-10am",
    timeEstimate: "1-3hrs",
  });

  const [selectedFile, setSelectedFile]: any = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const sections: any = {
    1: ["category", "details", "budget"],
    2: ["location", "date", ],
    3: [],
  };

  function handleFileChange(event: any) {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  }

  function invalidField() {
    if (currentStep < totalSteps) {
      return sections[currentStep].some((field:string) => {
        const value = inputs[field];
        return validate[field](value);
      });
    }
  }

  function nextStep() {
    if (invalidField()) {
      updateErrors(sections[currentStep]);
    } else {
      setCurrentStep(currentStep + 1);
    }
  }

  console.log(inputs);

  return (
    <BodyStyles alternate>
      <div className="primary">
        {currentStep != totalSteps ? (
          <>
            <h2>Post a job</h2>
            <p>
              <b>
                Section {currentStep} of {totalSteps - 1}:
              </b>{" "}
              {currentStep == 1 ? "Job main details and budget" : ""}
              {currentStep == 2 ? "Job location and schedule" : ""}
              {currentStep == 3 ? "Further job details" : ""}
            </p>
          </>
        ) : (
          <>
            <h2>Please confirm your job request</h2>
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
        <Section1
          currentStep={currentStep}
          handleChange={handleChange}
          category={inputs.category}
          details={inputs.details}
          budget={inputs.budget}
          errors={errors}
        />
        <Section2
          currentStep={currentStep}
          handleChange={handleChange}
          location={inputs.location}
          date={inputs.date}
          timeOfArrival={inputs.timeOfArrival}
          errors={errors}
        />
        <Section3
          currentStep={currentStep}
          handleChange={handleChange}
          handleFileChange={handleFileChange}
          timeEstimate={inputs.timeEstimate}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          errors={errors}
        />
        <SubmitForm
          formData={inputs}
          selectedFile={selectedFile}
          currentStep={currentStep}
          isFilePicked={isFilePicked}
        ></SubmitForm>
        {currentStep != totalSteps ? (
          <ButtonStyles onClick={nextStep} primary fullWidth>
            next
          </ButtonStyles>
        ) : (
          <></>
        )}
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
            disabled={currentStep >= totalSteps || invalidField()}
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
