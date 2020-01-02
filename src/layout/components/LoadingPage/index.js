import React from "react";
import cn from "classnames";

import Grid from "@material-ui/core/Grid";

// import CircularProgress from "../CircularProgress";
import Logo from "../Logo";

import isMobile from "../../../functions/isMobile";

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
    <Grid
      className={cn(
        "loading-page-l1",
        {
          mobile: isMobile
        },
        className
      )}
      style={{
        ...style
      }}
      container
      justify="center"
      alignItems="center"
      {...others}
    >
      <Logo className="progress" width="200" />
    </Grid>
  );
}
