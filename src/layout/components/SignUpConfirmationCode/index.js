import React, { useState, useRef } from "react";
import cn from "classnames";

import Button from "../DefaultButton";
import BottomFixedContainer from "../BottomFixedContainer";
import CircularProgress from "../CircularProgress";

import CodeInput from "../CodeInput";
import useTimer from "../../hooks/useTimer/";

import useReduxCallback, { statusCodes } from "../../hooks/useReduxCallback";

export default function({
  target,
  title,
  deadline,
  className,
  loading,
  resendLoading,
  resendReduxStatus,
  onResend,
  breakpoints,
  tooLateTexts,
  tooLateDeadline,
  onSubmit
}) {
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [resent, setResent] = useState(0);

  useReduxCallback(resendDone, resendFailed, resendReduxStatus);

  const { seconds, reset: resetTimer } = useTimer({
    from: deadline
  });

  const codeInputRef = useRef(null);

  function onChange(digits) {
    setDigits(digits);
  }

  function check(event) {
    if (onSubmit) {
      onSubmit(digits);
    }
  }

  function validate() {
    return (
      digits.reduce((total, digit) => (total += digit !== "" && 1), 0) !== 4
    );
  }

  function resendDone() {
    resetTimer();
    setResent(resent + 1);
  }

  function resendFailed() {
    console.log("Failed Code Resend");
  }

  function handleResend() {
    if (onResend) {
      onResend(resendDone, resendFailed);
    }
  }

  const tooLateText = tooLateTexts[resent < 3 ? resent : 2];

  const isResendLoading = resendReduxStatus
    ? resendReduxStatus === statusCodes.pending
    : resendLoading;

  return (
    <div className={cn("sign-up-confirmation-code-l1", className)}>
      <div className="container">
        <div className="title"> {title} </div>{" "}
        <div
          className="sub-title"
          style={{
            opacity: seconds <= tooLateDeadline && !isResendLoading ? 1 : 0
          }}
        >
          {tooLateText}{" "}
        </div>{" "}
        <CodeInput
          className="input"
          fieldClassName="digit"
          onChange={onChange}
          ref={codeInputRef}
        />{" "}
        <BottomFixedContainer breakpoints={breakpoints}>
          <Button
            className="button"
            containerProps={{
              className: "button-container"
            }}
            waiting={loading}
            type="submit"
            round
            block
            disabled={validate()}
            onClick={check}
          >
            Next{" "}
          </Button>{" "}
        </BottomFixedContainer>{" "}
        <div className="timer">
          {" "}
          {seconds === 0 && resent < 2 ? (
            <span className="resend" onClick={handleResend}>
              {isResendLoading ? (
                <CircularProgress />
              ) : (
                "I didn't recieve the confirmation code"
              )}{" "}
            </span>
          ) : (
            <div
              className="remaining"
              style={{
                opacity: seconds > 0 ? "1" : "0"
              }}
            >
              {resent < 2 ? (
                <>
                  Resend code in: <span className="seconds"> {seconds} </span>{" "}
                </>
              ) : (
                <>
                  Time remaining: <span className="seconds"> {seconds} </span>{" "}
                </>
              )}{" "}
            </div>
          )}{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
