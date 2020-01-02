import React, { useState, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";

import AnimatedSwitch from "../AnimatedSwitch";

import sendPasswordRecovery from "../../../store/actions/user/sendPasswordRecovery";
import selectSendPasswordRecovery from "../../../store/selectors/user/sendPasswordRecovery";
import recoverPassword from "../../../store/actions/user/recoverPassword";
import selectRecoverPassword from "../../../store/selectors/user/recoverPassword";
import checkEmail from "../../../store/actions/demo/checkEmail";
import setAccountBan from "../../../store/actions/demo/setBan";
import userSignUp from "../../../store/actions/user/userSignUp";
import userLogIn from "../../../store/actions/user/userLogIn";
import selectCheckEmail from "../../../store/selectors/demo/selectCheckEmail";
import selectUserData from "../../../store/selectors/user/selectUserData";

import checkDuplicateCode from "../../../api/user/checkDuplicateCode";
import checkIfNewUser from "../../../api/user/checkIfNewUser";

import useAsync from "../../hooks/useAsync/";

import { HOME_PAGE_URL, LOG_IN_PAGE_URL } from "../../config/routing";
import {
  storeBanCode,
  userBanCode,
  duplicateNewUser,
  duplicateExistingUser
} from "../../../config/api";

import Grid from "@material-ui/core/Grid";

import SignUpPhone from "../SignUpPhone";
import SignUpPassword from "../SignUpPassword";
import SignUpConfirmationCode from "../SignUpConfirmationCode";
import SignUpEmail from "../SignUpEmail";
import SignUpName from "../SignUpName";
import NotDemoMailNotification from "../NotDemoMailNotification";

import useReduxCallback, { statusCodes } from "../../hooks/useReduxCallback";

import isDemo from "../../../functions/isDemo";

function Index(props) {
  const {
    history,
    location,
    userSignUp,
    userLogIn,
    user: { status: userStatus },
    checkEmail,
    emailCheck: { status: emailCheckStatus },
    sendPasswordRecovery,
    sendPassRecovery: { status: sendPassRecoveryStatus },
    recoverPassword,
    passwordRecovery: { status: recoverPasswordStatus },
    setAccountBan
  } = props;

  const breakpoints = {
    xs: 11,
    sm: 8,
    md: 6,
    lg: 5,
    xl: 5
  };

  const {
    handle: checkDuplicateHandle,
    state: checkDuplicateState
  } = useAsync();
  const { handle: resendCodeHandle, state: resendCodeState } = useAsync();

  const [phone, setPhone] = useState("");
  const [code, setCode] = useState(null);
  const [email, setEmail] = useState(null);
  const [names, setNames] = useState(null);
  const [redirectTo, setRedirectTo] = useState(null);
  const [recoveryConfirmationCode, setRecoveryConfirmationCode] = useState(
    null
  );

  const [showNotDemo, setShowNotDemo] = useState(false);
  useReduxCallback(emailCheckDone, emailCheckFailed, emailCheckStatus);
  useReduxCallback(recoverPassDone, null, recoverPasswordStatus);

  useEffect(() => {
    if (location.state && location.state.from) {
      setRedirectTo(location.state.from);
    }
  }, [location.state]);

  function codeSent(status, value) {
    switch (status) {
      case duplicateExistingUser:
        history.push(`/${LOG_IN_PAGE_URL()}/pass?type=existing`);
        break;
      case duplicateNewUser:
        history.push(`/${LOG_IN_PAGE_URL()}/code`);
        break;
      case storeBanCode:
        setAccountBan("store", true);
        break;
      case userBanCode:
        setAccountBan("user", true);
        break;
      default:
        break;
    }
    setPhone(value);
  }

  function codeSubmitted(digits) {
    checkDuplicateHandle(
      checkDuplicateCode({
        phone: phoneEscaped,
        code: digits.join("")
      }),
      data => {
        setCode(digits.join(""));
        history.push(`/${LOG_IN_PAGE_URL()}/email`);
      },
      error => {
        console.error(error);
      }
    );
  }

  function emailSubmitted(email) {
    setEmail(email);
    if (isDemo) {
      checkEmail({
        email
      });
    } else {
      emailCheckDone();
    }
  }

  function emailCheckDone() {
    history.push(`/${LOG_IN_PAGE_URL()}/names`);
  }

  function emailCheckFailed() {
    setShowNotDemo(true);
  }

  function namesSubmitted(namse) {
    setNames(namse);
    history.push(`/${LOG_IN_PAGE_URL()}/pass?type=new`);
  }

  function handleSubmit(data) {
    if (data.type === "new") {
      userSignUp({
        phone: phoneEscaped,
        pass: data.pass,
        code,
        email,
        names
      });
    } else {
      userLogIn({
        phone: phoneEscaped,
        pass: data.pass
      });
    }
  }

  function resendCode(onSuccess, onFailure) {
    resendCodeHandle(
      checkIfNewUser({
        phone: phoneEscaped
      }),
      data => {
        onSuccess(data);
      },
      error => {
        onFailure(error);
      }
    );
  }

  function handleForgotPass() {
    sendPasswordRecovery({
      phone: phoneEscaped
    });
  }

  function recoveryCodeSubmitted(digits) {
    setRecoveryConfirmationCode(digits);
    history.push(`/${LOG_IN_PAGE_URL()}/pass/recovery?type=new`);
  }

  function passwordRecoverySubmit(passData) {
    recoverPassword({
      phone: phoneEscaped,
      recoveryCode: recoveryConfirmationCode.join(""),
      newPass: passData.pass
    });
  }

  function forgotPassSent() {
    history.push(`/${LOG_IN_PAGE_URL()}/pass/code`);
  }

  if (userStatus === statusCodes.fulfilled) {
    if (redirectTo) {
      return <Redirect to={redirectTo} />;
    }
    return <Redirect to={`/${HOME_PAGE_URL()}`} />;
  }

  function recoverPassDone() {
    history.push(`/${HOME_PAGE_URL()}`);
  }

  const phoneEscaped = phone.replace(/[^0-9]/gi, "");

  return (
    <>
      <NotDemoMailNotification
        open={showNotDemo}
        onClose={() => setShowNotDemo(false)}
      />{" "}
      <Grid container justify="center" className="sign-up-page-l1">
        <Grid item className="screen" {...breakpoints}>
          <AnimatedSwitch>
            <Route
              path={`/${LOG_IN_PAGE_URL()}`}
              exact
              render={routerProps => (
                <SignUpPhone
                  onCodeSent={codeSent}
                  breakpoints={breakpoints}
                  {...routerProps}
                />
              )}
            />{" "}
            <Route
              path={`/${LOG_IN_PAGE_URL()}/code`}
              render={routerProps => (
                <SignUpConfirmationCode
                  onSubmit={codeSubmitted}
                  onResend={resendCode}
                  loading={checkDuplicateState.waiting}
                  resendLoading={resendCodeState.waiting}
                  title={`Enter the 4-digit code sent to you at ${phone}`}
                  tooLateTexts={[
                    "Did you enter the correct mobile number?",
                    "Wait for the timer to receive your confirmation code.",
                    "Please try again later."
                  ]}
                  deadline={30}
                  tooLateDeadline={15}
                  breakpoints={breakpoints}
                  {...routerProps}
                />
              )}
            />{" "}
            <Route
              path={`/${LOG_IN_PAGE_URL()}/pass/code`}
              render={routerProps => (
                <SignUpConfirmationCode
                  onSubmit={recoveryCodeSubmitted}
                  onResend={handleForgotPass}
                  loading={false}
                  resendReduxStatus={sendPassRecoveryStatus}
                  title={`Enter the 4-digit code sent to you at ${phone}`}
                  tooLateTexts={[
                    "Did you enter the correct mobile number?",
                    "Wait for the timer to receive your confirmation code.",
                    "Please try again later."
                  ]}
                  deadline={4}
                  tooLateDeadline={2}
                  breakpoints={breakpoints}
                  {...routerProps}
                />
              )}
            />{" "}
            <Route
              path={`/${LOG_IN_PAGE_URL()}/pass/recovery`}
              render={routerProps => (
                <SignUpPassword
                  onSubmit={passwordRecoverySubmit}
                  waiting={recoverPasswordStatus === statusCodes.pending}
                  breakpoints={breakpoints}
                  {...routerProps}
                />
              )}
            />{" "}
            <Route
              path={`/${LOG_IN_PAGE_URL()}/email`}
              render={routerProps => (
                <SignUpEmail
                  loading={emailCheckStatus === "pending"}
                  onSubmit={emailSubmitted}
                  breakpoints={breakpoints}
                  {...routerProps}
                />
              )}
            />{" "}
            <Route
              path={`/${LOG_IN_PAGE_URL()}/names`}
              render={routerProps => (
                <SignUpName
                  onSubmit={namesSubmitted}
                  breakpoints={breakpoints}
                  {...routerProps}
                />
              )}
            />{" "}
            <Route
              path={`/${LOG_IN_PAGE_URL()}/pass`}
              render={routerProps => (
                <SignUpPassword
                  onSubmit={handleSubmit}
                  onForgotPass={handleForgotPass}
                  waiting={userStatus === statusCodes.pending}
                  breakpoints={breakpoints}
                  showForgotPass={true}
                  forgotPassStatus={sendPassRecoveryStatus}
                  onForgotPassSent={forgotPassSent}
                  {...routerProps}
                />
              )}
            />{" "}
            <Redirect to={`/${LOG_IN_PAGE_URL()}`} />{" "}
          </AnimatedSwitch>{" "}
        </Grid>{" "}
      </Grid>{" "}
    </>
  );
}

export default connect(
  state => {
    return {
      user: selectUserData(state),
      emailCheck: selectCheckEmail(state),
      sendPassRecovery: selectSendPasswordRecovery(state),
      passwordRecovery: selectRecoverPassword(state)
    };
  },
  {
    userLogIn,
    userSignUp,
    checkEmail,
    setAccountBan,
    sendPasswordRecovery,
    recoverPassword
  }
)(Index);
