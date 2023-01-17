import type { NextPage } from "next";
import Link from "next/link";
import { useSession, getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/legacy/image";
import useForm from "../../lib/useForm";
import axios from "axios";
import BodyStyles from "@Components/styles/BodyStyles";
import ButtonStyles from "@Components/styles/ButtonStyles";
import FormStyles from "@Components/styles/FormStyles";

export function AccountPage() {
  const { data: session, status } = useSession();
  const [sending, setSending] = useState(false);
  const { inputs, handleChange, resetForm, clearForm }: any = useForm({
    photo: "",
    firstName: session?.user.firstName,
    lastName: session?.user.lastName,
  });
  const [selectedFile, setSelectedFile]: any = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [customerPaymentMethods, setCustomerPaymentMethods]: any =
    useState(null);

  function handleFileChange(event: any) {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  }

  useEffect(() => {
    if (session?.user?.customerId) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}api/v1/customers/${session?.user?.customerId}/paymentMethods`
        )
        .then((response) => {
          console.log("*", response);
          setCustomerPaymentMethods(response.data.data.card);
          console.log(customerPaymentMethods);
        })
        .catch((error) => {
          console.log("*", error);
        });
    }
  }, [session]);

  console.log(session?.user);

  async function handleUpdate(e: any) {
    e.preventDefault();
    setSending(true);
    const formData = new FormData();
    let imageURL = "";
    // Update with photo
    if (isFilePicked) {
      formData.append("photo", selectedFile);
      axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}api/v1/uploadUserPhoto`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          console.log(response.data.data.photo);
          imageURL = response.data.data.photo;

          console.log("updated", session?.user);
          axios
            .put(
              `${process.env.NEXT_PUBLIC_API_URL}api/v1/users/${session?.user.id}`,
              {
                photo: imageURL,
                firstName: inputs.firstName,
                lastName: inputs.lastName,
              }
            )
            .then((response) => {
              // Cause the JWT callback handler to retrieve the new user data and save it in the session
              console.log(response);
              axios
                .get("/api/auth/session?update", { withCredentials: true })
                .then(() => {
                  setSending(false);
                  window.location.reload();
                });
            })
            .catch((error) => {
              console.log(error);
              setSending(false);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // Update WITHOUT photo
    else {
      axios
        .put(
          `${process.env.NEXT_PUBLIC_API_URL}api/v1/users/${session?.user.id}`,
          {
            firstName: inputs.firstName,
            lastName: inputs.lastName,
          }
        )
        .then((response) => {
          console.log(response);
          axios
            .get("/api/auth/session?update", { withCredentials: true })
            .then(() => {
              setSending(false);
              window.location.reload();
            });
        })
        .catch((error) => {
          console.log(error);
          setSending(false);
        });
    }
  }

  return (
    <BodyStyles alternate>
      <div className="primary">
        <h2>Update User</h2>
        {status !== "loading" && (
          <>
            <p>{session?.user?.email}</p>
            {session?.user?.customerId && <p>customer</p>}
            {session?.user?.providerId && <p>provider</p>}
            <p>
              {session?.user?.customerId && !customerPaymentMethods && (
                <Link href="/account/customer/addcard" passHref legacyBehavior>
                  <ButtonStyles disabled primary>
                    Add a Card
                  </ButtonStyles>
                </Link>
              )}
              {session?.user?.customerId && customerPaymentMethods && (
                <>
                  <ButtonStyles
                    onClick={() => {
                      axios.put(
                        `${process.env.NEXT_PUBLIC_API_URL}api/v1/customers/${session.user.customerId}/detachCreditCard`
                      );
                    }}
                  >
                    Detach Card {customerPaymentMethods.last4}
                  </ButtonStyles>
                </>
              )}
            </p>
            <div className="flex-container">
              {!session?.user.customerId && !session?.user?.providerId && (
                <Link href="/account/customer/onboard" passHref legacyBehavior>
                  <ButtonStyles>Become a Customer</ButtonStyles>
                </Link>
              )}

              {!session?.user.providerId && !session?.user?.customerId && (
                <ButtonStyles
                  onClick={async () => {
                    axios
                      .post(
                        `${process.env.NEXT_PUBLIC_API_URL}api/v1/providers`,
                        { UserId: session?.user.id }
                      )
                      .then((response) => {
                        console.log(response);
                        console.log(response.data.data.accountLink.url);
                        window.location.assign(
                          response.data.data.accountLink.url
                        );
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  }}
                  primary
                >
                  Become a Provider
                </ButtonStyles>
              )}
            </div>
          </>
        )}
      </div>
      <div className="secondary">
        <h3>Personal info</h3>
        <FormStyles onSubmit={handleUpdate}>
          <fieldset disabled={sending}>
            <div style={{ paddingBottom: 32 }}>
              {selectedFile && (
                <Image
                  width="200"
                  height="200"
                  src={URL.createObjectURL(selectedFile)}
                  alt="Job Photo"
                />
              )}
            </div>
            <input
              type="file"
              id="photo"
              name="photo"
              onChange={handleFileChange}
            />

            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="first name"
              value={inputs.firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="last name"
              value={inputs.lastName}
              onChange={handleChange}
            />
            <ButtonStyles disabled={sending} primary fullWidth>
              Update user
            </ButtonStyles>
          </fieldset>
        </FormStyles>
      </div>
    </BodyStyles>
  );
}

export default AccountPage;
