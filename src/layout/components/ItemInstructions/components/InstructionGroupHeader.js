import React from 'react';
import cn from "classnames";

import CustomListItem from "../../CustomListItem";

export default function({
    className,
    style,
    primary,
    secondary,
    action,
    highlighted,
    hidden,
    ...others
}) {


    return ( <
        CustomListItem className = {
            cn(
                "instruction-group-header-l2",
                className,
            )
        }
        style = {
            {
                ...style
            }
        }
        ContainerProps = {
            {
                className: "header container",
            }
        }
        actionProps = {
            {
                className: "list-item-action"
            }
        }
        action = {
            action &&
            <
            span
            className = {
                cn(
                    "action", {
                        'highlight': highlighted
                    }, {
                        'hidden': hidden
                    },
                )
            } >
            {
                action
            } <
            /span>   
        }
        noIcon { ...others
        } >
        <
        div className = "text" >
        <
        span > {
            primary
        } <
        /span> {
            secondary &&
                <
                span > {
                    secondary
                } <
                /span>
        } <
        /div> <
        /CustomListItem>
    );
}