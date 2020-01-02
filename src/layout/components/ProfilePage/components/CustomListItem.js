import React from "react";
import cn from "classnames";

import CustomListItem from "../../CustomListItem";

export default function(props) {
    const {
        textProps,
        className,
        style,
        text,
        iconProps,
        ...others
    } = props;

    return ( <
        CustomListItem button style = {
            {
                ...style
            }
        }
        className = {
            cn("custom-list-item-l2", className)
        }
        iconProps = {
            {
                ...iconProps,
                className: cn(
                    "icon",
                    iconProps && iconProps.className
                )
            }
        } { ...others
        } >
        <
        span { ...textProps
        }
        className = {
            cn("text", textProps && textProps.className)
        } >
        {
            text
        } <
        /span> <
        /CustomListItem>
    );
}