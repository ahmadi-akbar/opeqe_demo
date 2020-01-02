import React from 'react';
import cn from "classnames";

import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

export default function(props) {
    const {
        className,
        style,
        value,
        disabled,
        onDecrement,
        onIncrement,
        decDisabled,
        incDisabled,
        theme = "dark",
        ...others
    } = props;


    return ( <
        div className = {
            cn(
                'number-select-l1',
                `theme-${theme}`,
                className
            )
        }
        style = {
            {
                ...style
            }
        } { ...others
        } >
        <
        IconButton className = "button"
        onClick = {
            onDecrement
        }
        disabled = {
            decDisabled
        } >
        <
        RemoveIcon className = "icon" / >
        <
        /IconButton>                 <
        span className = "text" > {
            value
        } <
        /span> <
        IconButton className = "button"
        onClick = {
            onIncrement
        }
        disabled = {
            incDisabled
        } >
        <
        AddIcon className = "icon" / >
        <
        /IconButton> <
        /div>
    );
}