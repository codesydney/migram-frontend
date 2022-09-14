import styled, { createGlobalStyle } from "styled-components";
import { Header } from "./Header";

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'SonnyVol2';
    src: url('/static/SonnyVol2-Regular.ttf')
    format('tff');
    font-weight: normal;
    font-style: normal;
  }
  html {
    --white: #ffffff;
    --black: #000000;
    --grey: #AAAAAA;
    --lightGrey: #F0F0F0;
    --darkGrey: #5a5a5a;
    --focus: #3C1DFD;
    --focus20: #3C1DFD20;
    --maxWidth: 1920px;
    --breakpoint-desktop: 768px;
    --bs: 0 12px 24px 0 rgba(0,0,0,0.09);
    --side: 5vw;
    --border-radius: 5px;
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    font-family: 'SonnyVol2',--apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding: 0;
    margin: 0;
    font-size: 24px;
    letter-spacing: 0.05em;
  }
  h1,h2,h3,h4,h5,h6 {
    margin-top: 0;
  }
  h2 {
    font-size: 48px;
  }
  h3 {
    font-size: 48px;
    font-weight: 200;
    letter-spacing: 0.05em;
  }
  p {
    font-weight: 300;
  }
  a {
    text-decoration: none;
    color: var(--black);
  }
  button {
    font-family: 'SonnyVol2',--apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    text-transform: lowercase;
    letter-spacing: 0.05em;
    font-size: 24px;
  }
  a:hover, button:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const InnerStyles = styled.div`
  max-width: var(--maxWidth);
`;

const Layout = ({ children }: any) => {
  return (
    <div>
      <GlobalStyles />
      <Header />
      <InnerStyles>{children}</InnerStyles>
    </div>
  );
};

export default Layout;
