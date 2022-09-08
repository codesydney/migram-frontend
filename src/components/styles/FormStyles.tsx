import styled from "styled-components";

const FormStyles = styled.form`
  h4 {
    margin-bottom: 16px;
  }

  input[type="email"],
  input[type="password"],
  input[type="text"],
  input[type="number"],
  input[type="date"],
  input[type="time"],
  input[type="tel"],
  select {
    height: 56px;
    width: 100%;
    background: var(--lightGrey);
    font-size: 1.5rem;
    font-weight: 250;
    padding: 12px;
    margin-bottom: 64px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border: 0px;
    border-bottom: 2px solid var(--grey);
  }
  input[type="file"] {
    display: none;
  }
  .image-container {
  }
  .custom-file-upload {
    display: flex;
    align-items: center;
    border-radius: 5px;
    width: 48px;
    height: 48px;
    padding: 10px;
    display: float;
    border: 1px solid var(--grey);
    cursor: pointer;
  }
  .image-upload {
    display: flex;
    gap: 12px;
    border-radius: 5px;
  }
  textarea {
    font-family: "SonnyVol2", --apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
    width: 100%;
    padding: 12px;
    font-size: 1.5rem;
    font-weight: 350;
    border: solid 2px var(--grey);
    border-radius: var(--border-radius);
    margin-bottom: 3rem;
    resize: vertical;
  }
  input[type="file"] {
    height: 48px;
    font-size: 1.5rem;
    font-weight: 200;
    width: 100%;
    margin-bottom: 3rem;
  }
  input[type="radio"] {
    width: 24px;
    height: 24px;
    margin-left: 0px;
  }
  .radio {
    display: flex;
    gap: 32px;
    margin-bottom: 32px;
    align-items: center;
    font-weight: 300;
  }
  .icon-input {
    display: flex;
  }
  .input-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 64px;
  }
  .input-container input,
  .input-container textarea {
    margin-bottom: 8px;
  }
  .input-container .error {
    background-color: #f8d7da;
    border: 2px solid #f5c2c7;
  }
  .char-count {
    align-self: end;
    font-size: 1rem;
    background: var(--focus);
    padding: 0.5rem;
    margin: -28px 20px 8px 0;
    color: #fff;
    border-radius: 3px;
  }
  .icon {
    height: 56px;
    width: 56px;
    padding: 16px 0px 16px 0;
  }

  fieldset {
    border: 0;
    margin: 0;
    padding: 0;
    padding-top: 30px;

    padding-bottom: 24px;
  }
`;

export default FormStyles;
