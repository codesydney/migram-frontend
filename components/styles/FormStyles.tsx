import styled from "styled-components";

const FormStyles = styled.form`
  input[type="email"],
  input[type="password"],
  input[type="text"] {
    height: 48px;
    font-size: 1.5rem;
    font-weight: 250;
    padding: 12px;
    width: 100%;
    margin-bottom: 3rem;
    border: solid 2px var(--grey);
    border-radius: var(--border-radius);
  }
  input[type="file"] {
    height: 48px;
    font-size: 1.5rem;
    font-weight: 200;
    width: 100%;
    margin-bottom: 3rem;
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
