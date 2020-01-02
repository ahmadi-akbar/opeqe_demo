import React from "react";
import cn from "classnames";

import Item from "./components/Item";

export default function(props) {
  const {
    className,
    style,
    items = [],
    onFav,
    onDel,
    noItemsText,
    noOptions,
    ...others
  } = props;

  return (
    <div
      className={cn("item-receipt-l1", className)}
      style={{
        ...style
      }}
      {...others}
    >
      {items.length ? (
        items.map((item, index) => {
          return (
            <Item
              key={item.key}
              index={index}
              quantity={item.quantity}
              onFav={() => onFav(item.key)}
              onDel={() => onDel(item.key)}
              noOptions={noOptions}
              {...item}
            />
          );
        })
      ) : (
        <div className="no-item"> {noItemsText} </div>
      )}{" "}
    </div>
  );
}
