import React from "react";
import cn from "classnames";

export default function(props) {
  const {
    className,
    style,
    location,
    match,
    history,
    staticContext,
    ...others
  } = props;

  return (
    <div
      className={cn("error-page-l1", className)}
      style={{
        ...style
      }}
      {...others}
    >
      Error page(In progress)...
    </div>
  );
}
