// @flow
import React from "react";
import styled from "../../../lib/styled-components";
import Head from "next/head";
import PrimaryButton from "../../../../kauri-components/components/Button/PrimaryButton";
import {
  Title2,
  BodyArticle,
} from "../../../../kauri-components/components/Typography";

import type { RegisterActionPayload } from "./Module";
import type { ShowNotificationPayload } from "../../../lib/Module";
import { menuHeaderHeight } from "../Navbar/View";
import { footerHeight } from "../StyledFooter/View";

const Container = styled.div`
  background: ${props => props.theme.bgPrimary};
  color: white;
  min-height: calc(100vh - ${menuHeaderHeight + footerHeight}px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  & > * {
    margin: ${props => props.theme.space[1]}px;
  }
  & #mc_embed_signup {
    width: 400px;
    color: ${props => props.theme.primaryTextColor};
    padding: ${props => props.theme.space[2]}px;
    border-radius: 4px;
    margin-top: ${props => props.theme.space[2]}px;
  }
`;

const Image = styled.img`
  width: 100px;
  height: 91px;
  margin: ${props => props.theme.space[2]}px;
`;

const Web3Unavailable = () => (
  <LoginContainer>
    <Title2 color="white">Web3 Sign in</Title2>
    <BodyArticle color="white">
      You need the MetaMask extension to use Kauri. (MetaMask supports Chrome,
      Firefox, Opera)
    </BodyArticle>
    <Image src="/static/images/metamask/avatar.png" />
    <a href="https://metamask.io" target="_blank">
      https://metamask.io
    </a>
    <div>
      Here for the content? Sign up for a newsletter below and receive the
      latest Web3 tutorials, project announcements, and articles every 2 weeks!
    </div>
    <link
      href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css"
      rel="stylesheet"
      type="text/css"
    />
    <style
      type="text/css"
      dangerouslySetInnerHTML={{
        __html: "	#mc_embed_signup{background:#fff; clear:left; font:14px Helvetica,Arial,sans-serif; }",
      }}
    />
    <div id="mc_embed_signup">
      <form
        action="https://kauri.us17.list-manage.com/subscribe/post?u=e46233ccfd6bb938ab7cbb5a3&amp;id=f49f81a2a9"
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        className="validate"
        target="_blank"
        noValidate
      >
        <div id="mc_embed_signup_scroll">
          <div className="indicates-required">
            <span className="asterisk">*</span> indicates required
          </div>
          <div className="mc-field-group">
            <label htmlFor="mce-EMAIL">
              Email Address <span className="asterisk">*</span>
            </label>
            <input
              type="email"
              name="EMAIL"
              className="required email"
              id="mce-EMAIL"
            />
          </div>
          <div id="mce-responses" className="clear">
            <div
              className="response"
              id="mce-error-response"
              style={{ display: "none" }}
            />
            <div
              className="response"
              id="mce-success-response"
              style={{ display: "none" }}
            />
          </div>
          <div
            style={{ position: "absolute", left: "-5000px" }}
            aria-hidden="true"
          >
            <input
              type="text"
              name="b_e46233ccfd6bb938ab7cbb5a3_f49f81a2a9"
              tabIndex="-1"
              value=""
            />
          </div>
          <div className="clear">
            <input
              type="submit"
              value="Subscribe"
              name="subscribe"
              id="mc-embedded-subscribe"
              className="button"
            />
          </div>
        </div>
      </form>
    </div>
    <script
      type="text/javascript"
      src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"
    />
    <script
      type="text/javascript"
      dangerouslySetInnerHTML={{
        __html: "(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';}(jQuery));var $mcj = jQuery.noConflict(true);",
      }}
    />
  </LoginContainer>
);

class LoginForm extends React.Component<{
  handleSubmit: (SyntheticEvent<HTMLButtonElement>) => void,
  getFieldDecorator: any,
  type?: string,
}> {
  handleKeyPress = e => {
    if (e.key === "Enter") {
      this.props.handleSubmit(e);
    }
  };

  render () {

    return (
      <LoginContainer>
        <Title2 color="white">Web3 Sign in</Title2>
        <BodyArticle color="white">
          Sign in using Web3 enabled provider. (MetaMask, Status, Coinbase
          Wallet)
        </BodyArticle>
        <PrimaryButton
          type="submit"
          onClick={() => this.props.handleSubmit()}
        >
          SIGN IN
        </PrimaryButton>
      </LoginContainer>
    );
  }
}

type Props = {
  form: any,
  registerAction: (payload: RegisterActionPayload, callback: any) => void,
  showNotificationAction: ShowNotificationPayload => void,
};

class LoginFormContainer extends React.Component<Props> {
  render () {
    if (global.window && !global.window.web3) {
      return <Web3Unavailable />;
    } else if (global.window && global.window.web3) {
      return (
        <Container>
          <Head>
            <title>Kauri - Login</title>
          </Head>
          <LoginForm {...this.props} type="register" />
        </Container>
      );
    } else {
      return null;
    }
  }
}

export default LoginFormContainer;
