import Image from "next/image";
import { useSession } from "../../../../node_modules/next-auth/client";

import SubmitFormStyles from "../../../styles/SubmitFormStyles";
import ButtonStyles from "../../../styles/ButtonStyles";
import axios from "axios";
import router, { Router, useRouter } from "next/router";

export default function SubmitForm({ formData, currentStep }: any) {
  const [session, loading]: any = useSession();
  const router = useRouter();

  if (currentStep !== 8) {
    return null;
  }

  async function handleSubmit() {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}api/v1/tasks/`,
        {
          category: formData.category,
          title: "This is a placeholder title",
          details: `The size of the job is approximately ${formData.details}`,
          dueDate: formData.date,
          budget: formData.budget,
          photos: formData.photos,
          location: {
            name: formData.location,
            type: "Point",
            coordinates: [0, 0],
          },
        },
        {
          headers: {
            authorization: `Bearer ${session.accessToken}`,
          },
        }
      )
      .then((response) => {
        router.push("/mytasks");
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <SubmitFormStyles>
      <h2> </h2>
      <div className="row">
        <div className="icon"></div>
        <div>{formData.category ? formData.category : "..."}</div>
      </div>
      <div className="row">
        <div className="icon"></div>
        <div>{formData.details ? formData.details : "..."}</div>
      </div>
      <div className="row">
        <div className="icon"></div>
        <div>{formData.location ? formData.location : "..."}</div>
      </div>
      <div className="row">
        <div className="icon"></div>
        <div>{formData.budget ? `$${formData.budget}` : "..."}</div>
      </div>
      <div className="row">
        <div className="icon"></div>
        <div>{formData.date ? formData.date : "..."}</div>
      </div>
      <div className="row">
        <div className="icon"></div>
        <div>{formData.time ? formData.time : "..."}</div>
      </div>
      <div className="row">
        <div className="icon"></div>
        <div>
          {formData.photo ? (
            <div className="icon">
              <Image
                width="48px"
                height="48px"
                src={URL.createObjectURL(formData.photo)}
                alt="Job Photo"
              />
            </div>
          ) : (
            "..."
          )}
        </div>
      </div>
      <ButtonStyles onClick={handleSubmit} primary fullWidth>
        Submit
      </ButtonStyles>
    </SubmitFormStyles>
  );
}
