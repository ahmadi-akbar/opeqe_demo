import React, { useState, useEffect } from "react";
import cn from "classnames";

import isMobile from "../../../functions/isMobile";
import {
  ITEM_INSTRUCTIONS_URL_PARAMS,
  HOME_PAGE_URL
} from "../../config/routing";
import ItemInstructions from "../ItemInstructions";

export default function(props) {
  const {
    className,
    style,
    history,
    location,
    match,
    staticContext, // only to exclude
    ...others
  } = props;

  const [itemId, setItemId] = useState(null);

  useEffect(() => {
    const { id, cuisine, meal, course } = match.params;

    if (!isMobile && id && cuisine && meal && course) {
      const homePageVersionURL = getItemHref({
        id,
        cuisine,
        course,
        meal
      });
      history.replace(`/${homePageVersionURL}`);
    }

    if (id) {
      setItemId(id);
    } else {
      setItemId(null);
    }
  }, [match.params]);

  const handleClose = () => {
    history.push(`/${HOME_PAGE_URL()}`);
  };

  return (
    <div
      className={cn("item-instruction-page-l1", className)}
      style={{
        ...style
      }}
      {...others}
    >
      <ItemInstructions
        itemId={itemId}
        container={window}
        onClose={handleClose}
        bodyPaddingTopSub={80}
        full
      />
    </div>
  );
}

const getItemHref = ({ id, cuisine, course, meal }) => {
  return `${HOME_PAGE_URL()}?${ITEM_INSTRUCTIONS_URL_PARAMS({
    id: id,
    cuisine: cuisine,
    course: course,
    meal: meal
  })}`;
};
