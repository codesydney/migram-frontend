import styled from "styled-components";

const FormStyles = styled.div`
  .section-1 {
    border-bottom: 1px solid var(--grey);
    padding-top: 24px;
  }
  .section-2 {
    border-bottom: 1px solid var(--grey);
    padding-top: 24px;
  }
  .section-3 {
    padding-top: 24px;
    padding-bottom: 24px;
  }
  .field {
    padding: 0;
    .title {
      font-size: 16px;
      color: var(--grey);
      margin-bottom: 8px;
    }
    .user-input {
      display: flex;
      font-weight: 300;
    }
    .icon {
      height: 56px;
      min-width: 56px;
    }
  }

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

  fieldset {
    border: 0;
    margin: 0;
    padding: 0;
    padding-bottom: 24px;
  }
`;

export default FormStyles;
