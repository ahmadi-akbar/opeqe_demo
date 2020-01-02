import React from "react";
import cn from "classnames";

import AccessAlarmsIcon from "@material-ui/icons/AccessAlarms";
import Skeleton from "@material-ui/lab/Skeleton";

import currencify from "../../../../functions/currencify";

export default function({
  className,
  style,
  compact,
  title,
  description,
  price,
  timeEstimate,
  feeLabel,
  skeleton,
  ...others
}) {
  if (skeleton) {
    return renderSkeleton({
      compact,
      style
    });
  }

  return (
    <div
      className={cn(
        "header-l2",
        {
          compact: compact
        },
        className
      )}
      style={{
        ...style
      }}
      {...others}
    >
      <span className="title"> {title} </span>{" "}
      <span className="sub-title"> {description} </span>{" "}
      <span className="extras">
        <span>
          <AccessAlarmsIcon className="icon" />{" "}
          {timeEstimate.length && timeEstimate.join("-")}
          Mins{" "}
        </span>{" "}
        <span className={cn("green")}>{feeLabel} </span>{" "}
        <span className="dark"> {currencify(price)} </span>{" "}
      </span>{" "}
    </div>
  );
}

function renderSkeleton({ compact, style }) {
  const textStyle = {
    margin: "5px 10px"
  };

  const tagStyle = {
    margin: "2px"
  };

  return (
    <div
      className={cn("header-l2", {
        compact: compact
      })}
      style={{
        ...style
      }}
    >
      <Skeleton
        style={textStyle}
        className="title"
        variant="text"
        width="150px"
      />
      <Skeleton
        style={textStyle}
        className="sub-title"
        variant="text"
        width="200px"
      />
      <span className="extras">
        <Skeleton style={tagStyle} variant="text" width="80px" />
        <Skeleton style={tagStyle} variant="text" width="80px" />
        <Skeleton style={tagStyle} variant="text" width="50px" />
      </span>{" "}
    </div>
  );
}
