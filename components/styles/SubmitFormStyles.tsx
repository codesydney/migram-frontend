import styled from "styled-components";

const FormStyles = styled.div`
  .manage-task {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    padding-bottom: 24px;
  }
  .row {
    display: flex;
    gap: 32px;
    margin-bottom: 32px;
    align-items: center;
    font-weight: 200;
  }
  .icon {
    flex-basis: 48px;
    width: 48px;
    height: 48px;
    min-width: 48px;
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
