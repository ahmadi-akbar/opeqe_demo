import React from 'react';
import cn from "classnames";

import List from '@material-ui/core/List';


import CustomListTextField from "../../CustomListTextField";

import InstructionGroupHeader from "./InstructionGroupHeader";

export default function(props) {
    const {
        className,
        style,
        onChange,
        multiline = true,
        placeholder,
        headerAction,
        highlighted,
        hidden,
        header,
        subHeader,
        ...others
    } = props;

    return ( <
        List className = {
            cn(
                "text-area-option-l2",
                className,
            )
        }
        style = {
            {
                ...style
            }
        } { ...others
        } >
        <
        InstructionGroupHeader action = {
            headerAction
        }
        highlighted = {
            highlighted
        }
        hidden = {
            hidden
        }
        primary = {
            header
        }
        secondary = {
            subHeader
        }
        /> <
        CustomListTextField textProps = {
            {
                placeholder: placeholder,
                onChange: onChange,
                multiline: multiline,
            }
        }
        noIcon /
        >
        <
        /List>
    );
}