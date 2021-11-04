import { useContext, useEffect, useState } from "react";
import DashboardContext from "../DashboardContext";
import axios from "axios";
import { useSession } from "../../../node_modules/next-auth/client";
import { useRouter } from "next/router";
import { useStripe } from "@stripe/react-stripe-js";

import SingleTaskStyles from "../../styles/SingleTaskStyles";
import ButtonStyles from "../../styles/ButtonStyles";
import SubmitFormStyles from "../../styles/SubmitFormStyles";
import FormStyles from "../../styles/FormStyles";
import useForm from "../../../lib/useForm";
import Offers from "../Offers/Offers";

/*
budget: 70
​​​​​
category: "Lawn Mowing"
​​​​​
createdAt: "2021-09-09T09:10:04.832Z"
​​​​​
customerId: "cus_K3ktYCB2QXWPNH"
​​​​​
details: "Backyard needs mowing. Area around 200 sq mtrs"
​​​​​
dueDate: "2021-09-28T00:00:00.000Z"
*/
export default function SingleTask({ Task, myTasks }: any) {
  const { selectedTask } = useContext(DashboardContext);
  const [session, loading]: any = useSession();
  const [updatedTask, setUpdatedTask] = useState(selectedTask);
  const [isMyTask, setIsMyTask] = useState(false);
  const stripe = useStripe();
  const router = useRouter();

  const { inputs, handleChange, resetForm, clearForm }: any = useForm({
    offerAmt: 0,
    comments: "",
  });

  async function handleDelete(e: any) {
    axios
      .delete(
        `${process.env.NEXT_PUBLIC_API_URL}api/v1/tasks/${selectedTask._id}`,
        {
          headers: {
            authorization: `Bearer ${session.accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function handleOfferSubmit(e: any) {
    e.preventDefault();
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}api/v1/tasks/${selectedTask.id}/offers`,
        {
          offerAmt: inputs.offerAmt,
          comments: inputs.comments,
        },
        {
          headers: {
            authorization: `Bearer ${session.accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
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

    console.log(result);
  }

  async function handleReleasePayment(e: any) {
    e.preventDefault();
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}api/v1/releasePayment`,
        {
          taskId: selectedTask.id,
        },
        { headers: { authorization: `Bearer ${session.accessToken}` } }
      )
      .then((response) => {
        const { client_secret, payment_method } = response.data.data;
        console.log("!!!", client_secret, payment_method);
        handleStripeSubmit(client_secret, payment_method);
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
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}api/v1/tasks/${selectedTask._id}`,
        {
          headers: {
            authorization: `Bearer ${session.accessToken}`,
          },
        }
      )
      .then((response) => {
        if (response.data.data.task.customerId == session.user.customerId) {
          setIsMyTask(true);
        }
        if (selectedTask._id == response.data.data.task._id) {
          console.log(response.data.data.task);
          setUpdatedTask(response.data.data.task);
        }
      })
      .catch((error) => {
        setUpdatedTask(selectedTask);
      });
    if (myTasks) {
      router.push(`/mytasks/${selectedTask.id}`, undefined, {
        shallow: true,
      });
    } else {
      router.push(`/tasks/${selectedTask.id}`, undefined, {
        shallow: true,
      });
    }
  }, [selectedTask]);

  return (
    selectedTask && (
      <>
        <SubmitFormStyles>
          <div className="manage-task">
            {session?.user.providerId && <ButtonStyles>Favourite</ButtonStyles>}
            {session?.user.customerId && isMyTask && (
              <>
                <ButtonStyles>Edit</ButtonStyles>
                <ButtonStyles onClick={handleDelete}>Delete</ButtonStyles>
              </>
            )}
          </div>
          <div style={{ marginBottom: 24 }}>Status: {selectedTask.status}</div>
          <div className="row">
            <div className="icon"></div>
            <div>{selectedTask.title}</div>
          </div>
          <div className="row">
            <div className="icon"></div>
            <div>{selectedTask.category}</div>
          </div>
          <div className="row">
            <div className="icon"></div>
            <div>{selectedTask.details}</div>
          </div>
          <div className="row">
            <div className="icon"></div>
            <div>{selectedTask.location.name}</div>
          </div>
          <div className="row">
            <div className="icon"></div>
            <div>{selectedTask.budget}</div>
          </div>
          {selectedTask.status == "completed" && isMyTask && (
            <ButtonStyles
              style={{ marginBottom: 24 }}
              onClick={handleReleasePayment}
            >
              Release Payment
            </ButtonStyles>
          )}
          <h4>Offers</h4>
          {updatedTask?.offers && (
            <Offers offers={updatedTask.offers} myTask={isMyTask} />
          )}
        </SubmitFormStyles>
        {session?.user.providerId && (
          <FormStyles onSubmit={handleOfferSubmit}>
            <fieldset disabled={false}>
              <input
                type="number"
                name="offerAmt"
                placeholder="offerAmt"
                value={inputs.offerAmt}
                onChange={handleChange}
              />
              <textarea
                placeholder="comments"
                rows={4}
                id="comments"
                name="comments"
                value={inputs.comments}
                onChange={handleChange}
              />
            </fieldset>
            <ButtonStyles fullWidth>Make an Offer</ButtonStyles>
          </FormStyles>
        )}
      </>
    )
  );
}
