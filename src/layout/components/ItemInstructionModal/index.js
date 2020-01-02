import React, { useState, useRef, useEffect } from "react";
import cn from "classnames";

import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import ScrollableContainer from "../ScrollableContainer";
import ItemInstructions from "../ItemInstructions";

export default function(props) {
  const { className, style, instructionsProps, onClose, ...others } = props;

  const [ref, setRef] = useState();

  const containerRef = useRef(null);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => setRef(containerRef.current));

  return (
    <Dialog
      scroll="paper"
      className={cn("item-instruction-modal-l1", className)}
      style={{
        ...style
      }}
      PaperProps={{
        className: "paper"
      }}
      fullWidth
      fullScreen={fullScreen}
      onClose={onClose}
      {...others}
    >
      <ScrollableContainer className="container" forwardRef={containerRef}>
        <ItemInstructions
          container={containerRef.current}
          onClose={onClose}
          {...instructionsProps}
        />{" "}
      </ScrollableContainer>{" "}
    </Dialog>
  );
}
