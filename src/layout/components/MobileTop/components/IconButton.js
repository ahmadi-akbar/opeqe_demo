import React from "react";
import cn from "classnames";
import {
    NavLink
} from "react-router-dom";

import IconButton from "@material-ui/core/IconButton";

export default props => {
    const {
        to,
        className,
        style,
        ...others
    } = props;
    return ( <
        IconButton component = {
            to && NavLink
        }
        to = {
            to
        }
        className = {
            cn("icon-button-l2", className)
        }
        style = {
            {
                ...style
            }
        } { ...others
        }
        />
    )
}