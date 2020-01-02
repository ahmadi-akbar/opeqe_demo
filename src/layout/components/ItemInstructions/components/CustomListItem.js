import React from 'react';
import cn from "classnames";

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Skeleton from '@material-ui/lab/Skeleton';

import CustomListItem from '../../CustomListItem/';

export default function({
    className,
    style,
    Control,
    primary,
    secondary,
    action,
    controlProps,
    formControlProps,
    skeleton,
    ...others
}) {

    if (skeleton) {
        return renderSkeleton();
    }

    return ( <
        CustomListItem className = {
            cn(
                "custom-list-item-l2",
                className,
            )
        }
        style = {
            {
                ...style
            }
        }
        action = {
            action && action
        }
        actionProps = {
            {
                className: "list-item-action"
            }
        }
        noIcon noBorder { ...others
        } >
        <
        FormControlLabel className = "label"
        control = { <
            Control
            className = {
                cn(
                    "item-control", {
                        'disabled': controlProps.disabled
                    }
                )
            } { ...controlProps
            }
            />
        }
        label = { <
            div className = "item-text" >
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
            /div>
        } { ...formControlProps
        }
        />             <
        /CustomListItem>
    );
}



function renderSkeleton() {
    const textStyle = {
        margin: "5px 10px",
    }

    return ( <
        CustomListItem className = {
            cn(
                "custom-list-item-l2",
            )
        }
        action = { < Skeleton variant = "text"
            width = {
                '40px'
            }
            />}
            noIcon >
            <
            FormControlLabel
            control = { <
                Skeleton className = "item-control"
                variant = "rect"
                width = {
                    '20px'
                }
                height = {
                    '20px'
                }
                />
            }
            label = { <
                div className = "item-text" >
                <
                Skeleton style = {
                    textStyle
                }
                variant = "text"
                width = {
                    '200px'
                }
                /> <
                Skeleton style = {
                    textStyle
                }
                variant = "text"
                width = {
                    '120px'
                }
                /> <
                /div>
            }
            />             <
            /CustomListItem>
        );
    }