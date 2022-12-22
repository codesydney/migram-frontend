import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useStripe } from "@stripe/react-stripe-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfo,
  faDollarSign,
  faMapMarkerAlt,
  faCalendarDay,
  faClock,
  faHourglassStart,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/legacy/image";
import useForm from "../../../lib/useForm";
import { OffersList } from "./OffersList";
import ErrorMessage from "../../../components/common/ErrorMessage";
import Loading from "../../../components/common/Loading";
import { validate } from "../../../lib/validator";
import ImageModal from "../../../components/common/ImageModal";

import ButtonStyles from "../../../components/styles/ButtonStyles";
import SubmitFormStyles from "../../../components/styles/SubmitFormStyles";
import FormStyles from "../../../components/styles/FormStyles";

export function TaskDetails({ selectedTask }: any) {
  // const { selectedTask } = useContext(DashboardContext);
  const { data: session } = useSession();
  const [updatedTask, setUpdatedTask] = useState(selectedTask);
  const [isMyTask, setIsMyTask] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const stripe = useStripe();
  const router = useRouter();

  const {
    inputs,
    handleChange,
    errors,
    updateErrors,
    resetForm,
    clearForm,
  }: any = useForm({
    offerAmt: 0,
    comments: "",
  });

  async function handleOfferSubmit(e: any) {
    e.preventDefault();
    setIsSubmiting(true);
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}api/v1/tasks/${selectedTask.id}/offers`,
        {
          offerAmt: inputs.offerAmt,
          comments: inputs.comments,
        }
      )
      .then((response) => {
        resetForm();
        router.push("/offers");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function handleStripeSubmit(
    client_secret: string,
    payment_method: string
  ) {
    if (!stripe) {
      return;
    }

    const result: any = await stripe
      .confirmCardPayment(client_secret, {
        payment_method: payment_method,
      })
      .then(function (result) {});
  }

  async function handleReleasePayment(e: any) {
    e.preventDefault();
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}api/v1/releasePayment`, {
        taskId: selectedTask.id,
      })
      .then((response) => {
        const { client_secret, payment_method } = response.data.data;
        handleStripeSubmit(client_secret, payment_method);
        router.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (!selectedTask) {
      return;
    }
    setUpdatedTask(selectedTask);
    // setIsMyTask(false);
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}api/v1/tasks/${selectedTask._id}`)
      .then((response) => {
        if (response.data.data.task.customerId == session?.user.customerId) {
          setIsMyTask(true);
        }
        if (selectedTask._id == response.data.data.task._id) {
          setUpdatedTask(response.data.data.task);
        }
      })
      .catch((error) => {
        setUpdatedTask(selectedTask);
      });
    // if (myTasks) {
    //   router.push(`/mytasks/${selectedTask.id}`, undefined, {
    //     shallow: true,
    //   });
    // } else {
    //   router.push(`/tasks/${selectedTask.id}`, undefined, {
    //     shallow: true,
    //   });
    // }
  }, [selectedTask]);

  function invalidField() {
    if (validate.offerAmt(inputs.offerAmt)) return true;
    if (validate.comments(inputs.comments)) return true;
    return false;
  }

  function handleErrors(event: any) {
    event.preventDefault();
    updateErrors(["offerAmt", "comments"]);
  }

  return (
    selectedTask && (
      <>
        {updatedTask?.status == "completed" && isMyTask && (
          <ButtonStyles onClick={handleReleasePayment} fullWidth>
            Finalize Payment
          </ButtonStyles>
        )}
        <SubmitFormStyles>
          <div className="section-1">
            <div className="field">
              <div className="title">Job Type</div>
              <div className="user-input">
                <div className="icon"></div>
                {selectedTask.category}
              </div>
            </div>
            <div className="field">
              <div className="title">Description</div>
              <div className="user-input">
                <div className="icon">
                  <FontAwesomeIcon icon={faInfo} color={"black"} />
                </div>
                {selectedTask.details}
              </div>
            </div>
            <div className="field">
              <div className="title">Budget</div>
              <div className="user-input">
                <div className="icon">
                  <FontAwesomeIcon icon={faDollarSign} color={"black"} />
                </div>
                {selectedTask.budget}
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
                {selectedTask.location.name}
              </div>
            </div>
            <div className="field">
              <div className="title">Date</div>
              <div className="user-input">
                <div className="icon">
                  <FontAwesomeIcon icon={faCalendarDay} color={"black"} />
                </div>
                {selectedTask.dueDate.slice(0, 10)}
              </div>
            </div>
            <div className="field">
              <div className="title">Time</div>
              <div className="user-input">
                <div className="icon">
                  <FontAwesomeIcon icon={faClock} color={"black"} />
                </div>
                {selectedTask.timeOfArrival}
              </div>
            </div>
          </div>
          <div className="section-3">
            <div className="field">
              <div className="title">Completion Time</div>
              <div className="user-input">
                <div className="icon">
                  <FontAwesomeIcon icon={faHourglassStart} color={"black"} />
                </div>
                {selectedTask.timeEstimate}
              </div>
            </div>
            <div className="field">
              <div className="title">Image</div>
              <div className="user-input">
                {selectedTask.photos[0] && (
                  <>
                    <Image
                      width="48"
                      height="48"
                      src={selectedTask.photos[0]}
                      alt="image to upload"
                      onClick={() => setIsModalOpen(true)}
                    />
                    <ImageModal
                      open={isModalOpen}
                      onClose={() => setIsModalOpen(false)}
                      imgUrl={selectedTask.photos[0]}
                    />
                  </>
                )}
              </div>
            </div>
          </div>

          {updatedTask?.offers && updatedTask?.status == "open" && (
            <>
              <h4>Offers</h4>
              <OffersList offers={updatedTask.offers} myTask={isMyTask} />
            </>
          )}
        </SubmitFormStyles>
        {session?.user.providerId && updatedTask?.status == "open" && (
          <FormStyles
            onSubmit={invalidField() ? handleErrors : handleOfferSubmit}
          >
            <fieldset disabled={false}>
              <div className="input-container">
                <input
                  type="number"
                  name="offerAmt"
                  className={errors.offerAmt && "error"}
                  placeholder="offer amount"
                  value={inputs.offerAmt}
                  onChange={handleChange}
                />
                {errors.offerAmt && <ErrorMessage message={errors.offerAmt} />}
              </div>
              <div className="input-container">
                <textarea
                  placeholder="comments"
                  rows={4}
                  id="comments"
                  name="comments"
                  className={errors.comments && "error"}
                  value={inputs.comments}
                  onChange={handleChange}
                />
                {inputs.comments && (
                  <span className="char-count">
                    {inputs.comments.length}/1500
                  </span>
                )}
                {errors.comments && <ErrorMessage message={errors.comments} />}
              </div>
            </fieldset>
            <ButtonStyles disabled={isSubmiting} fullWidth>
              {isSubmiting ? (
                <Loading text="Submiting offer" />
              ) : (
                "Make an Offer"
              )}
            </ButtonStyles>
          </FormStyles>
        )}
      </>
    )
  );
}
