import React, {
    useState,
    useEffect
} from 'react';
import cn from "classnames";


import FavoriteIcon from "@material-ui/icons/Favorite";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import DeleteIcon from "@material-ui/icons/Delete";

import Button from "../../DefaultButton/";
import CustomListItem from "../../CustomListItem";

import currencify from "../../../../functions/currencify";

import {
    CONFIG_RTL
} from "../../../config/layout/";
import useSwipe from "../../../hooks/useSwipe/";

export default function(props) {
    const {
        className,
        index,
        quantity,
        style,
        onFav,
        onDel,
        noOptions,
        title,
        instructions = [],
        basePrice,
        ...others
    } = props;

    const [options, setOptions] = useState(false);

    const totalPrice = instructions.reduce((total, {
        price
    }) => total + price, 0) + basePrice;

    const {
        handleStart,
        handleEnd
    } = useSwipe({
        onDirRight: showOptions,
        onDirLeft: hideOptions,
        rtl: CONFIG_RTL,
    });

    useEffect(() => {
        if (options) {
            window.addEventListener('click', hideOptions);
        } else {
            window.removeEventListener('click', hideOptions);
        }
        return () => {
            window.removeEventListener('click', hideOptions);
        }
    }, [options]);


    function hideOptions() {
        setOptions(false);
    }

    function showOptions() {
        if (noOptions) {
            return;
        }
        setOptions(true);
    }

    return ( <
        div onClick = {
            showOptions
        }
        className = {
            cn(
                'item-l2', {
                    'pointer': !noOptions
                },
                className
            )
        }
        style = {
            {
                ...style
            }
        }
        onMouseDown = {
            handleStart
        }
        onTouchStart = {
            handleStart
        }
        onMouseUp = {
            handleEnd
        }
        onTouchEnd = {
            handleEnd
        } { ...others
        } >
        <
        div className = {
            cn(
                "options", {
                    'open': options
                },
            )
        } >
        <
        Button theme = "light"
        className = "button"
        containerProps = {
            {
                className: "button-container",
            }
        }
        round = {
            false
        }
        onClick = {
            () => onDel(index)
        } >
        <
        DeleteIcon className = "icon" / >
        <
        /Button> <
        Button className = "button"
        containerProps = {
            {
                className: "button-container",
            }
        }
        round = {
            false
        }
        onClick = {
            () => onFav(index)
        } >
        <
        FavoriteIcon className = "icon" / >
        <
        /Button> <
        /div> <
        div className = "content" >
        <
        CustomListItem component = "div"
        className = "title"
        icon = { <
            span className = "item-num" > {
                quantity
            } <
            /span>
        }
        noBorder >
        {
            title
        } <
        /CustomListItem>    {
            instructions.map(({
                price,
                name,
            }, index) => {
                return ( <
                    CustomListItem key = {
                        index
                    }
                    component = "div"
                    className = "instruction-option"
                    action = { <
                        span className = "price" > {
                            currencify(price)
                        } <
                        /span>
                    }
                    icon = { <
                        DoneOutlineIcon className = "icon" / >
                    }
                    noBorder >
                    {
                        name
                    } <
                    /CustomListItem>
                );
            })
        }

        <
        CustomListItem component = "div"
        className = "total-price"
        action = { <
            span className = "price" > {
                currencify(totalPrice * quantity)
            } <
            /span>
        }
        noBorder >
        Click
        for options <
        /CustomListItem> <
        /div>                          <
        /div>
    );
}