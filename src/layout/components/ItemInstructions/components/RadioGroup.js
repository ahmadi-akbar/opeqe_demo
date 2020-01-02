import React from 'react';
import cn from "classnames";

import RadioGroup from '@material-ui/core/RadioGroup';
import LocalCustomListItem from "./CustomListItem";

import Radio from '@material-ui/core/Radio';

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
        RadioGroup className = {
            cn(
                "radio-group-l2",
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
                } = item;
                return ( <
                    LocalCustomListItem key = {
                        index
                    }
                    Control = {
                        Radio
                    }
                    formControlProps = {
                        {
                            value: key,
                        }
                    }
                    controlProps = {
                        {
                            disabled: disabled && !selected[index],
                            onChange: onChange && (event => onChange(event, index)),
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
                )
            })
        } <
        /RadioGroup>
    );
}