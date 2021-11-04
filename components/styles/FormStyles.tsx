import styled from "styled-components";

const FormStyles = styled.form`
  input[type="email"],
  input[type="password"],
  input[type="text"],
  input[type="number"],
  input[type="date"],
  input[type="time"],
  input[type="tel"] {
    height: 48px;
    font-size: 1.5rem;
    font-weight: 250;
    padding: 12px;
    width: 100%;
    margin-bottom: 3rem;
    border: solid 2px var(--grey);
    border-radius: var(--border-radius);
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
  .icon {
    width: 64px;
    height: 64px;
    border-radius: 5px;
    background: var(--grey);
  }
  fieldset {
    border: 0;
    margin: 0;
    padding: 0;
    padding-bottom: 24px;
  }
`;

export default FormStyles;
