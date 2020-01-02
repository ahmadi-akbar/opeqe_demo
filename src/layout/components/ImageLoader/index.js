import React from "react";
import cn from "classnames";
import LazyLoad from "react-lazyload";

export default function(props) {
  const { containerProps, ...others } = props;

  return (
    <LazyLoad className={cn("image-loader-l1")} {...containerProps}>
      <img {...others} alt="" />{" "}
    </LazyLoad>
  );
}
