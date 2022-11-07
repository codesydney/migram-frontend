import styled, { css } from "styled-components";

interface OfferProps extends React.ComponentPropsWithoutRef<"div"> {
  selected: any;
}

const OfferStyles = styled.div<OfferProps>`
  width: 432px;
  height: 200px;
  border-radius: 16px;
  border: 1px solid var(--grey);
  ${(props) =>
    props.selected &&
    css`
      border: 2px solid var(--focus);
    `}
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  :hover {
    cursor: pointer;
  }

  .header {
    padding: 16px;
    display: flex;
    gap: 8px;
    align-items: center;
    text-transform: lowercase;
    .icon {
      width: 24px;
      height: 24px;
      background-color: var(--grey);
      border-radius: 5px;
    }
    .category {
      color: var(--grey);
      font-size: 12px;
      font-weight: bold;
    }
  }
  .body {
    padding: 0 16px 16px 16px;

    p {
      font-size: 16px;
      padding: 0;
      margin: 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      -webkit-box-pack: end;
      overflow: hidden;
    }
  }
  .footer {
    padding: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    height: 100%;
    background-color: var(--lightGrey);
    ${(props) =>
      props.selected &&
      css`
        background-color: var(--focus20);
      `}
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    border-left: 1px solid var(--lightGrey);
    border-bottom: 1px solid var(--lightGrey);
    border-right: 1px solid var(--lightGrey);
    .price {
      display: flex;
      font-size: 24px;
      font-weight: bold;
      padding-top: 8px;
      gap: 8px;
    }
  }
`;

export default OfferStyles;
