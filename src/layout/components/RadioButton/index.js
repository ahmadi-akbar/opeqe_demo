import React from 'react';
import cn from "classnames";

import Radio from '@material-ui/core/Radio';
import {
    makeStyles
} from '@material-ui/core/styles';

import setColorAlpha from "../../../functions/setColorAlpha";

const useStyles = makeStyles({
    control: props => ({
        color: `${props.color}`,
        '&:hover': {
            background: `${props.hoverBG}`,
        },
    }),
});

export default function(props) {
    const {
        className,
        style: {
            color,
            hoverBG,
            ...style
        } = {},
        location,
        match,
        history,
        staticContext,
        ...others
    } = props;

    const classes = useStyles({
        color: color,
        hoverBG: setColorAlpha(color, 0.15),
    });

    return ( <
        Radio className = {
            cn(
                'radio-button-l1',
                'control',
                classes.control,
                className
            )
        }
        style = {
            {
                ...style
            }
        }
        color = "default" { ...others
        }
        />
    );
}