import React from 'react';
import cn from "classnames";

import List from "@material-ui/core/List";

import CustomListItem from "../CustomListItem";

import currencify from "../../../functions/currencify";



export default function(props) {
    const {
        className,
        style,
        discounts = [],
        tax = 0,
        subTotal = 0,
        fees: {
            delivery = 0,
            service = 0,
        },
        ...others
    } = props;

    return ( <
        div className = {
            cn(
                'total-order-receipt-l1',
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
        List className = "receipt-details" >
        <
        CustomListItem className = "item"
        action = {
            currencify(subTotal)
        }
        noIcon noBorder >
        Subtotal <
        /CustomListItem>   <
        CustomListItem className = "item"
        action = {
            currencify(tax)
        }
        noIcon noBorder >
        Tax <
        /CustomListItem>  <
        CustomListItem className = "item"
        action = {
            currencify(delivery)
        }
        noIcon noBorder >
        Delivery <
        /CustomListItem>  <
        CustomListItem className = "item"
        action = {
            currencify(service)
        }
        noIcon noBorder >
        Service Fee <
        /CustomListItem>  {
            discounts.map(
                (discount, index) => ( <
                    CustomListItem key = {
                        discount.id || index
                    }
                    className = "item"
                    action = {
                        currencify(-discount.amount)
                    }
                    noIcon noBorder >
                    {
                        discount.title
                    } <
                    /CustomListItem> 
                )
            )
        } <
        CustomListItem className = "total"
        action = { <
            span className = "price" > {
                currencify(
                    getTotal({
                        discounts,
                        tax,
                        subTotal,
                        delivery,
                        service,
                    })
                )
            } <
            /span>
        }
        noIcon >
        TOTAL <
        /CustomListItem>                  <
        /List> <
        /div>
    );
}




function getTotal({
    discounts = [],
    tax,
    subTotal,
    delivery,
    service,
}) {
    let total = subTotal + tax + delivery + service;

    total += discounts.reduce(
        (totalDiscounts, discount) => (totalDiscounts - discount.amount), 0);

    return total;
}