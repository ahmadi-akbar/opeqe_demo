import React, { useEffect, useRef, memo } from "react";
import cn from "classnames";

import List from "@material-ui/core/List";
import Skeleton from "@material-ui/lab/Skeleton";

import CustomListItem from "../../CustomListItem/";

import LocalCustomListItem from "./CustomListItem";
import InstructionGroupHeader from "./InstructionGroupHeader";
import RadioGroup from "./RadioGroup";
import CheckBoxGroup from "./CheckBoxGroup";

export function Index({
  className,
  style,
  action,
  highlighted,
  hidden,
  disabled,
  primary,
  secondary,
  type,
  items,
  selected,
  onChange,
  onRef,
  skeleton,
  ...others
}) {
  const optionRef = useRef(null);

  useEffect(() => {
    if (optionRef.current !== null) {
      onRef(optionRef);
    }
  }, [optionRef.current]);

  if (skeleton) {
    return <OptionSelectSkeleton />;
  }

  return (
    <div
      className={cn("option-select-l2", className)}
      style={{
        ...style
      }}
      ref={optionRef}
      {...others}
    >
      <InstructionGroupHeader
        action={action}
        highlighted={highlighted}
        hidden={hidden}
        primary={primary}
        secondary={secondary}
      />
      {type === "radio" ? (
        <RadioGroup
          items={items}
          onChange={onChange}
          disabled={disabled}
          selected={selected}
        />
      ) : (
        <CheckBoxGroup
          items={items}
          onChange={onChange}
          disabled={disabled}
          selected={selected}
        />
      )}{" "}
    </div>
  );
}

function createSkeletonOptions() {
  return [{}, {}, {}, {}, {}, {}];
}

function OptionSelectSkeleton() {
  const textStyle = {
    margin: "5px 10px"
  };

  return (
    <List className="option-select-l2">
      <CustomListItem
        ContainerProps={{
          className: "header container"
        }}
        action={<Skeleton className="action" variant="text" width={"60px"} />}
        noIcon
        className="header"
      >
        <div className="text">
          <Skeleton style={textStyle} variant="text" width={"200px"} />{" "}
          <Skeleton style={textStyle} variant="text" width={"100px"} />{" "}
        </div>{" "}
      </CustomListItem>{" "}
      {createSkeletonOptions().map((item, index) => (
        <LocalCustomListItem key={index} skeleton={true} />
      ))}{" "}
    </List>
  );
}

export default memo(Index, (prev, next) => {
  return (
    prev.selected === next.selected &&
    prev.highlighted === next.highlighted &&
    prev.hidden === next.hidden &&
    prev.disabled === next.disabled
  );
});
