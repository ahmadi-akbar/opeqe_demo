import React, { useState } from "react";
import cn from "classnames";

// import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
// import AddIcon from "@material-ui/icons/Add";
// import RemoveIcon from "@material-ui/icons/Remove";

import Button from "../../DefaultButton";
import BottomFixedContainer from "../../BottomFixedContainer";
import NumberSelect from "../../NumberSelect";

import currencify from "../../../../functions/currencify";

export default function({
  className,
  style,
  totalPrice = 0,
  onClick,
  full,
  waiting,
  disabled,
  max,
  ...others
}) {
  const [count, setCount] = useState(1);

  function increment() {
    if (max && count === max) {
      return;
    }
    setCount(count + 1);
  }

  function decrement() {
    if (count === 1) {
      return;
    }
    setCount(count - 1);
  }

  return (
    <BottomFixedContainer
      component={Grid}
      className={cn(
        "submit-l2",
        {
          full: full
        },
        className
      )}
      style={{
        ...style
      }}
      container
      justify="space-around"
      alignItems="center"
      {...others}
    >
      <NumberSelect
        theme="gray"
        onDecrement={decrement}
        onIncrement={increment}
        value={count}
        decDisabled={disabled || count === 1}
        incDisabled={disabled || (max && count === max)}
      />{" "}
      <Button
        containerProps={{
          className: "add"
        }}
        onClick={e => onClick(count)}
        waiting={waiting}
        disabled={disabled}
      >
        Add {currencify(totalPrice * count)}{" "}
      </Button>{" "}
    </BottomFixedContainer>
  );
}
