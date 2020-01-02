import React, { useMemo } from "react";
import cn from "classnames";

import ImageLoader from "../ImageLoader";

import useBreakpoint from "../../hooks/useBreakpoint";

export default function(props) {
  const { className, style, draggable = false, size, src, ...others } = props;

  const currentBreakpoint = useBreakpoint();

  let finalSize;
  if (size) {
    finalSize = size;
  } else {
    if (currentBreakpoint === "xs") {
      finalSize = "small";
    } else {
      finalSize = "large";
    }
  }

  const finalSrc = useMemo(() =>
    finalSize === "small" ? src : src.replace("/s/", "/l/")
  );

  return (
    <ImageLoader
      className={cn("item-image-l1", className)}
      style={{
        ...style
      }}
      draggable={draggable}
      src={finalSrc}
      {...others}
    />
  );
}
