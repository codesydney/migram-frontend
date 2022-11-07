import Image from "next/legacy/image";
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfo,
  faDollarSign,
  faMapMarkerAlt,
  faCalendarDay,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

import SubmitFormStyles from "../../../components/styles/SubmitFormStyles";
import ButtonStyles from "../../../components/styles/ButtonStyles";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import ErrorMessageStyles from "../../../components/styles/ErrorMessage";

export default function SubmitForm({
  formData,
  selectedFile,
  isFilePicked,
  currentStep,
}: any) {
  const { data: session }: any = useSession();
  const [sending, setSending] = useState(false);
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");

  if (currentStep !== 4) {
    return null;
  }

  async function handleSubmit() {
    setErrorMessage("");
    setSending(true);
    const photoFormData = new FormData();
    let imageURL = "";

    // Post task WITH photo
    if (isFilePicked) {
      photoFormData.append("photos", selectedFile);
      axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}api/v1/uploadTaskPhotos`,
          photoFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          imageURL = response.data.data.photos[0];

          axios
            .post(
              `${process.env.NEXT_PUBLIC_API_URL}api/v1/tasks/`,
              {
                category: formData.category,
                title: "Placeholder",
                details: formData.details,
                dueDate: formData.date,
                budget: formData.budget,
                photos: [imageURL],
                location: {
                  name: formData.location,
                  type: "Point",
                  coordinates: [0, 0],
                },
                timeEstimate: formData.timeEstimate,
                timeOfArrival: formData.timeOfArrival,
              },
              {
                headers: {
                  authorization: `Bearer ${session.accessToken}`,
                },
              }
            )
            .then((response) => {
              setSending(false);
              console.log(response);
              router.push(`/mytasks/${response.data.data.task._id}`);
            })
            .catch((error) => {
              setSending(false);
              console.log(error.response.data.message);
              setErrorMessage(error.response.data.message);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // Post task WITHOUT photo
    else {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}api/v1/tasks/`,
          {
            category: formData.category,
            title: "Placeholder",
            details: formData.details,
            dueDate: formData.date,
            budget: formData.budget,
            photos: "",
            location: {
              name: formData.location,
              type: "Point",
              coordinates: [0, 0],
            },
            timeEstimate: formData.timeEstimate,
            timeOfArrival: formData.timeOfArrival,
          },
          {
            headers: {
              authorization: `Bearer ${session.accessToken}`,
            },
          }
        )
        .then((response) => {
          setSending(false);
          console.log(response);
          router.push(`/mytasks/${response.data.data.task._id}`);
        })
        .catch((error) => {
          setSending(false);
          console.log(error.response.data.message);
          setErrorMessage(error.response.data.message);
        });
    }
  }

  return (
    <SubmitFormStyles>
      <div className="section-1">
        <div className="field">
          <div className="title">Job Type</div>
          <div className="user-input">
            <div className="icon"></div>
            {formData.category}
          </div>
        </div>
        <div className="field">
          <div className="title">Description</div>
          <div className="user-input">
            <div className="icon">
              <FontAwesomeIcon icon={faInfo} color={"black"} />
            </div>
            {formData.details}
          </div>
        </div>
        <div className="field">
          <div className="title">Budget</div>
          <div className="user-input">
            <div className="icon">
              <FontAwesomeIcon icon={faDollarSign} color={"black"} />
            </div>
            {formData.budget}
          </div>
        </div>
      </div>
      <div className="section-2">
        <div className="field">
          <div className="title">Location</div>
          <div className="user-input">
            <div className="icon">
              <FontAwesomeIcon icon={faMapMarkerAlt} color={"black"} />
            </div>
            {formData.location}
          </div>
        </div>
        <div className="field">
          <div className="title">Date</div>
          <div className="user-input">
            <div className="icon">
              <FontAwesomeIcon icon={faMapMarkerAlt} color={"black"} />
            </div>
            {formData.date}
          </div>
        </div>
        <div className="field">
          <div className="title">Time</div>
          <div className="user-input">
            <div className="icon">
              <FontAwesomeIcon icon={faCalendarDay} color={"black"} />
            </div>
            {formData.timeOfArrival}
          </div>
        </div>
      </div>
      <div className="section-3">
        <div className="field">
          <div className="title">Completion Time</div>
          <div className="user-input">
            <div className="icon">
              <FontAwesomeIcon icon={faClock} color={"black"} />
            </div>
            {formData.timeEstimate}
          </div>
        </div>
        <div className="field">
          <div className="title">Image</div>
          <div className="user-input">
            {selectedFile && (
              <Image
                width="48"
                height="48"
                src={URL.createObjectURL(selectedFile)}
                alt="image to upload"
              />
            )}
          </div>
        </div>
      </div>
      <ButtonStyles disabled={sending} onClick={handleSubmit} primary fullWidth>
        Submit
      </ButtonStyles>
      {errorMessage && <ErrorMessageStyles>{errorMessage}</ErrorMessageStyles>}
    </SubmitFormStyles>
  );
}
