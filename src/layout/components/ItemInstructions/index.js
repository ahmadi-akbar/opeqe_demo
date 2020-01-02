import React, {
    useEffect
} from "react";
import cn from "classnames";
import {
    connect
} from "react-redux";

import Grid from "@material-ui/core/Grid";

import fetchInstructions from "../../../store/actions/menu/fetchInstructions";
import fetchItemData from "../../../store/actions/menu/fetchItemData";
import getMenuItemData from "../../../store/selectors/menu/getMenuItemData";
import {
    DATA_FETCH_PENDING,
    DATA_FETCH_FULFILLED,
    DATA_FETCH_REJECTED
} from "../../../store/config/actionNames";

import Image from "./components/Image";
import Body from "./components/Body";

import isMobile from "../../../functions/isMobile";

export function Index(props) {
    const {
        className,
        style,
        onClose,
        fetchInstructions,
        itemData: {
            data: {
                instructions: options,
                ...itemData
            },
            feeLabel,
        },
        itemId,
        bodyPaddingTopSub = 0,
        staticContext,
        full,
        container,
        ...others
    } = props;

    useEffect(() => {
        console.log(itemId);
        if (!itemId) {
            return;
        }

        fetchInstructions(itemId);

    }, [itemId]);

    const bodyExtraPaddingTop = 120 - bodyPaddingTopSub;
    const imageHeightRatio = 0.45;

    const initialImageHeight =
        container &&
        (container.offsetHeight ?
            container.offsetHeight * imageHeightRatio :
            window.innerHeight * imageHeightRatio);

    const isSkeleton = !itemData || !options;

    return ( <
        Grid className = {
            cn(
                "item-instructions-l1", {
                    "mobile": isMobile
                },
                className
            )
        }
        container justify = "center"
        style = {
            {
                ...style
            }
        } { ...others
        } >
        <
        Grid item container >
        <
        Image initialHeight = {
            initialImageHeight
        }
        itemData = {
            itemData ? itemData : {}
        }
        feeLabel = {
            feeLabel
        }
        skeleton = {
            isSkeleton
        }
        container = {
            container
        }
        full = {
            full
        }
        onClose = {
            onClose
        }
        /> <
        Body padding = {
            initialImageHeight + bodyExtraPaddingTop
        }
        itemData = {
            itemData ? itemData : {}
        }
        skeleton = {
            isSkeleton
        }
        options = {
            options
        }
        container = {
            container
        }
        onClose = {
            onClose
        }
        full = {
            full
        }
        /> <
        /Grid> <
        /Grid>
    );
}

const createMapStateToProps = () => {
    const selectItemData = getMenuItemData();
    const mapStateToProps = (state, props) => {
        return {
            itemData: selectItemData(state, props)
        };
    };
    return mapStateToProps;
};

export default connect(
    createMapStateToProps, {
        fetchInstructions,
        fetchItemData
    }
)(Index);