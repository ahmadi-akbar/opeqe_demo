import React from 'react';
import cn from "classnames";

import LocalCustomListItem from "./CustomListItem";

import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';

import currencify from "../../../../functions/currencify";

export default function({
    className,
    style,
    items,
    selected,
    disabled,
    onChange,
    ...others
}) {
    return ( <
        List className = {
            cn(
                "check-box-group-l2",
                className,
            )
        }
        style = {
            {
                ...style
            }
        } { ...others
        } >
        {
            items.map((item, index) => {
                const {
                    primary,
                    secondary,
                    price,
                    key,
                    checked,
                } = item;
                return <LocalCustomListItem
                key = {
                    index
                }
                Control = {
                    Checkbox
                }
                controlProps = {
                    {
                        disabled: disabled && !selected[index],
                        onChange: onChange && (event => onChange(event, index)),
                        value: key,
                        checked: checked,
                    }
                }
                primary = {
                    primary
                }
                secondary = {
                    secondary
                }
                action = {
                    price > 0 &&
                    currencify(price)
                }
                />
            })
        } <
        /List>
    );
}