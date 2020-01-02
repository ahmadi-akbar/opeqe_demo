import React, { useState, useEffect } from "react";
import cn from "classnames";

import Header from "./Header";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Skeleton from "@material-ui/lab/Skeleton";

import ItemImage from "../../ItemImage";

import { CONFIG_RTL } from "../../../config/layout/";

export default function({
  className,
  style,
  compact,
  initialHeight,
  itemData,
  skeleton,
  full,
  container,
  onClose,
  feeLabel,
  ...others
}) {
  const headerOverlay = 40;

  const [imageHeight, setImageHeight] = useState(initialHeight);

  useEffect(() => {
    if (!container) {
      return;
    }
    scrollHandler();
    container.addEventListener("scroll", scrollHandler);
    return () => container.removeEventListener("scroll", scrollHandler);
  }, [container]);

  function scrollHandler() {
    const yOffset =
      container.scrollTop !== undefined
        ? container.scrollTop
        : window.pageYOffset;
    const newHeight = initialHeight - yOffset;
    setImageHeight(newHeight < 0 ? 0 : newHeight);
  }

  const translate = {
    x: (CONFIG_RTL ? 1 : -1) * 50,
    y: imageHeight > headerOverlay ? -headerOverlay : -imageHeight
  };

  return (
    <div
      className={cn(
        "image-l2",
        {
          full: full
        },
        className
      )}
      style={{
        height: `${imageHeight}px`,
        ...style
      }}
      {...others}
    >
      <IconButton className="close" onClick={onClose}>
        <CloseIcon />
      </IconButton>{" "}
      {skeleton ? (
        <Skeleton component="img" className="item-control" variant="rect" />
      ) : (
        <ItemImage src={itemData.image} alt={itemData.title} size="large" />
      )}{" "}
      <Header
        compact={imageHeight < headerOverlay + 10}
        style={{
          transform: `translate(${translate.x}%, ${translate.y}px)`
        }}
        skeleton={skeleton}
        title={itemData.title}
        description={itemData.description}
        price={itemData.price}
        timeEstimate={itemData.timeEstimate}
        feeLabel={feeLabel}
      />{" "}
    </div>
  );
}
