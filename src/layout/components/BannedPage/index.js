import React from 'react';
import cn from "classnames";

import Grid from "@material-ui/core/Grid";

import {
    contactOPEQE
} from "../../config/opeqe";

import OpeqeLogo from "../OpeqeLogo";

export default function(props) {
    const {
        className,
        style,
        ban,
        ...others
    } = props;




    return ( <
        Grid className = {
            cn(
                'banned-page-l1',
                className
            )
        }
        style = {
            {
                ...style
            }
        }
        container direction = "column"
        justify = "space-between" { ...others
        } >
        <
        div className = "message" >
        <
        div className = "title" > {
            getTitle(ban)
        } <
        /div> <
        div className = "description" > {
            getDescription(ban)
        } <
        br / >
        For more information please contact Opeqe. <
        /div> <
        div className = "phone" > {
            contactOPEQE
        } <
        /div> <
        /div> <
        div className = "logo" >
        <
        OpeqeLogo showText color = "light"
        width = "250" / >
        <
        /div> <
        /Grid>
    );
}


const getTitle = ban => {
    if (ban.user) {
        return "Demo Expired";
    }
    if (ban.store) {
        return "Demo Expired";
    }
    if (ban.server) {
        return "Server Error";
    }
}

const getDescription = ban => {
    if (ban.user) {
        return "Your demo period has been expired.";
    }
    if (ban.store) {
        return "Your demo period has been expired.";
    }
    if (ban.server) {
        return "We detected unusual activities from this device";
    }
}